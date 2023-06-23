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
import type { ExodusWalletAccount } from './account.js';
import { icon } from './icon.js';
import type { Exodus } from './window.js';

export const ExodusNamespace = 'exodus:';

export type ExodusFeature = {
    [ExodusNamespace]: {
        exodus: Exodus;
    };
};

export class ExodusWallet implements Wallet {
    readonly #listeners: { [E in StandardEventsNames]?: StandardEventsListeners[E][] } = {};
    readonly #version = '1.0.0' as const;
    readonly #name = 'Exodus' as const;
    readonly #icon = icon;
    #account: ExodusWalletAccount | null = null;
    readonly #exodus: Exodus;

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

    get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & ExodusFeature {
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
            /** TODO: Add Bitcoin features. */
            [ExodusNamespace]: {
                exodus: this.#exodus,
            },
        };
    }

    get accounts() {
        return this.#account ? [this.#account] : [];
    }

    constructor(exodus: Exodus) {
        if (new.target === ExodusWallet) {
            Object.freeze(this);
        }

        this.#exodus = exodus;

        /** TODO: Register event listeners. */
        // exodus.on('connect', this.#connected, this);
        // exodus.on('disconnect', this.#disconnected, this);

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
