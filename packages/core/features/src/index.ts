import type { WalletWithFeatures } from '@wallet-standard/base';
import type { BitcoinConnectFeature } from './connect.js';
import type { BitcoinSignAndSendTransactionFeature } from './signAndSendTransaction.js';
import type { BitcoinSignTransactionFeature } from './signTransaction.js';
import type { BitcoinSignMessageFeature } from './signMessage.js';

/** Type alias for some or all Bitcoin features. */
export type BitcoinFeatures =
    | BitcoinConnectFeature
    | BitcoinSignTransactionFeature
    | BitcoinSignAndSendTransactionFeature
    | BitcoinSignMessageFeature;

/** Wallet with Bitcoin features. */
export type WalletWithBitcoinFeatures = WalletWithFeatures<BitcoinFeatures>;

export * from './connect.js';
export * from './signTransaction.js';
export * from './signAndSendTransaction.js';
export * from './signMessage.js';
