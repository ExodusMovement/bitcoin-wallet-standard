import type { FC } from 'react';
import React from 'react';

import { approveAccountsRequest, rejectAccountsRequest } from '../api/wallet';
import { AccountsList } from '../components/AccountsList';
import { Button } from '../components/Button';
import { PurposesList } from '../components/PurposesList';
import { useAccounts } from '../hooks/useAccounts';

export const AccountsRequest: FC = () => {
    const accounts = useAccounts();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="h-48 border-b-2 border-solid border-neutral-950"></div>
            <h1 className="border-b-2 border-solid border-neutral-950 p-2 text-sm font-medium uppercase tracking-wide">
                Accounts Request
            </h1>
            <PurposesList purposes={['payment', 'ordinals']} className="border-b-2 border-solid border-neutral-950" />
            <p className="border-b-2 border-solid border-neutral-950 p-2 text-xs">
                Address for receiving Ordinals and payments.
            </p>
            <AccountsList accounts={accounts} className="border-b-2 border-solid border-neutral-950" compact />
            <div className="flex-1 border-b-2 border-solid border-neutral-950"></div>
            <div className="flex justify-evenly p-2">
                <Button onClick={rejectAccountsRequest}>Reject</Button>
                <Button onClick={() => approveAccountsRequest(accounts)}>Approve</Button>
            </div>
        </div>
    );
};
