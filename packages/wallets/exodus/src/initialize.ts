import { registerWallet } from '@wallet-standard/wallet';
import { ExodusWallet } from './wallet.js';
import type { Exodus } from './window.js';

export function initialize(exodus: Exodus): void {
    registerWallet(new ExodusWallet(exodus));
}
