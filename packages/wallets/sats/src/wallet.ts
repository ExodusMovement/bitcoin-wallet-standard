import { BITCOIN_CHAINS } from '@exodus/bitcoin-wallet-standard';
import type { Wallet } from '@wallet-standard/base';
import type { BitcoinProvider } from 'sats-connect';
import type { SatsWalletAccount } from './account.js';
import { icon } from './icon.js';

export const SatsNamespace = 'sats:';

export type SatsFeature = {
    [SatsNamespace]: {
        provider: BitcoinProvider;
    };
};

export class SatsWallet implements Wallet {
    readonly #version = '1.0.0' as const;
    readonly #name = 'Sats' as const;
    readonly #icon = icon;
    #account: SatsWalletAccount | null = null;
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

    get features(): SatsFeature {
        return {
            [SatsNamespace]: {
                provider: this.#provider,
            },
        };
    }

    get accounts() {
        return this.#account ? [this.#account] : [];
    }

    constructor(provider: BitcoinProvider) {
        if (new.target === SatsWallet) {
            Object.freeze(this);
        }

        this.#provider = provider;
    }
}
