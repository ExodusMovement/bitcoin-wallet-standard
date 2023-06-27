import { decodeToken } from '@olistic/jsontokens';
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
        if (!request) {
            throw new Error('Invalid request.');
        }

        const { payload } = decodeToken(request);
        if (typeof payload === 'string') {
            throw new Error('Invalid request.');
        }

        const { purposes } = payload as {
            purposes?: AddressPurposes[];
        };

        const accounts = await this.#rpc.callMethod<Account[]>('connect', [purposes]);

        return {
            addresses: accounts.map(({ purpose, publicKey, address }) => ({
                address,
                publicKey: hex.encode(publicKey),
                purpose: purpose === 'payment' ? AddressPurposes.PAYMENT : AddressPurposes.ORDINALS,
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
