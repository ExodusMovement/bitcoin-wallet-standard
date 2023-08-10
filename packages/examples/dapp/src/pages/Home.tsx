import type { FC } from 'react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConnectionStatusContext } from '../context/ConnectionStatus';
import { condenseAddress } from '../utils/address';

const Disconnected: FC = () => {
    return (
        <Link
            className="inline-block rounded-md bg-neutral-950 px-8 py-3 text-xs uppercase tracking-wide text-neutral-50 hover:opacity-80"
            to="/connect"
        >
            Connect Wallet
        </Link>
    );
};

const Connected: FC = () => {
    const connectionStatus = useContext(ConnectionStatusContext);

    return (
        <>
            <h1 className="mb-4 text-lg font-medium uppercase tracking-wide">Accounts</h1>
            <ul>
                {connectionStatus?.accounts.map((account, index) => (
                    <li key={index}>
                        <p className="font-mono">{condenseAddress(account.address)}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export const Home: FC = () => {
    const connectionStatus = useContext(ConnectionStatusContext);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            {connectionStatus?.isConnected ? <Connected /> : <Disconnected />}
        </div>
    );
};
