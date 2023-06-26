import type {
    BitcoinProvider as SatsConnectBitcoinProvider,
    GetAddressResponse,
    SignTransactionResponse,
} from 'sats-connect';

import type { RPC } from '../rpc';

export class BitcoinProvider implements SatsConnectBitcoinProvider {
    #rpc: RPC;

    constructor(rpc: RPC) {
        this.#rpc = rpc;
    }

    async connect(request: string): Promise<GetAddressResponse> {
        return this.#rpc.callMethod('connect', [request]);
    }

    async signTransaction(request: string): Promise<SignTransactionResponse> {
        return this.#rpc.callMethod('signTransaction', [request]);
    }

    async signMessage(request: string): Promise<string> {
        return this.#rpc.callMethod('signMessage', [request]);
    }

    async call(request: string): Promise<Record<string, any>> {
        throw new Error('Method not implemented.');
    }
}
