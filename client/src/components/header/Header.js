import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../appStore/actions';
import HttpService from '../../services/httpService';

const httpService = new HttpService();

const Header = ({ isAuthenticated, jwtToken, events, onLogout, showAlert }) => {
    const getDateString = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}${month}${day}`
    }
    const onLoadJson = async (token) => {
        try {
            const blob = await httpService.requestJsonBlob(token);
            console.log(blob);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `MyEvents${getDateString()}.json`;
            a.click();
        } catch (e) {
            console.log(e);

            showAlert(e.message);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <Link className="navbar-brand" to="/">Calendar App</Link>
            {isAuthenticated && <ul className="navbar-nav">
                <li className="nav-item mr-4 ">
                    <button
                        className={`btn btn-outline-secondary nav-link ${events.length ? 'active' : 'disabled'}`}
                        onClick={() => onLoadJson(jwtToken)} >
                        Download JSON
                    </button>
                </li>
                <li className="nav-item mr-4">
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

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    jwtToken: PropTypes.string,
    events: PropTypes.array.isRequired,
    onLogout: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth, calendar: { events } }) => ({ ...auth, events });
export default connect(mapStateToProps, actionCreators)(Header);
