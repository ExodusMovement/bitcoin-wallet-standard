import { initialize as initializeSatsConnect } from '@exodus/bitcoin-wallet-standard-sats-connect';
import { initialize as initializeSatoshi } from '@exodus/bitcoin-wallet-standard-satoshi';

import { createWindowRPC } from '../rpc';
import { BitcoinProvider } from './provider';

const rpc = createWindowRPC(window);

const provider = new BitcoinProvider(rpc);

// Temporary to allow debugging in the browser.
Object.defineProperty(window, 'BitcoinProvider', {
    value: provider,
});

/**
 * Initialize the standard wallet using both reference implementations:
 *
 * A. Satoshi Wallet: A wallet written with a Wallet Standard compatible API (recommended), and
 * B. Sats Connect Wallet: A wallet wrapping the Sats Connect API with a Wallet Standard compatible API.
 */

// A. Satoshi Wallet
initializeSatoshi(rpc);

// B. Sats Connect Wallet
initializeSatsConnect(provider);
