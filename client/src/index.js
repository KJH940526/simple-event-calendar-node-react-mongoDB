import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { EventServiceProvider } from './http-service-context/httpServiceContext';
import HttpService from './services/httpService';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './appStore/store';
import App from './App';

const httpService = new HttpService();

ReactDOM.render(
    <StoreProvider store={store}>
        <EventServiceProvider value={httpService}>
            <Router>
                <App />
            </Router>
        </EventServiceProvider>
    </StoreProvider>
    , document.getElementById('root'));

