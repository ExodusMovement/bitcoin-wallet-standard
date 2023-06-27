import type { FC } from 'react';
import React from 'react';

import { AccountsList } from '../components/AccountsList';
import { Button } from '../components/Button';
import { PurposesList } from '../components/PurposesList';
import { useAccounts } from '../hooks/useAccounts';
import { approveAccountsRequest, rejectAccountsRequest } from '../wallet';

export const AccountsRequest: FC = () => {
    const accounts = useAccounts();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <div style={{ borderBottom: '2px solid #131313', height: '200px' }}></div>
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
                Accounts Request
            </h1>
            <PurposesList purposes={['payment', 'ordinals']} style={{ borderBottom: '2px solid #131313' }} />
            <p style={{ borderBottom: '2px solid #131313', fontSize: '13px', padding: '8px' }}>
                Address for receiving Ordinals and payments.
            </p>
            <AccountsList accounts={accounts} compact style={{ borderBottom: '2px solid #131313' }} />
            <div style={{ borderBottom: '2px solid #131313', flex: 1 }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '8px' }}>
                <Button onClick={rejectAccountsRequest}>Reject</Button>
                <Button onClick={() => approveAccountsRequest(accounts)}>Approve</Button>
            </div>
        </div>
    );
};
