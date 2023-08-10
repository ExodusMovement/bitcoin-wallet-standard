import type { BitcoinNetworkType } from '@exodus/sats-connect';

export type Account = {
    address: string;
    publicKey: string;
    purpose: BitcoinNetworkType;
};
