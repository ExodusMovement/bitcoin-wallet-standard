import { initialize } from '@exodus/bitcoin-wallet-standard-sats';

import { createRPC, createWindowTransport } from '../messages';
import { BitcoinProvider } from './provider';

const transport = createWindowTransport(window);
const rpc = createRPC(transport);
const provider = new BitcoinProvider(rpc);
initialize(provider);
