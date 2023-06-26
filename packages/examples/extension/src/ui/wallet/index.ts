import { POPUP_PORT_NAME } from '../../constants';
import { createPortRPC } from '../../rpc';
import type { Account } from '../../types';

const port = chrome.runtime.connect({ name: POPUP_PORT_NAME });
const rpc = createPortRPC(port);

export function getAccounts(): Promise<Account[]> {
    return rpc.callMethod('getAccounts');
}

let resolveConnect: (value: Account[] | null) => void;

export function approveConnection(accounts: Account[]): void {
    resolveConnect(accounts);
}

export function rejectConnection(): void {
    resolveConnect(null);
}

rpc.exposeMethod('connect', async () => {
    return new Promise((resolve) => {
        resolveConnect = resolve;
    });
});
