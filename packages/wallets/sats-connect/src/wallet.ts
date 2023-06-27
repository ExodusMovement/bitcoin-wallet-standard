import { BITCOIN_CHAINS } from '@exodus/bitcoin-wallet-standard-chains';
import type { Wallet } from '@wallet-standard/base';
import type { BitcoinProvider } from 'sats-connect';
import { icon } from './icon.js';

export const SatsConnectNamespace = 'sats-connect:';

export type SatsConnectFeature = {
    [SatsConnectNamespace]: {
        provider: BitcoinProvider;
    };
};

export class SatsConnectWallet implements Wallet {
    readonly #version = '1.0.0' as const;
    readonly #name = 'Sats' as const;
    readonly #icon = icon;
    readonly #provider: BitcoinProvider;

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

    get features(): SatsConnectFeature {
        return {
            [SatsConnectNamespace]: {
                provider: this.#provider,
            },
        };
    }

    get accounts() {
        return [];
    }

    constructor(provider: BitcoinProvider) {
        if (new.target === SatsConnectWallet) {
            Object.freeze(this);
        }

        this.#provider = provider;
    }
}
