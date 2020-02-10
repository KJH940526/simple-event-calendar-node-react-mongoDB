import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../appStore/actions';
import { withEventService } from '../hoc/with-event-service';

const AuthPage = ({
    email,
    password,
    onLogin,
    showAlert,
    registerRequest,
    loginRequest,
    changeAuthFormHandler
}) => {

    const registerHandler = async () => {
        const body = { email, password };
        try {
            const data = await registerRequest(body);
            showAlert(data.message, 'success');
        } catch (e) {
            showAlert(e.message);
        }
    };

    const loginHandler = async () => {
        const body = { email, password };

        try {
            const { token, userId } = await loginRequest(body);
            onLogin(token, userId);
        } catch (e) {
            showAlert(e.message);
        }
    }

    return (
        <div className="row align-items-center position-relative">
            <div className="col-md-4 offset-md-4">
                <h1 className="m-5">Calendar event</h1>
                <div className="card  text-white bg-primary">
                    <div className="card-body">
                        <h4 className="card-title">Account Login</h4>
                        <div className="form-group">
                            <label
                                htmlFor="inputEmail"
                                className="sr-only">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                id="inputEmail"
                                className="form-control mb-2"
                                placeholder="Email address" autoFocus
                                onChange={event => changeAuthFormHandler(event, { email, password })} />
                            <label
                                htmlFor="inputPassword"
                                className="sr-only">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                id="inputPassword"
                                className="form-control  mb-2"
                                placeholder="Password: must be longer than 5 characters"
                                onChange={(event) => changeAuthFormHandler(event, { email, password })} />
                        </div>
                        <div className="card-actions d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-success mr-2"
                                onClick={loginHandler}
                            // disabled={loading}
                            >
                                Sing In
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={registerHandler}
                            // disabled={loading}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ ...auth });

export default withEventService(connect(mapStateToProps, actionCreators)(AuthPage));
