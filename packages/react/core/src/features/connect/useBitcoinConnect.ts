import type { BitcoinConnectMethod } from '@exodus/bitcoin-wallet-standard-features';
import { createContext, useContext } from 'react';
import { createDefaultContext } from '../../context.js';

/** TODO: docs */
export interface BitcoinConnectContextState {
    waiting: boolean;
    connect: BitcoinConnectMethod | undefined;
}

const DEFAULT_CONNECT_STATE: Readonly<BitcoinConnectContextState> = {
    waiting: false,
    connect: undefined,
} as const;

const DEFAULT_CONNECT_CONTEXT = createDefaultContext('Connect', DEFAULT_CONNECT_STATE);

/** TODO: docs */
export const BitcoinConnectContext = createContext(DEFAULT_CONNECT_CONTEXT);

/** TODO: docs */
export function useBitcoinConnect(): BitcoinConnectContextState {
    return useContext(BitcoinConnectContext);
}
