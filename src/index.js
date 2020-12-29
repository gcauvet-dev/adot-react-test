import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@djthoms/pretty-checkbox';

import App from './components/App';

const loggerMiddleware = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(() => {}, composeEnhancers(applyMiddleware(reduxThunk, loggerMiddleware)));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

export default store;
