import { BITCOIN_CHAINS } from '@exodus/bitcoin-wallet-standard-chains';
import {
    type BitcoinAddressPurpose,
    BitcoinConnect,
    type BitcoinConnectFeature,
    type BitcoinConnectMethod,
} from '@exodus/bitcoin-wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import { SatoshiWalletAccount } from './account.js';
import { icon } from './icon.js';
import type { RPC } from './rpc.js';

export class SatoshiWallet implements Wallet {
    readonly #version = '1.0.0' as const;
    readonly #name = 'Satoshi' as const;
    readonly #icon = icon;
    #accounts: SatoshiWalletAccount[] = [];
    readonly #rpc: RPC;

    get version() {
        return this.#version;
    }

    get name() {
        return this.#name;
    }

    get icon() {
        return this.#icon;
    }

    get chains() {
        return BITCOIN_CHAINS.slice();
    }

    get features(): BitcoinConnectFeature {
        return {
            [BitcoinConnect]: {
                version: '1.0.0',
                connect: this.#connect,
            },
        };
    }

    get accounts() {
        return this.#accounts.slice();
    }

    constructor(rpc: RPC) {
        if (new.target === SatoshiWallet) {
            Object.freeze(this);
        }

        this.#rpc = rpc;
    }

    #connect: BitcoinConnectMethod = async ({ purposes }) => {
        const accounts = await this.#rpc.callMethod<
            {
                purpose: BitcoinAddressPurpose;
                publicKey: Uint8Array;
                address: string;
            }[]
        >('connect', [purposes]);

        this.#accounts = accounts.map(
            ({ purpose, publicKey, address }) => new SatoshiWalletAccount({ purpose, publicKey, address })
        );

        return { accounts: this.accounts };
    };
}
