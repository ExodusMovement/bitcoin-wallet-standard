import { computeSegWitAddress, computeTaprootAddress } from './addresses';
import { derivePaymentKeypair, deriveOrdinalsKeypair } from './keys';

export type AddressPurpose = 'payment' | 'ordinals';

export interface Account {
    purpose: AddressPurpose;
    publicKey: Uint8Array;
    address: string;
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
