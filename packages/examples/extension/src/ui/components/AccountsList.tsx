import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { condenseAddress, getAddressName } from '../../utils/address';
import type { Account } from '../../wallet';
import { AddressIcon } from './AddressIcon';

const AccountListItem: FC<{ account: Account; compact: boolean; copyable: boolean; last: boolean }> = ({
    account,
    compact,
    copyable,
    last,
}) => (
    <article
        className={classNames('flex p-2', {
            'border-b border-solid border-neutral-950': !last,
            'flex-col': !compact,
            'flex-row': compact,
            'items-center': compact,
            'items-start': !compact,
        })}
    >
        <AddressIcon purpose={account.purpose} size={compact ? 16 : 24} />
        {!compact && (
            <h1 className="mt-2 text-xs font-medium uppercase tracking-wide">{getAddressName(account.purpose)}</h1>
        )}
        <p
            className={classNames('font-mono text-sm', {
                'cursor-pointer': copyable,
                'ml-2': compact,
                'mt-1': !compact,
                'text-neutral-500': !compact,
            })}
            onClick={() => {
                if (copyable) {
                    navigator.clipboard.writeText(account.address);
                }
            }}
        >
            {condenseAddress(account.address)}
        </p>
    </article>
);

export const AccountsList: FC<{ accounts: Account[]; compact?: boolean; className?: string }> = ({
    accounts,
    className,
    compact = false,
}) => (
    <ul className={classNames('flex w-full flex-col', className)}>
        {accounts.map((account, index) => (
            <li key={account.address}>
                <AccountListItem
                    account={account}
                    compact={compact}
                    copyable={!compact}
                    last={index === accounts.length - 1}
                />
            </li>
        ))}
    </ul>
);
