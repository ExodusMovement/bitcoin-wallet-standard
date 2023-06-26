import type { Network } from '../types';

export function getNetworkName(network: Network) {
    switch (network) {
        case 'bitcoin':
            return 'Bitcoin';
        case 'ordinals':
            return 'Ordinals';
    }
}
