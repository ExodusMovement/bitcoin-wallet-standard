import { initialize } from '@exodus/bitcoin-wallet-standard-exodus';

import { createRPC, createWindowTransport } from '../messages';
import { ExodusProvider } from './provider';

const transport = createWindowTransport(window);
const rpc = createRPC(transport);
const exodus = new ExodusProvider(rpc);
initialize(exodus);
