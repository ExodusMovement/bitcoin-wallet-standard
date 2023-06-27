import type { AddressPurpose } from '../types';

export function condenseAddress(address: string): string {
    return `${address.slice(0, 10)}..${address.slice(-10)}`;
}

export function getAddressName(purpose: AddressPurpose): string {
    switch (purpose) {
        case 'payment':
            return 'Bitcoin';
        case 'ordinals':
            return 'Ordinals';
    }
}
