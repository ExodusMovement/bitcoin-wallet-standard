import type { FC } from 'react';
import React from 'react';

import type { Account } from '../../types';
import { condenseAddress, getAddressName } from '../../utils/address';
import { AddressIcon } from './AddressIcon';

const AccountListItem: FC<{ account: Account; compact: boolean; last: boolean }> = ({ account, compact, last }) => (
    <article
        style={{
            display: 'flex',
            flexDirection: compact ? 'row' : 'column',
            padding: '8px',
            ...(compact && {
                alignItems: 'center',
            }),
            ...(!last && {
                borderBottom: '1px solid #131313',
            }),
        }}
    >
        <AddressIcon compact={compact} purpose={account.purpose} size={compact ? 16 : 24} />
        {!compact && (
            <h1
                style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    lineHeight: 1,
                    marginTop: '8px',
                    textTransform: 'uppercase',
                }}
            >
                {getAddressName(account.purpose)}
            </h1>
        )}
        <p
            onClick={() => {
                navigator.clipboard.writeText(account.address);
            }}
            style={{
                cursor: 'pointer',
                fontFamily: '"Roboto Mono", monospace',
                fontSize: '13px',
                lineHeight: 1,
                ...(compact
                    ? {
                          marginLeft: '8px',
                      }
                    : {
                          color: '#757575',
                          marginTop: '4px',
                      }),
            }}
        >
            {condenseAddress(account.address)}
        </p>
    </article>
);

export const AccountsList: FC<{ accounts: Account[]; compact?: boolean; style?: React.CSSProperties }> = ({
    accounts,
    compact = false,
    style = {},
}) => (
    <ul style={{ display: 'flex', flexDirection: 'column', margin: 0, padding: 0, width: '100%', ...style }}>
        {accounts.map((account, index) => (
            <li key={account.address} style={{ listStyle: 'none' }}>
                <AccountListItem account={account} compact={compact} last={index === accounts.length - 1} />
            </li>
        ))}
    </ul>
);
