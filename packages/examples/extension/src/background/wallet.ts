import * as bip39 from 'bip39';

export type Mnemonic = string;

export interface Keypair {
    publicKey: Uint8Array;
    privateKey: Uint8Array;
}

export type Network = 'bitcoin' | 'ordinals';

export interface Account {
    network: Network;
    publicKey: Uint8Array;
}

/**
 * Generates a BIP-39 mnemonic.
 */
export function generateMnemonic(): Mnemonic {
    return bip39.generateMnemonic();
}

function deriveBitcoinKeypair(mnemonic: Mnemonic, index = 0): Keypair {
    /** TODO: Implement. */
    // const seed = bip39.mnemonicToSeedSync(mnemonic, '');
    return {
        publicKey: new Uint8Array(),
        privateKey: new Uint8Array(),
    };
}

function deriveOrdinalsKeypair(mnemonic: Mnemonic, index = 0): Keypair {
    /** TODO: Implement. */
    // const seed = bip39.mnemonicToSeedSync(mnemonic, '');
    return {
        publicKey: new Uint8Array(),
        privateKey: new Uint8Array(),
    };
}

/**
 * Returns the list of accounts in the wallet.
 */
export function getAccounts(mnemonic: Mnemonic): Account[] {
    const bitcoinKeypair = deriveBitcoinKeypair(mnemonic);
    const ordinalsKeypair = deriveOrdinalsKeypair(mnemonic);
    return [
        { network: 'bitcoin', publicKey: bitcoinKeypair.publicKey },
        { network: 'ordinals', publicKey: ordinalsKeypair.publicKey },
    ];
}
