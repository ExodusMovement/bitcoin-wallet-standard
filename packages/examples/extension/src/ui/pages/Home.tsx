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
            }}
        >
            <h1
                style={{
                    borderBottom: '2px solid #131313',
                    fontSize: '15px',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    lineHeight: 1,
                    padding: '8px',
                    textTransform: 'uppercase',
                }}
            >
                Accounts
            </h1>
            <AccountsList accounts={accounts} />
        </div>
    );
};
