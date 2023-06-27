import type { FC } from 'react';
import React from 'react';

import type { AddressPurpose } from '../../types';
import { getAddressName } from '../../utils/address';
import { AddressIcon } from './AddressIcon';

const PurposeListItem: FC<{ purpose: AddressPurpose }> = ({ purpose }) => (
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
        <AddressIcon compact purpose={purpose} size={8} />
        <h1 style={{ fontSize: '11px', fontWeight: 400, lineHeight: 1, marginLeft: '4px' }}>
            {getAddressName(purpose)}
        </h1>
    </article>
);

export const PurposesList: FC<{ purposes: AddressPurpose[]; style?: React.CSSProperties }> = ({
    purposes,
    style = {},
}) => (
    <ul style={{ display: 'flex', margin: 0, padding: 0, ...style }}>
        {purposes.map((purpose) => (
            <li key={purpose} style={{ listStyle: 'none', marginRight: '8px' }}>
                <PurposeListItem purpose={purpose} />
            </li>
        ))}
    </ul>
);
