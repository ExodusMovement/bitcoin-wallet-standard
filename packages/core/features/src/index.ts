import type { WalletWithFeatures } from '@wallet-standard/base';

/** TODO: Add actual features. */
/** A dummy feature. */
export type BitcoinDummyFeature = {
    /** Name of the feature. */
    readonly 'bitcoin:dummyFeature': {
        /** Version of the feature API. */
        readonly version: '1.0.0';
    };
};

/** Type of all Bitcoin features. */
export type BitcoinFeatures = BitcoinDummyFeature;

/** Wallet with Bitcoin features. */
export type WalletWithBitcoinFeatures = WalletWithFeatures<BitcoinFeatures>;
