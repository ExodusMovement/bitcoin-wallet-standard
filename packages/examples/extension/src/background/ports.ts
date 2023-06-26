import { ACCOUNTS_REQUEST_ROUTE_NAME } from '../constants';
import type { RPC } from '../rpc';
import type { Account } from '../types';
import { createPortRPC } from '../rpc';
import { asyncState } from '../utils/asyncState';
import { openPopup } from '../utils/popup';
import { getMnemonic } from './storage';
import { getAccounts } from './wallet';

// Allows content to communicate with popup via the background process.
const asyncPopupRPC = asyncState<RPC>();

export function connectPopup(port: chrome.runtime.Port) {
    const rpc = createPortRPC(port);

    rpc.exposeMethod('getAccounts', async () => {
        const mnemonic = await getMnemonic();
        return getAccounts(mnemonic);
    });

    asyncPopupRPC.set(rpc);

    port.onDisconnect.addListener(() => {
        asyncPopupRPC.reset();
        rpc.end();
    });
}

export function connectContent(port: chrome.runtime.Port) {
    const rpc = createPortRPC(port);

    rpc.exposeMethod('connect', async () => {
        const { closePopup, popupClosed } = await openPopup({ routeName: ACCOUNTS_REQUEST_ROUTE_NAME });

        const popupRPC = await asyncPopupRPC.get();
        const accountsPromise = popupRPC.callMethod<Account[]>('requestAccounts');

        const result = await Promise.race([accountsPromise, popupClosed]);

        closePopup();

        if (result === null) {
            // TODO: Allow rpc to handle errors and throw here.
            // throw new Error('The user rejected the request.');
            return null;
        }

        const accounts = result;
        if (accounts.length === 0) {
            // TODO: Allow rpc to handle errors and throw here.
            // throw new Error('The user rejected the request.');
            return null;
        }

        return accounts;
    });

    port.onDisconnect.addListener(() => {
        rpc.end();
    });
}
