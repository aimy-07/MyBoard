import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import BoardPage from './components/BoardPage';

import { GlobalStyle } from './components/StyleComponents/FoundationStyles';
import Fonts from './components/StyleComponents/Fonts';

const container = document.getElementById('contents');

// ストアのクリア
// persistor.purge();

ReactDom.render(
    <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle/>
            <Fonts/>
            <BoardPage/>
        </PersistGate>
    </Provider>,
    container,
);
