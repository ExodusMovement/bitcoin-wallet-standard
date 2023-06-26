import jayson from 'jayson';

import { parse, stringify } from './serialization';
import { createPortTransport, createWindowTransport, type Transport } from './transport';

type Callback = (...args: any[]) => void;

type MethodCallback = (params: any[]) => Promise<any>;

export interface RPC {
    callMethod: <Response>(method: string, params?: any[]) => Promise<Response>;
    exposeMethod: (method: string, listener: MethodCallback) => void;
    end: () => void;
}

export function createRPC(transport: Transport): RPC {
    const listeners: Callback[] = [];

    function callMethod<Response>(method: string, params: any[] = []): Promise<Response> {
        return new Promise((resolve) => {
            const request = jayson.Utils.request(method, params);

            const handleResponse = (dataOrEvent: any) => {
                const wireResponse = dataOrEvent instanceof MessageEvent ? dataOrEvent.data : dataOrEvent;
                let response;
                try {
                    response = parse(wireResponse);
                } catch (err) {
                    // The message is not for us, ignore.
                    return;
                }

                if (!jayson.Utils.Response.isValidResponse(response)) {
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

            if (!jayson.Utils.Request.isValidRequest(request)) {
                return;
            }

            if (request.method !== method) {
                return;
            }

            const result = await listener(request.params);

            const response = jayson.Utils.response(null, result, request.id);
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
