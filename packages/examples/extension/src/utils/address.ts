import ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';

bitcoin.initEccLib(ecc);

export function computeSegWitAddress(publicKey: Uint8Array): string {
    return bitcoin.payments.p2wpkh({ pubkey: Buffer.from(publicKey) }).address!;
}

export function computeTaprootAddress(publicKey: Uint8Array): string {
    return bitcoin.payments.p2tr({
        internalPubkey: Buffer.from(publicKey).subarray(1, 33),
    }).address!;
}

export function condenseAddress(address: string): string {
    return `${address.slice(0, 4)}..${address.slice(-4)}`;
}
