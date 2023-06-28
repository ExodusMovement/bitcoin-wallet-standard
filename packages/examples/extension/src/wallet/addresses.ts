import ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';

bitcoin.initEccLib(ecc);

/**
 * Computes the SegWit address for the given public key.
 */
export function computeSegWitAddress(publicKey: Uint8Array): string {
    return bitcoin.payments.p2wpkh({ pubkey: Buffer.from(publicKey) }).address!;
}

/**
 * Extracts the x-coordinate of the given public key, used for Taproot.
 */
function toXOnly(publicKey: Uint8Array): Uint8Array {
    return publicKey.subarray(1, 33);
}

/**
 * Computes the Taproot address for the given public key.
 */
export function computeTaprootAddress(publicKey: Uint8Array): string {
    return bitcoin.payments.p2tr({
        internalPubkey: Buffer.from(toXOnly(publicKey)),
    }).address!;
}
