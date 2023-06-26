import { hex } from '@scure/base';
import type {
    BitcoinProvider as SatsConnectBitcoinProvider,
    GetAddressResponse,
    SignTransactionResponse,
} from 'sats-connect';
import { AddressPurposes } from 'sats-connect';

import type { RPC } from '../rpc';
import type { Account } from '../types';

export class BitcoinProvider implements SatsConnectBitcoinProvider {
    #rpc: RPC;

    constructor(rpc: RPC) {
        this.#rpc = rpc;
    }

    async connect(request: string): Promise<GetAddressResponse> {
        // TODO: Parse request string.

        const accounts = await this.#rpc.callMethod<Account[]>('connect');

        return {
            addresses: accounts.map(({ network, publicKey, address }) => ({
                address,
                publicKey: hex.encode(publicKey),
                purpose: network === 'bitcoin' ? AddressPurposes.PAYMENT : AddressPurposes.ORDINALS,
            })),
        };
    }

    async signTransaction(request: string): Promise<SignTransactionResponse> {
        throw new Error('Method not implemented.');
    }

    async signMessage(request: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    async call(request: string): Promise<Record<string, any>> {
        throw new Error('Method not implemented.');
    }
}
