import type { WalletWithFeatures } from '@wallet-standard/base';
import type { BitcoinConnectFeature } from './connect.js';
import type { BitcoinSignTransactionFeature } from './signTransaction.js';

/** Type of all Bitcoin features. */
export type BitcoinFeatures = BitcoinConnectFeature & BitcoinSignTransactionFeature;

/** Wallet with Bitcoin features. */
export type WalletWithBitcoinFeatures = WalletWithFeatures<BitcoinFeatures>;

export * from './connect.js';
export * from './signTransaction.js';
