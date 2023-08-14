import React, { useState, createContext } from 'react';
import type { FC, ReactNode } from 'react';
import type { Account } from '../types';

export const ConnectionStatusContext = createContext<{
    isConnected: boolean;
    accounts: Account[];
    setAccounts: (accounts: Account[]) => void;
} | null>(null);

export const ConnectionStatusProvider: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    const value = {
        isConnected: accounts.length > 0,
        accounts: accounts,
        setAccounts,
    };

    return <ConnectionStatusContext.Provider value={value}>{children}</ConnectionStatusContext.Provider>;
};
