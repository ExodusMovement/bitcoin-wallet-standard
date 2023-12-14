import type { BitcoinNetworkType } from 'sats-connect';

export type Account = {
    address: string;
    publicKey: string;
    purpose: BitcoinNetworkType;
};
