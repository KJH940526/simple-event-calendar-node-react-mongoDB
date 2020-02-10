import React from 'react';
import PropTypes from 'prop-types';


import './event.scss';

const Event = ({ event, removeEventHandler }) => {
    const { start, duration, title, widthDivisor, position } = event;

    const eventStyle = {
        height: `${duration * 2}px`,
        top: `${start * 2}px`,
        left: `${(100 / widthDivisor) * position}%`,
        width: `calc(${100 / widthDivisor}%`,
    };
    return (
        <div style={eventStyle} className="event">
            <button
                type="button"
                className="close"
                onClick={removeEventHandler}
            >
                <span className="font-weight-light">&times;</span>
            </button>
            <p className="event-title">
                {title}
            </p>
        </div>
    );
};

Event.propTypes = {
    event: PropTypes.object.isRequired,
    removeEventHandler: PropTypes.func.isRequired
}

export default Event;