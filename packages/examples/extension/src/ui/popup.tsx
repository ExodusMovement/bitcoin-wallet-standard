import type { FC } from 'react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppContext } from './context';
import { AccountsRequest } from './pages/AccountsRequest';
import { Home } from './pages/Home';

const Root: FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const isAccountsRequest = queryParams.get('accountsRequest') !== null;
    const Route = isAccountsRequest ? AccountsRequest : Home;

    return (
        <StrictMode>
            <AppContext>
                <Route />
            </AppContext>
        </StrictMode>
    );
};

const rootNode = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootNode!);
root.render(<Root />);
