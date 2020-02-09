import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../appStore/actions';
import './alert.scss'

const Alert = ({ hideAlert, alert }) => {

    if (alert.visible) {
        setTimeout(hideAlert, 2000);
    }

    return (
        <CSSTransition
            in={alert.visible}
            timeout={{
                enter: 500,
                exit: 350
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit>
            <div className={` position-absolute alert alert-${alert.type || 'warning'} `}>
                {alert.text}
            </div>
        </CSSTransition>
    );
};

const mapStateToProps = ({ alert }) => ({ alert });
const mapDispatchToProps = (dispatch) => {
    const { hideAlert } = bindActionCreators(actions, dispatch);
    return {
        hideAlert
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);