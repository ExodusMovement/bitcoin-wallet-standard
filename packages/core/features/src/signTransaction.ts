import type { Wallet, WalletAccount } from '@wallet-standard/base';
import type { Bytes } from './types.js';

/** Name of the feature. */
export const BitcoinSignTransaction = 'bitcoin:signTransaction';

/**
 * `bitcoin:signTransaction` is a {@link "@wallet-standard/base".Wallet.features | feature} that may be implemented by a
 * {@link "@wallet-standard/base".Wallet} to allow the app to request to sign a transaction with the specified
 * {@link "@wallet-standard/base".Wallet.accounts | account}.
 *
 * @group SignTransaction
 */
export type BitcoinSignTransactionFeature = {
    /** Name of the feature. */
    readonly [BitcoinSignTransaction]: {
        /** Version of the feature implemented by the Wallet. */
        readonly version: BitcoinSignTransactionVersion;
        /** Method to call to use the feature. */
        readonly signTransaction: BitcoinSignTransactionMethod;
    };
};

/**
 * Version of the {@link BitcoinSignTransactionFeature} implemented by a {@link "@wallet-standard/base".Wallet}.
 *
 * @group SignTransaction
 */
export type BitcoinSignTransactionVersion = '1.0.0';

/**
 * Method to call to use the {@link BitcoinSignTransactionFeature}.
 *
 * @group SignTransaction
 */
export type BitcoinSignTransactionMethod = (
    input: BitcoinSignTransactionInput
) => Promise<BitcoinSignTransactionOutput>;

/**
 * Input for the {@link BitcoinSignTransactionMethod}.
 *
 * @group SignTransaction
 */
export interface BitcoinSignTransactionInput {
    /**
     * Partially Signed Bitcoin Transaction (PSBT), as raw bytes.
     */
    psbt: Bytes;
    /**
     * Chain to use.
     */
    chain: ArrayElement<Wallet['chains']>;
    inputsToSign: readonly InputToSign[];
    broadcast?: boolean;
}

/** A helper type to infer an array element type. */
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

/** Transaction input to be signed with the specified {@link "@wallet-standard/base".WalletAccount.address}.
 *
 * @group SignTransaction
 * */
export interface InputToSign {
    /** Address to use. */
    address: WalletAccount['address'];
    /** List of input indexes that should be signed by the address. */
    signingIndexes: number[];
    /** A SIGHASH flag. */
    sigHash?: number;
}

/**
 * Output of the {@link BitcoinSignTransactionMethod}.
 *
 * @group SignTransaction
 */
export interface BitcoinSignTransactionOutput {
    /**
     * Partially Signed Bitcoin Transaction (PSBT), as raw bytes.
     */
    psbt: Bytes;
    /**
     * Transaction hash.
     * Returned if `broadcast: true` was passed in the {@link BitcoinSignTransactionInput}.
     */
    txId?: string;
}
