import type {
    BitcoinProvider as SatsConnectBitcoinProvider,
    GetAddressResponse,
    SignTransactionResponse,
} from 'sats-connect';

import type { RPC } from '../messages';

export class BitcoinProvider implements SatsConnectBitcoinProvider {
    #rpc: RPC;

    constructor(rpc: RPC) {
        this.#rpc = rpc;
    }

    async connect(request: string): Promise<GetAddressResponse> {
        /** TODO: Implement. */
        return {
            addresses: [],
        };
    }

    async call(request: string): Promise<Record<string, any>> {
        /** TODO: Implement. */
        return {};
    }

    async signTransaction(request: string): Promise<SignTransactionResponse> {
        /** TODO: Implement. */
        return {
            psbtBase64: '',
            txId: '',
        };
    }

    async signMessage(request: string): Promise<string> {
        /** TODO: Implement. */
        return '';
    }
}
