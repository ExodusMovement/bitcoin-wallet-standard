import { registerWallet } from '@wallet-standard/wallet';
import type { BitcoinProvider } from '@exodus/sats-connect';
import { SatsConnectWallet } from './wallet.js';

export function initialize(provider: BitcoinProvider): void {
    registerWallet(new SatsConnectWallet(provider));
}
