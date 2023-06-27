import type { WalletAccount } from '@wallet-standard/base';

/** Name of the feature. */
export const BitcoinConnect = 'bitcoin:connect';

/**
 * `bitcoin:connect` is a {@link "@wallet-standard/base".Wallet.features | feature} that may be implemented by a
 * {@link "@wallet-standard/base".Wallet} to allow the app to obtain authorization to use
 * {@link "@wallet-standard/base".Wallet.accounts}.
 *
 * @group Connect
 */
export type BitcoinConnectFeature = {
    /** Name of the feature. */
    readonly [BitcoinConnect]: {
        /** Version of the feature implemented by the Wallet. */
        readonly version: BitcoinConnectVersion;
        /** Method to call to use the feature. */
        readonly connect: BitcoinConnectMethod;
    };
};

/**
 * Version of the {@link BitcoinConnectFeature} implemented by a {@link "@wallet-standard/base".Wallet}.
 *
 * @group Connect
 */
export type BitcoinConnectVersion = '1.0.0';

/**
 * Method to call to use the {@link BitcoinConnectFeature}.
 *
 * @group Connect
 */
export type BitcoinConnectMethod = (input: BitcoinConnectInput) => Promise<BitcoinConnectOutput>;

/**
 * Input for the {@link BitcoinConnectMethod}.
 *
 * @group Connect
 */
export interface BitcoinConnectInput {
    /** Type of addresses the app wants to obtain authorization to use. */
    /** TODO: Improve type to forbid duplicate purposes. */
    readonly purposes: BitcoinAddressPurpose[];
}

/** Purpose that determines the type of address of the account returned by the wallet. */
export type BitcoinAddressPurpose = 'ordinals' | 'payment';

/**
 * Output of the {@link BitcoinConnectMethod}.
 *
 * @group Connect
 */
export interface BitcoinConnectOutput {
    /**
     * List of accounts in the {@link "@wallet-standard/base".Wallet} that the app has been authorized to use.
     *
     * The accounts will have addresses that correspond with the `purposes` in the {@link BitcoinConnectInput}, and will
     * be returned in the same order.
     */
    readonly accounts: readonly WalletAccount[];
}
