import { BITCOIN_CHAINS } from '@exodus/bitcoin-wallet-standard';
import type { Wallet } from '@wallet-standard/base';
import {
    StandardConnect,
    type StandardConnectFeature,
    type StandardConnectMethod,
    StandardDisconnect,
    type StandardDisconnectFeature,
    type StandardDisconnectMethod,
    StandardEvents,
    type StandardEventsFeature,
    type StandardEventsListeners,
    type StandardEventsNames,
    type StandardEventsOnMethod,
} from '@wallet-standard/features';
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
    readonly #listeners: { [E in StandardEventsNames]?: StandardEventsListeners[E][] } = {};
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

    get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & SatsFeature {
        return {
            [StandardConnect]: {
                version: '1.0.0',
                connect: this.#connect,
            },
            [StandardDisconnect]: {
                version: '1.0.0',
                disconnect: this.#disconnect,
            },
            [StandardEvents]: {
                version: '1.0.0',
                on: this.#on,
            },
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

        this.#connected();
    }

    #on: StandardEventsOnMethod = (event, listener) => {
        this.#listeners[event]?.push(listener) || (this.#listeners[event] = [listener]);
        return (): void => this.#off(event, listener);
    };

    #emit<E extends StandardEventsNames>(event: E, ...args: Parameters<StandardEventsListeners[E]>): void {
        // eslint-disable-next-line prefer-spread
        this.#listeners[event]?.forEach((listener) => listener.apply(null, args));
    }

    #off<E extends StandardEventsNames>(event: E, listener: StandardEventsListeners[E]): void {
        this.#listeners[event] = this.#listeners[event]?.filter((existingListener) => listener !== existingListener);
    }

    #connected = () => {
        /** TODO: Implement. */
    };

    #disconnected = () => {
        /** TODO: Implement. */
    };

    #reconnected = () => {
        /** TODO: Implement. */
    };

    #connect: StandardConnectMethod = async ({ silent } = {}) => {
        /** TODO: Implement. */
        return { accounts: [] };
    };

    #disconnect: StandardDisconnectMethod = async () => {
        /** TODO: Implement. */
    };
}
