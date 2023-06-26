import { POPUP_PORT_NAME } from '../../constants';
import { createPortRPC } from '../../rpc';
import type { Account } from '../../types';

const port = chrome.runtime.connect({ name: POPUP_PORT_NAME });
const rpc = createPortRPC(port);

export function getAccounts(): Promise<Account[]> {
    return rpc.callMethod('getAccounts');
}

let resolveAccountsRequest: (value: Account[]) => void;

export function approveAccountsRequest(accounts: Account[]): void {
    resolveAccountsRequest(accounts);
}

export function rejectAccountsRequest(): void {
    resolveAccountsRequest([]);
}

rpc.exposeMethod('requestAccounts', async () => {
    return new Promise((resolve) => {
        resolveAccountsRequest = resolve;
    });
});
