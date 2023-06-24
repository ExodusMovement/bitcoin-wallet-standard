import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import { rpc } from '../rpc';

export type Network = 'bitcoin' | 'ordinals';

export interface Account {
    network: Network;
    publicKey: Uint8Array;
    address: string;
}

function computeAddress(network: Network, publicKey: Uint8Array) {
    switch (network) {
        case 'bitcoin':
            /** TODO: Implement. */
            return '';
        case 'ordinals':
            /** TODO: Implement. */
            return '';
        default:
            throw new Error(`Unknown network: '${network}'`);
    }
}

export const AccountsContext = React.createContext([] as Account[]);

export const AccountsProvider: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const updateAccounts = async () => {
            const accounts = await rpc.callMethod('getAccounts');
            setAccounts(
                accounts.map(({ network, publicKey }: { network: Network; publicKey: Uint8Array }) => ({
                    network,
                    publicKey,
                    address: computeAddress(network, publicKey),
                }))
            );
        };
        updateAccounts();
    }, []);

    return <AccountsContext.Provider value={accounts}>{children}</AccountsContext.Provider>;
};
