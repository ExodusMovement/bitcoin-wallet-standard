import { v4 as uuidv4 } from 'uuid';

import { parse, stringify } from './serialization';
import { createPortTransport, createWindowTransport, type Transport } from './transport';

type Callback = (...args: any[]) => void;

type MethodCallback = (params?: any[]) => Promise<any>;

export interface RPC {
    callMethod: <Response>(method: string, params?: any[]) => Promise<Response>;
    exposeMethod: (method: string, listener: MethodCallback) => void;
    end: () => void;
}

export interface JSONRPCRequest {
    id: string;
    jsonrpc: '2.0';
    method: string;
    params?: any[];
}

export interface JSONRPCResponse {
    id: string;
    jsonrpc: '2.0';
    error?: JSONRPCError;
    result?: any;
}

export interface JSONRPCError extends Error {
    code: number;
}

function generateRequest(method: string, params?: any[]) {
    const request: JSONRPCRequest = {
        id: uuidv4(),
        jsonrpc: '2.0',
        method,
        ...(params && { params }),
    };
    return request;
}

function isValidRequest(request: JSONRPCRequest): request is JSONRPCRequest {
    return Boolean(
        request &&
            typeof request === 'object' &&
            typeof request.id === 'string' &&
            request.jsonrpc === '2.0' &&
            typeof request.method === 'string' &&
            (typeof request.params === 'undefined' || Array.isArray(request.params))
    );
}

function generateResponse(error: Error | null, result: any, id: string) {
    const response = {
        id,
        jsonrpc: '2.0',
        ...(error ? { error } : { result }),
    };
    return response;
}

function isValidResponse(response: JSONRPCResponse): response is JSONRPCResponse {
    return Boolean(
        response &&
            typeof response === 'object' &&
            typeof response.id === 'string' &&
            response.jsonrpc === '2.0' &&
            ((typeof response.result === 'undefined' && typeof response.error !== 'undefined') ||
                (typeof response.result !== 'undefined' && typeof response.error === 'undefined')) &&
            (typeof response.result !== 'undefined' ||
                (response.error !== null &&
                    typeof response.error === 'object' &&
                    typeof response.error.code === 'number' &&
                    (response.error.code | 0) === response.error.code &&
                    typeof response.error.message === 'string'))
    );
}

export function createRPC(transport: Transport): RPC {
    const listeners: Callback[] = [];

    function callMethod<Response>(method: string, params: any[] = []): Promise<Response> {
        return new Promise((resolve) => {
            const request = generateRequest(method, params);

            const handleResponse = (dataOrEvent: any) => {
                const wireResponse = dataOrEvent instanceof MessageEvent ? dataOrEvent.data : dataOrEvent;
                let response;
                try {
                    response = parse(wireResponse);
                } catch (err) {
                    // The message is not for us, ignore.
                    return;
                }

                if (!isValidResponse(response)) {
                    return;
                }

                if (response.id !== request.id) {
                    return;
                }

                transport.removeListener(handleResponse);

                resolve(response.result);
            };
            transport.addListener(handleResponse);

            const wireRequest = stringify(request);
            transport.write(wireRequest);
        });
    }

    function exposeMethod(method: string, listener: MethodCallback) {
        const handleRequest = async (dataOrEvent: any) => {
            const wireRequest = dataOrEvent instanceof MessageEvent ? dataOrEvent.data : dataOrEvent;
            let request;
            try {
                request = parse(wireRequest);
            } catch (err) {
                // The message is not for us, ignore.
                return;
            }

            if (!isValidRequest(request)) {
                return;
            }

            if (request.method !== method) {
                return;
            }

            const result = await listener(request.params);

            const response = generateResponse(null, result, request.id);
            const wireResponse = stringify(response);
            transport.write(wireResponse);
        };

        transport.addListener(handleRequest);

        listeners.push(handleRequest);
    }

    function end() {
        for (const listener of listeners) {
            transport.removeListener(listener);
        }
    }

    return { callMethod, exposeMethod, end };
}

export function createPortRPC(port: chrome.runtime.Port) {
    const transport = createPortTransport(port);
    return createRPC(transport);
}

export function createWindowRPC(window: Window) {
    const transport = createWindowTransport(window);
    return createRPC(transport);
}
