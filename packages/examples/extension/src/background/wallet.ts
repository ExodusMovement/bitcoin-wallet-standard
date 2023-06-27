import ecc from '@bitcoinerlab/secp256k1';
import { BIP32Factory } from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

import type { Account } from '../types';

const COIN_TYPE = 0;
const SEGWIT_PURPOSE = 84;
const TAPROOT_PURPOSE = 86;

const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);

export interface Keypair {
    publicKey: Uint8Array;
    privateKey: Uint8Array;
}

/**
 * Generates a BIP-39 mnemonic.
 */
export function generateMnemonic(): string {
    return bip39.generateMnemonic();
}

function derivePaymentKeypair(mnemonic: string, index = 0): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(`m/${SEGWIT_PURPOSE}'/${COIN_TYPE}'/0'/0/${index}`);
    return {
        publicKey: new Uint8Array(child.publicKey),
        privateKey: new Uint8Array(child.privateKey!),
    };
}

function deriveOrdinalsKeypair(mnemonic: string, index = 0): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(`m/${TAPROOT_PURPOSE}'/${COIN_TYPE}'/0'/0/${index}`);
    return {
        publicKey: new Uint8Array(child.publicKey),
        privateKey: new Uint8Array(child.privateKey!),
    };
}

export function computeSegWitAddress(publicKey: Uint8Array): string {
    return bitcoin.payments.p2wpkh({ pubkey: Buffer.from(publicKey) }).address!;
}

export function computeTaprootAddress(publicKey: Uint8Array): string {
    return bitcoin.payments.p2tr({
        internalPubkey: Buffer.from(publicKey).subarray(1, 33),
    }).address!;
}

/**
 * Returns the list of accounts in the wallet.
 */
export function getAccounts(mnemonic: string): Account[] {
    const paymentKeypair = derivePaymentKeypair(mnemonic);
    const ordinalsKeypair = deriveOrdinalsKeypair(mnemonic);
    return [
        {
            purpose: 'payment',
            publicKey: paymentKeypair.publicKey,
            address: computeSegWitAddress(paymentKeypair.publicKey),
        },
        {
            purpose: 'ordinals',
            publicKey: ordinalsKeypair.publicKey,
            address: computeTaprootAddress(ordinalsKeypair.publicKey),
        },
    ];
}
