import type { FC } from 'react';
import React from 'react';

import { AccountsList } from '../components/AccountsList';
import { useAccounts } from '../hooks/useAccounts';

export const Home: FC = () => {
    const accounts = useAccounts();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                padding: '16px',
            }}
        >
            <h1 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 2 }}>Accounts:</h1>
            <AccountsList accounts={accounts} />
        </div>
    );
};
