import type { ROUTE_NAMES } from '../constants';

const POPUP_WIDTH = 320;
const POPUP_HEIGHT = 512;

async function getPopupPosition() {
    let left = 0;
    let top = 0;

    try {
        const lastFocused = await chrome.windows.getLastFocused();

        // Position window in top right corner of lastFocused window.
        top = lastFocused.top ?? 0;
        left = (lastFocused.left ?? 0) + Math.max((lastFocused.width ?? 0) - POPUP_WIDTH, 0);
    } catch (err) {
        // Ignore error.
    }

    return { left, top };
}

type RouteName = (typeof ROUTE_NAMES)[number];

async function createPopup({ routeName }: { routeName?: RouteName }): Promise<chrome.windows.Window> {
    const { left, top } = await getPopupPosition();
    const popupURL = new URL('../ui/popup.html', import.meta.url);
    if (routeName) {
        popupURL.searchParams.append('route', routeName);
    }

    return chrome.windows.create({
        url: popupURL.href,
        type: 'popup',
        width: POPUP_WIDTH,
        height: POPUP_HEIGHT,
        left,
        top,
    });
}

export async function openPopup({ routeName }: { routeName?: RouteName } = {}) {
    const popup = await createPopup({ routeName });

    let isOpen = true;

    const closePopup = async () => {
        if (isOpen) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await chrome.windows.remove(popup.id!);
        }
    };

    const popupClosed: Promise<null> = new Promise((resolve) => {
        const handleRemoved = (windowId: number) => {
            if (windowId === popup.id) {
                isOpen = false;

                chrome.windows.onRemoved.removeListener(handleRemoved);

                resolve(null);
            }
        };
        chrome.windows.onRemoved.addListener(handleRemoved);
    });

    return { closePopup, popupClosed };
}
