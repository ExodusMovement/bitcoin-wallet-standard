import type { FC } from 'react';
import React from 'react';

import { useAccounts } from '../hooks/useAccounts';

export const Home: FC = () => {
    const accounts = useAccounts();

    return (
        <div>
            <h1>Exodus Wallet</h1>
            <ul>
                {accounts.map((account) => (
                    <li key={account.address}>
                        <code>{account.address}</code>
                    </li>
                ))}
            </ul>
        </div>
    );
};
