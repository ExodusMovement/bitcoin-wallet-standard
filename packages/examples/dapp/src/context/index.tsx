import { WalletStandardProvider } from '@wallet-standard/react';
import { ConnectionStatusProvider } from './ConnectionStatus';
import type { FC, ReactNode } from 'react';
import React from 'react';

export const AppContext: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
    return (
        <WalletStandardProvider>
            <ConnectionStatusProvider>{children}</ConnectionStatusProvider>
        </WalletStandardProvider>
    );
};
