import { setMnemonic } from './storage';
import { generateMnemonic } from './wallet';

export function initialize() {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
}
