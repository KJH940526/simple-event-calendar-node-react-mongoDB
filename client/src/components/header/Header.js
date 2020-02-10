import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../appStore/actions';
import HttpService from '../../services/httpService';

const httpService = new HttpService();

const Header = ({ isAuthenticated, jwtToken, events, onLogout, showAlert }) => {
    const onLoadJson = async (token) => {
        try {
            const blob = await httpService.requestJsonBlob(token);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `MyEvents${Date.now()}.json`;
            a.click();
        } catch (e) {
            showAlert(e.message);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <Link className="navbar-brand" to="/">Calendar App</Link>
            {isAuthenticated && <ul className="navbar-nav">
                <li className="nav-item ">
                    <button
                        className={`btn btn-outline-secondary nav-link ${events.length ? 'active' : 'disabled'}`}
                        onClick={() => onLoadJson(jwtToken)} >
                        Download JSON
                    </button>
                </li>
                <li className="nav-item ">
                    <Link
                        className="nav-link active"
                        to='/'
                        onClick={onLogout}>
                        Log out
                     </Link>
                </li>
            </ul>}
        </nav >
    );
};

const mapStateToProps = ({ auth, calendar: { events } }) => ({ ...auth, events });
export default connect(mapStateToProps, actionCreators)(Header);
