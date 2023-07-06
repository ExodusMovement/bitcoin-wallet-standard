import type { FC } from 'react';
import React from 'react';

import { AccountsList } from '../components/AccountsList';
import { useAccounts } from '../hooks/useAccounts';

export const Home: FC = () => {
    const accounts = useAccounts();

    return (
        <div className="flex min-h-screen flex-col">
            <h1 className="border-b-2 border-solid border-neutral-950 p-2 text-sm font-medium uppercase tracking-wide">
                Accounts
            </h1>
            <AccountsList accounts={accounts} className="border-b-2 border-solid border-neutral-950" />
        </div>
    );
};
