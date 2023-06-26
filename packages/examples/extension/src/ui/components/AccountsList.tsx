import type { FC } from 'react';
import React from 'react';

import type { Account } from '../../types';
import { condenseAddress } from '../../utils/address';
import { getNetworkName } from '../../utils/network';
import { NetworkIcon } from './NetworkIcon';

const AccountListItem: FC<{ account: Account; compact: boolean }> = ({ account, compact }) => (
    <article
        style={{
            backgroundColor: '#3e3e3e',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: compact ? 'row' : 'column',
            padding: compact ? '12px' : '16px',
            ...(compact && {
                alignItems: 'center',
            }),
        }}
    >
        <NetworkIcon compact={compact} network={account.network} size={compact ? 16 : 24} />
        {!compact && (
            <h1 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1, marginTop: '8px' }}>
                {getNetworkName(account.network)}
            </h1>
        )}
        <p
            onClick={() => {
                navigator.clipboard.writeText(account.address);
            }}
            style={{
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: compact ? '14px' : '15px',
                lineHeight: 1.6,
                opacity: compact ? 1 : 0.6,
                ...(compact && {
                    marginLeft: '8px',
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
        {accounts.map((account) => (
            <li key={account.address} style={{ listStyle: 'none', marginBottom: '8px' }}>
                <AccountListItem account={account} compact={compact} />
            </li>
        ))}
    </ul>
);
