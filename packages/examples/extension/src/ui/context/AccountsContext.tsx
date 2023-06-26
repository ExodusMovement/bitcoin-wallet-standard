import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import type { Account } from '../../types';
import { getAccounts } from '../wallet';

export const AccountsContext = React.createContext([] as Account[]);

export const AccountsProvider: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const updateAccounts = async () => {
            const accounts = await getAccounts();
            setAccounts(accounts);
        };
        updateAccounts();
    }, []);

    return <AccountsContext.Provider value={accounts}>{children}</AccountsContext.Provider>;
};
