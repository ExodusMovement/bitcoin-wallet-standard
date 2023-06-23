import type { IdentifierString } from '@wallet-standard/base';

/** Bitcoin Mainnet network. */
export const BITCOIN_MAINNET_CHAIN = 'bitcoin:mainnet';

/** Bitcoin Testnet network. */
export const BITCOIN_TESTNET_CHAIN = 'bitcoin:testnet';

/** Bitcoin Regtest network. */
export const BITCOIN_REGTEST_CHAIN = 'bitcoin:regtest';

/** Array of all Bitcoin networks. */
export const BITCOIN_CHAINS = [BITCOIN_MAINNET_CHAIN, BITCOIN_TESTNET_CHAIN, BITCOIN_REGTEST_CHAIN] as const;

/** Type of all Bitcoin networks. */
export type BitcoinChain = (typeof BITCOIN_CHAINS)[number];

/**
 * Check if a chain corresponds with one of the Bitcoin networks.
 */
export function isBitcoinChain(chain: IdentifierString): chain is BitcoinChain {
    return BITCOIN_CHAINS.includes(chain as BitcoinChain);
}
