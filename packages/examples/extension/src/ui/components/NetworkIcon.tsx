import type { FC } from 'react';
import React from 'react';

import type { Network } from '../../types';

const BitcoinIcon: FC<{ compact: boolean; size: number }> = ({ compact, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#F2A900" />
        {!compact && (
            <>
                <path
                    d="M16.6171 9.41654C16.4596 7.77847 15.0456 7.22951 13.2588 7.07295V4.7998H11.8761V7.01228C11.5131 7.01228 11.1412 7.01913 10.7723 7.02696V4.7998H9.38967L9.38869 7.07099C9.08925 7.07686 8.79471 7.08273 8.508 7.08273V7.07588L6.60083 7.0749V8.5525C6.60083 8.5525 7.62243 8.53292 7.60481 8.55152C8.16551 8.55152 8.34752 8.87639 8.40036 9.15723V11.7464C8.4395 11.7464 8.48941 11.7484 8.54617 11.7562H8.40036L8.39939 15.3837C8.37492 15.5598 8.2712 15.8406 7.87978 15.8416C7.89739 15.8573 6.87482 15.8416 6.87482 15.8416L6.59985 17.4934H8.40036C8.73502 17.4934 9.06479 17.4993 9.38771 17.5012L9.38869 19.7998H10.7704V17.5257C11.1491 17.5335 11.516 17.5364 11.8752 17.5364L11.8742 19.7998H13.2568V17.5061C15.5819 17.373 17.2111 16.7869 17.4127 14.6028C17.5761 12.8444 16.7492 12.0586 15.4292 11.7415C16.2326 11.3345 16.7346 10.6153 16.6171 9.41654ZM14.6816 14.3308C14.6816 16.0481 11.7411 15.8534 10.8027 15.8534V12.8072C11.7411 12.8091 14.6816 12.54 14.6816 14.3308ZM14.0377 10.034C14.0377 11.5967 11.5835 11.4137 10.8027 11.4147V8.65328C11.5845 8.65328 14.0387 8.40474 14.0377 10.034Z"
                    fill="white"
                />
                <path
                    d="M16.6171 9.41654C16.4596 7.77847 15.0456 7.22951 13.2588 7.07295V4.7998H11.8761V7.01228C11.5131 7.01228 11.1412 7.01913 10.7723 7.02696V4.7998H9.38967L9.38869 7.07099C9.08925 7.07686 8.79471 7.08273 8.508 7.08273V7.07588L6.60083 7.0749V8.5525C6.60083 8.5525 7.62243 8.53292 7.60481 8.55152C8.16551 8.55152 8.34752 8.87639 8.40036 9.15723V11.7464C8.4395 11.7464 8.48941 11.7484 8.54617 11.7562H8.40036L8.39939 15.3837C8.37492 15.5598 8.2712 15.8406 7.87978 15.8416C7.89739 15.8573 6.87482 15.8416 6.87482 15.8416L6.59985 17.4934H8.40036C8.73502 17.4934 9.06479 17.4993 9.38771 17.5012L9.38869 19.7998H10.7704V17.5257C11.1491 17.5335 11.516 17.5364 11.8752 17.5364L11.8742 19.7998H13.2568V17.5061C15.5819 17.373 17.2111 16.7869 17.4127 14.6028C17.5761 12.8444 16.7492 12.0586 15.4292 11.7415C16.2326 11.3345 16.7346 10.6153 16.6171 9.41654ZM14.6816 14.3308C14.6816 16.0481 11.7411 15.8534 10.8027 15.8534V12.8072C11.7411 12.8091 14.6816 12.54 14.6816 14.3308ZM14.0377 10.034C14.0377 11.5967 11.5835 11.4137 10.8027 11.4147V8.65328C11.5845 8.65328 14.0387 8.40474 14.0377 10.034Z"
                    fill="white"
                />
            </>
        )}
    </svg>
);

const OrdinalIcon: FC<{ compact: boolean; size: number }> = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.25" fill="#303354" stroke="white" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="7" fill="white" />
    </svg>
);

export const NetworkIcon: FC<{ network: Network; size?: number; compact?: boolean }> = ({
    network,
    size = 24,
    compact = false,
}) => {
    switch (network) {
        case 'bitcoin':
            return <BitcoinIcon compact={compact} size={size} />;
        case 'ordinals':
            return <OrdinalIcon compact={compact} size={size} />;
    }
};