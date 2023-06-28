import ecc from '@bitcoinerlab/secp256k1';
import { BIP32Factory } from 'bip32';

import { getSeedFromMnemonic } from './mnemonic';

const COIN_TYPE = 0;
const SEGWIT_PURPOSE = 84;
const TAPROOT_PURPOSE = 86;

const bip32 = BIP32Factory(ecc);

export interface Keypair {
    publicKey: Uint8Array;
    privateKey: Uint8Array;
}

function deriveKeypair(mnemonic: string, path: string): Keypair {
    const seed = getSeedFromMnemonic(mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(path);
    return {
        publicKey: new Uint8Array(child.publicKey),
        privateKey: new Uint8Array(child.privateKey!),
    };
}

export function derivePaymentKeypair(mnemonic: string, index = 0): Keypair {
    const path = `m/${SEGWIT_PURPOSE}'/${COIN_TYPE}'/0'/0/${index}`;
    return deriveKeypair(mnemonic, path);
}

export function deriveOrdinalsKeypair(mnemonic: string, index = 0): Keypair {
    const path = `m/${TAPROOT_PURPOSE}'/${COIN_TYPE}'/0'/0/${index}`;
    return deriveKeypair(mnemonic, path);
}
