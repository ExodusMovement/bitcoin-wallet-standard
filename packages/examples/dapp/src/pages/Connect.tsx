import type { BitcoinAddressPurpose } from '@exodus/bitcoin-wallet-standard-features';
import { useBitcoinConnect } from '@exodus/bitcoin-wallet-standard-react';
import { useWallet, useWallets } from '@wallet-standard/react';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useIsConnected } from '../hooks/useIsConnected';
import { BitcoinConnect } from '@exodus/bitcoin-wallet-standard-features';

import type { Wallet } from '@wallet-standard/base';

function hasBitcoinConnectFeature(wallet: Wallet): boolean {
    return BitcoinConnect in wallet.features;
}

const purposes: BitcoinAddressPurpose[] = ['payment', 'ordinals'];

export const Connect: FC = () => {
    const { wallets } = useWallets();
    const { setWallet, wallet } = useWallet();
    const isConnected = useIsConnected();
    const { connect } = useBitcoinConnect();

    useEffect(() => {
        async function connectOrDeselect() {
            try {
                await connect!({ purposes });
            } catch (err) {
                setWallet(null);
            }
        }

        if (wallet && !isConnected && connect) {
            connectOrDeselect();
        }
    }, [wallet, isConnected, connect, setWallet]);

    if (isConnected) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="mb-4 text-lg font-medium uppercase tracking-wide">Connect Wallet</h1>
            <ul className="mb-8 flex flex-col">
                {wallets.filter(hasBitcoinConnectFeature).map((wallet, index) => (
                    <li key={wallet.name}>
                        <button
                            className={classNames(
                                'w-full rounded-md border border-solid border-neutral-950 px-2 py-1 text-xs uppercase tracking-wide',
                                {
                                    'mb-2': index !== wallets.length - 1,
                                }
                            )}
                            type="button"
                            onClick={() => setWallet(wallet)}
                        >
                            {wallet.name}
                        </button>
                    </li>
                ))}
            </ul>
            <Link className="text-sm underline" to="/">
                Back
            </Link>
        </div>
    );
};
