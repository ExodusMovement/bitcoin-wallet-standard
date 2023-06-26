import type { RPC } from '../rpc';
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
        const { closePopup, popupClosed } = await openPopup();

        const popupRPC = await asyncPopupRPC.get();
        const connectResult = popupRPC.callMethod('connect');

        const response = await Promise.race([connectResult, popupClosed]);

        closePopup();

        return response;
    });

    port.onDisconnect.addListener(() => {
        rpc.end();
    });
}
