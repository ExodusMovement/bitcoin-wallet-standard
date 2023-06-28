import type { FC } from 'react';
import React from 'react';

import { getAddressName } from '../../utils/address';
import type { AddressPurpose } from '../../wallet';
import { AddressIcon } from './AddressIcon';

const PurposeListItem: FC<{ purpose: AddressPurpose; last: boolean }> = ({ purpose, last }) => (
    <article
        style={{
            alignItems: 'center',
            display: 'flex',
            padding: '8px',
            ...(!last && {
                borderRight: '1px solid #131313',
            }),
        }}
    >
        <AddressIcon purpose={purpose} size={8} />
        <h1
            style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.5px',
                lineHeight: 1,
                marginLeft: '4px',
                textTransform: 'uppercase',
            }}
        >
            {getAddressName(purpose)}
        </h1>
    </article>
);

export const PurposesList: FC<{ purposes: AddressPurpose[]; style?: React.CSSProperties }> = ({
    purposes,
    style = {},
}) => (
    <ul style={{ display: 'flex', margin: 0, padding: 0, ...style }}>
        {purposes.map((purpose, index) => (
            <li key={purpose} style={{ flex: 1, listStyle: 'none' }}>
                <PurposeListItem purpose={purpose} last={index === purposes.length - 1} />
            </li>
        ))}
    </ul>
);
