import ecc from '@bitcoinerlab/secp256k1';
import { BIP32Factory } from 'bip32';
import * as bip39 from 'bip39';

const COIN_TYPE = 0;
const SEGWIT_PURPOSE = 84;
const TAPROOT_PURPOSE = 86;

const bip32 = BIP32Factory(ecc);

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
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(`m/${SEGWIT_PURPOSE}'/${COIN_TYPE}'/0'/0/${index}`);
    return {
        publicKey: child.publicKey,
        privateKey: child.privateKey!,
    };
}

function deriveOrdinalsKeypair(mnemonic: Mnemonic, index = 0): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(`m/${TAPROOT_PURPOSE}'/${COIN_TYPE}'/0'/0/${index}`);
    return {
        publicKey: child.publicKey,
        privateKey: child.privateKey!,
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
