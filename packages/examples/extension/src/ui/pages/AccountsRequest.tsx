import type { FC } from 'react';
import React from 'react';

import { AccountsList } from '../components/AccountsList';
import { NetworksList } from '../components/NetworksList';
import { useAccounts } from '../hooks/useAccounts';
import { approveAccountsRequest, rejectAccountsRequest } from '../wallet';

export const AccountsRequest: FC = () => {
    const accounts = useAccounts();

    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                padding: '16px',
            }}
        >
            <h1 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 2, marginTop: '112px' }}>Accounts Request</h1>
            <NetworksList networks={['bitcoin', 'ordinals']} style={{ marginBottom: '24px' }} />
            <p style={{ fontSize: '14px', marginBottom: '32px', opacity: 0.9, textAlign: 'center' }}>
                Address for receiving Ordinals and payments.
            </p>
            <AccountsList accounts={accounts} compact style={{ flex: 1 }} />
            <div style={{ display: 'flex' }}>
                <button type="button" onClick={rejectAccountsRequest}>
                    Reject
                </button>
                <button type="button" onClick={() => approveAccountsRequest(accounts)} style={{ marginLeft: '8px' }}>
                    Approve
                </button>
            </div>
        </div>
    );
};
