import { BitcoinWalletStandardProvider } from '@exodus/bitcoin-wallet-standard-react';
import { WalletStandardProvider } from '@wallet-standard/react';
import type { FC, ReactNode } from 'react';
import React from 'react';

export const AppContext: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
    return (
        <WalletStandardProvider>
            <BitcoinWalletStandardProvider>{children}</BitcoinWalletStandardProvider>
        </WalletStandardProvider>
    );
};
