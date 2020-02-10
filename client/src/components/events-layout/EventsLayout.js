import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import * as actionCreators from '../../appStore/actions';
import { withEventService } from '../../hoc/with-event-service';

import Event from './event/Event';
import addDivisors from '../../services/addDivisors';
import './events-layout.scss';


const EventsLayout = ({
    from,
    to,
    events,
    jwtToken,
    fetchAllEvents,
    onFetchEvents,
    removeRequest,
    onRemoveEvent,
    showAlert
}) => {
    const minutesAmount = (to - from) * 60;
    let times = minutesAmount / 30 + 1;

    const scheduleContainerStyle = {
        height: `${times * 60}px`
    };
    const renderDividers = new Array(times)
        .fill('')
        .map((_, idx) => {
            return (
                <div key={idx} className={`times ${idx % 2 === 0 ? 'full-hour' : 'half-hour'}`} >
                    {moment().set({ hours: from, minutes: idx * 30 }).format('hh:mm')}
                </div>
            );
        });


    const getEvents = useCallback(async () => {
        try {
            const events = await fetchAllEvents(jwtToken);
            onFetchEvents(events);
        } catch (e) {
            showAlert(e.message);
        }
        // eslint-disable-next-line
    }, [jwtToken, fetchAllEvents, onFetchEvents]);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const removeEventHandler = async id => {
        const removedEventId = await removeRequest(id, jwtToken);
        onRemoveEvent(removedEventId);
    };

    const modEvents = addDivisors(events);
    const renderEvents = modEvents.map(event => (
        <Event
            event={event}
            key={event.id}
            removeEventHandler={() => removeEventHandler(event.id)}
        />));
    return (
        <div className="schedule-container" style={scheduleContainerStyle} >
            <div className="event-container" >
                {renderEvents}
            </div>
            {renderDividers}
        </div>
    )
};

EventsLayout.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    events: PropTypes.array.isRequired,
    jwtToken: PropTypes.string.isRequired,
    fetchAllEvents: PropTypes.func.isRequired,
    onFetchEvents: PropTypes.func.isRequired,
    removeRequest: PropTypes.func.isRequired,
    onRemoveEvent: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
}

const mapStateToProps = ({ calendar, auth }) => ({ ...calendar, ...auth });

export default withEventService(connect(mapStateToProps, actionCreators)(EventsLayout));