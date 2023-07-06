import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { getAddressName } from '../../utils/address';
import type { AddressPurpose } from '../../wallet';
import { AddressIcon } from './AddressIcon';

const PurposeListItem: FC<{ purpose: AddressPurpose; last: boolean }> = ({ purpose, last }) => (
    <article
        className={classNames('flex items-center p-2', {
            'border-r border-solid border-neutral-950': !last,
        })}
    >
        <AddressIcon purpose={purpose} size={8} />
        <h1 className="ml-1 text-[0.6rem] font-medium uppercase tracking-wide">{getAddressName(purpose)}</h1>
    </article>
);

export const PurposesList: FC<{ purposes: AddressPurpose[]; className?: string }> = ({ purposes, className }) => (
    <ul className={classNames('flex', className)}>
        {purposes.map((purpose, index) => (
            <li className="flex-1" key={purpose}>
                <PurposeListItem purpose={purpose} last={index === purposes.length - 1} />
            </li>
        ))}
    </ul>
);
