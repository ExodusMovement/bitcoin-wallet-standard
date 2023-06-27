import type { WalletWithFeatures } from '@wallet-standard/base';
import type { BitcoinConnectFeature } from './connect.js';

/** Type of all Bitcoin features. */
export type BitcoinFeatures = BitcoinConnectFeature;

/** Wallet with Bitcoin features. */
export type WalletWithBitcoinFeatures = WalletWithFeatures<BitcoinFeatures>;

export * from './connect.js';
