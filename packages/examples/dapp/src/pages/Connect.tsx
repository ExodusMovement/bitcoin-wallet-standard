import { useWallet, useWallets } from '@wallet-standard/react';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useIsConnected } from '../hooks/useIsConnected';

export const Connect: FC = () => {
    const { wallets } = useWallets();
    const { setWallet, wallet } = useWallet();
    const isConnected = useIsConnected();

    useEffect(() => {
        async function connectOrDeselect() {
            try {
                // TODO: Connect.
            } catch (err) {
                setWallet(null);
            }
        }

        if (wallet && !isConnected) {
            connectOrDeselect();
        }
    }, [wallet, isConnected, setWallet]);

    if (isConnected) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div>
            <h1>Connect Wallet</h1>
            <Link to="/">Back</Link>
            <ul>
                {wallets.map((wallet, index) => (
                    <li key={index}>
                        {wallet.name}
                        <button type="button" onClick={() => setWallet(wallet)}>
                            Select
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
