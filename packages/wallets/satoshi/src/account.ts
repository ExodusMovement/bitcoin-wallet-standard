import { BITCOIN_CHAINS } from '@exodus/bitcoin-wallet-standard-chains';
import type { BitcoinAddressPurpose } from '@exodus/bitcoin-wallet-standard-features';
import type { WalletAccount } from '@wallet-standard/base';

const chains = BITCOIN_CHAINS;
const features = [] as const;

export class SatoshiWalletAccount implements WalletAccount {
    readonly #purpose: BitcoinAddressPurpose;
    readonly #address: WalletAccount['address'];
    readonly #publicKey: WalletAccount['publicKey'];
    readonly #chains: WalletAccount['chains'];
    readonly #features: WalletAccount['features'];
    readonly #label: WalletAccount['label'];
    readonly #icon: WalletAccount['icon'];

    get purpose() {
        return this.#purpose;
    }

    get address() {
        return this.#address;
    }

    get publicKey() {
        return this.#publicKey.slice();
    }

    get chains() {
        return this.#chains.slice();
    }

    get features() {
        return this.#features.slice();
    }

    get label() {
        return this.#label;
    }

    get icon() {
        return this.#icon;
    }

    constructor({
        purpose,
        address,
        publicKey,
        label,
        icon,
    }: { purpose: BitcoinAddressPurpose } & Omit<WalletAccount, 'chains' | 'features'>) {
        if (new.target === SatoshiWalletAccount) {
            Object.freeze(this);
        }

        this.#purpose = purpose;
        this.#address = address;
        this.#publicKey = publicKey;
        this.#chains = chains;
        this.#features = features;
        this.#label = label;
        this.#icon = icon;
    }
}
