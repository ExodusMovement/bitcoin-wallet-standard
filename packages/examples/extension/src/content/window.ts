import { initialize } from '@exodus/bitcoin-wallet-standard-sats-connect';

import { createWindowRPC } from '../rpc';
import { BitcoinProvider } from './provider';

const rpc = createWindowRPC(window);
const provider = new BitcoinProvider(rpc);
initialize(provider);

// Temporary to allow debugging in the browser.
Object.defineProperty(window, 'BitcoinProvider', {
    value: provider,
});
