import type { ROUTE_NAMES } from '../constants';

export type RouteName = (typeof ROUTE_NAMES)[number];

export type Network = 'bitcoin' | 'ordinals';

export interface Account {
    network: Network;
    publicKey: Uint8Array;
    address: string;
}
