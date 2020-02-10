import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { EventsPage } from './pages/EventsPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/events" exact>
                    <EventsPage />
                </Route>
                <Redirect to="/events" />
            </Switch>
        );
    }
    return (
        <Switch >
            <Route path="/">
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
};

useRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}