import type { FC, ReactNode } from 'react';
import React from 'react';

import { BitcoinConnectProvider } from './features/index.js';

/** TODO: docs */
export interface BitcoinWalletStandardProviderProps {
    children: NonNullable<ReactNode>;
    onError?: (error: Error) => void;
}

/** TODO: docs */
export const BitcoinWalletStandardProvider: FC<BitcoinWalletStandardProviderProps> = ({ children, onError }) => {
    return <BitcoinConnectProvider onError={onError}>{children}</BitcoinConnectProvider>;
};
