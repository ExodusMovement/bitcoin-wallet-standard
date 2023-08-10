import React, { useState, createContext } from 'react';
import type { FC, ReactNode } from 'react';
import type { Account } from '../types';

interface ConnectionStatus {
    isConnected: boolean;
    accounts: Account[];
}

export const ConnectionStatusContext = createContext<{
    isConnected: ConnectionStatus['isConnected'];
    accounts: ConnectionStatus['accounts'];
    setConnectionStatus: (connectionStatus: Partial<ConnectionStatus>) => void;
} | null>(null);

export const ConnectionStatusProvider: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ isConnected: false, accounts: [] });

    const value = {
        isConnected: connectionStatus.isConnected,
        accounts: connectionStatus.accounts,
        setConnectionStatus: ({ accounts = [], isConnected = false }: Partial<ConnectionStatus>) => {
            if (accounts.length > 0) isConnected = true;
            setConnectionStatus({ isConnected, accounts });
        },
    };

    return <ConnectionStatusContext.Provider value={value}>{children}</ConnectionStatusContext.Provider>;
};
