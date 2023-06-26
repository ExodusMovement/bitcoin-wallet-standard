import { CONTENT_PORT_NAME, POPUP_PORT_NAME } from '../constants';
import { initialize } from './initialize';
import { connectContent, connectPopup } from './ports';

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        initialize();
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === CONTENT_PORT_NAME) {
        connectContent(port);
    } else if (port.name === POPUP_PORT_NAME) {
        connectPopup(port);
    }
});
