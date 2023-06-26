import type { FC } from 'react';
import React from 'react';

import type { Network } from '../../types';
import { getNetworkName } from '../../utils/network';
import { NetworkIcon } from './NetworkIcon';

const NetworkListItem: FC<{ network: Network }> = ({ network }) => (
    <article
        style={{
            alignItems: 'center',
            backgroundColor: '#3e3e3e',
            borderRadius: '12px',
            display: 'flex',
            height: '24px',
            padding: '0 8px',
        }}
    >
        <NetworkIcon compact network={network} size={8} />
        <h1 style={{ fontSize: '11px', fontWeight: 400, lineHeight: 1, marginLeft: '4px' }}>
            {getNetworkName(network)}
        </h1>
    </article>
);

export const NetworksList: FC<{ networks: Network[]; style?: React.CSSProperties }> = ({ networks, style = {} }) => (
    <ul style={{ display: 'flex', margin: 0, padding: 0, ...style }}>
        {networks.map((network) => (
            <li key={network} style={{ listStyle: 'none', marginRight: '8px' }}>
                <NetworkListItem network={network} />
            </li>
        ))}
    </ul>
);
