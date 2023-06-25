import { registerWallet } from '@wallet-standard/wallet';
import type { BitcoinProvider } from 'sats-connect';
import { SatsWallet } from './wallet.js';

export function initialize(provider: BitcoinProvider): void {
    registerWallet(new SatsWallet(provider));
}
