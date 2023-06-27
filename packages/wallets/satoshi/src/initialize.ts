import { registerWallet } from '@wallet-standard/wallet';
import type { RPC } from './rpc.js';
import { SatoshiWallet } from './wallet.js';

export function initialize(rpc: RPC): void {
    registerWallet(new SatoshiWallet(rpc));
}
