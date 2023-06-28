import * as bip39 from 'bip39';

/**
 * Generates a BIP-39 mnemonic.
 */
export function generateMnemonic(): string {
    return bip39.generateMnemonic();
}

/**
 * Returns the seed for a given BIP-39 mnemonic.
 */
export function getSeedFromMnemonic(mnemonic: string): Buffer {
    return bip39.mnemonicToSeedSync(mnemonic);
}
