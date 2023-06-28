import { BITCOIN_CHAINS } from '@exodus/bitcoin-wallet-standard-chains';
import {
    type BitcoinAddressPurpose,
    BitcoinConnect,
    type BitcoinConnectFeature,
    type BitcoinConnectMethod,
} from '@exodus/bitcoin-wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import {
    StandardEvents,
    type StandardEventsFeature,
    type StandardEventsListeners,
    type StandardEventsNames,
    type StandardEventsOnMethod,
} from '@wallet-standard/features';
import { SatoshiWalletAccount } from './account.js';
import { icon } from './icon.js';
import type { RPC } from './rpc.js';

export class SatoshiWallet implements Wallet {
    readonly #version = '1.0.0' as const;
    readonly #name = 'Satoshi' as const;
    readonly #icon = icon;
    #accounts: SatoshiWalletAccount[] = [];

    readonly #listeners: { [E in StandardEventsNames]?: StandardEventsListeners[E][] } = {};

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

    get features(): StandardEventsFeature & BitcoinConnectFeature {
        return {
            [StandardEvents]: {
                version: '1.0.0',
                on: this.#on,
            },
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

    #on: StandardEventsOnMethod = (event, listener) => {
        this.#listeners[event]?.push(listener) || (this.#listeners[event] = [listener]);
        return (): void => this.#off(event, listener);
    };

    #off<E extends StandardEventsNames>(event: E, listener: StandardEventsListeners[E]): void {
        this.#listeners[event] = this.#listeners[event]?.filter((existingListener) => listener !== existingListener);
    }

    #emit<E extends StandardEventsNames>(event: E, ...args: Parameters<StandardEventsListeners[E]>): void {
        // eslint-disable-next-line prefer-spread
        this.#listeners[event]?.forEach((listener) => listener.apply(null, args));
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

        this.#emit('change', { accounts: this.accounts });

        return { accounts: this.accounts };
    };
}
