import type { FC } from 'react';
import React, { useState } from 'react';

import type { Account } from '../../types';
import { condenseAddress } from '../../utils/address';
import { useAccounts } from '../hooks/useAccounts';
import { approveAccountsRequest, rejectAccountsRequest } from '../wallet';

export const AccountsRequest: FC = () => {
    const accounts = useAccounts();

    const [selectedAccounts, setSelectedAccounts] = useState(new Map<string, Account>());
    const hasSelectedAccounts = selectedAccounts.size > 0;

    const isAccountSelected = (address: string) => selectedAccounts.has(address);

    const handleAccountSelected = (address: string, selected: boolean) => {
        if (selected) {
            const account = accounts.find((account) => account.address === address)!;
            setSelectedAccounts((prevSelectedAccounts) => {
                prevSelectedAccounts.set(address, account);
                return new Map(prevSelectedAccounts.entries());
            });
        } else {
            setSelectedAccounts((prevSelectedAccounts) => {
                prevSelectedAccounts.delete(address);
                return new Map(prevSelectedAccounts.entries());
            });
        }
    };

    return (
        <div>
            <h1>Accounts Request</h1>
            <ul>
                {accounts.map((account) => (
                    <li key={account.address}>
                        <input
                            type="checkbox"
                            id={account.address}
                            checked={isAccountSelected(account.address)}
                            onChange={(event) => {
                                const address = event.target.value;
                                const selected = event.target.checked;
                                handleAccountSelected(address, selected);
                            }}
                            value={account.address}
                        />
                        <label htmlFor={account.address}>{condenseAddress(account.address)}</label>
                    </li>
                ))}
            </ul>
            <div>
                <button type="button" onClick={rejectAccountsRequest}>
                    Reject
                </button>
                <button
                    type="button"
                    onClick={() => approveAccountsRequest([...selectedAccounts.values()])}
                    disabled={!hasSelectedAccounts}
                >
                    Approve
                </button>
            </div>
        </div>
    );
};
