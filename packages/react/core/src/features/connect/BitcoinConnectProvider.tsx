import {
    BitcoinConnect,
    type BitcoinConnectFeature,
    type BitcoinConnectMethod,
} from '@exodus/bitcoin-wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import { useWallet } from '@wallet-standard/react';
import type { FC, ReactNode } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { BitcoinConnectContext } from './useBitcoinConnect.js';

export interface BitcoinConnectProviderProps {
    children: NonNullable<ReactNode>;
    onError?: (error: Error) => void;
}

export function hasBitcoinConnectFeature(features: Wallet['features']): features is BitcoinConnectFeature {
    return BitcoinConnect in features;
}

export const BitcoinConnectProvider: FC<BitcoinConnectProviderProps> = ({ children, onError }) => {
    const { features } = useWallet();

    // Handle errors, logging them by default.
    const handleError = useCallback(
        (error: Error) => {
            (onError || console.error)(error);
            return error;
        },
        [onError]
    );

    // Connect to the wallet.
    const [waiting, setWaiting] = useState(false);
    const promise = useRef<ReturnType<BitcoinConnectMethod>>();
    const connect = useMemo<BitcoinConnectMethod | undefined>(
        () =>
            hasBitcoinConnectFeature(features)
                ? async (input) => {
                      // If already waiting, wait for that promise to resolve.
                      if (promise.current) {
                          try {
                              await promise.current;
                          } catch (error: any) {
                              // Error will already have been handled below.
                          }
                      }

                      setWaiting(true);

                      try {
                          promise.current = features[BitcoinConnect].connect(input);
                          return await promise.current;
                      } catch (error: any) {
                          throw handleError(error);
                      } finally {
                          setWaiting(false);

                          promise.current = undefined;
                      }
                  }
                : undefined,
        [features, promise, handleError]
    );

    return (
        <BitcoinConnectContext.Provider
            value={{
                waiting,
                connect,
            }}
        >
            {children}
        </BitcoinConnectContext.Provider>
    );
};
