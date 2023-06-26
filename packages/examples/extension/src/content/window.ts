import { initialize } from '@exodus/bitcoin-wallet-standard-sats';

import { createWindowRPC } from '../rpc';
import { BitcoinProvider } from './provider';

const rpc = createWindowRPC(window);
const provider = new BitcoinProvider(rpc);
initialize(provider);
