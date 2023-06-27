import type { ROUTE_NAMES } from '../constants';

export type RouteName = (typeof ROUTE_NAMES)[number];

export type AddressPurpose = 'payment' | 'ordinals';

export interface Account {
    purpose: AddressPurpose;
    publicKey: Uint8Array;
    address: string;
}
