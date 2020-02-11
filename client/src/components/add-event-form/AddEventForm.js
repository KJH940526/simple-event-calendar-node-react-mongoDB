import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../appStore/actions';
import { withEventService } from '../../hoc/with-event-service';
import PropTypes from 'prop-types';


import './add-event-form.scss';

const inputToTime = (input) => {
    const [hours, minutes] = input.split(':');
    return moment().set({ hours, minutes });
};

const timeDifferenceMin = (firstT, secondT) => {
    return moment.duration(secondT.diff(firstT)).as('minutes');
};


const AddEventForm = ({
    from,
    to,
    title,
    start,
    end,
    jwtToken,
    onAddEvent,
    changeEventFormHandler,
    addEventRequest,
    showAlert
}) => {


    const onSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim() || !start || !end) {
            return showAlert('Not all fields are filled!');
        }
        const fromToDate = moment().set({ hours: from, minutes: 0 });
        const toToDate = moment().set({ hours: to, minutes: 0 });

        const startToDate = inputToTime(start);
        const endToTime = inputToTime(end);

        if (timeDifferenceMin(fromToDate, startToDate) < 0) {
            return showAlert(`Start time cannot be earlier than ${fromToDate.format('HH:mm')}`);
        }
        if (timeDifferenceMin(endToTime, toToDate) < 0) {
            return showAlert(`End time cannot be later than ${toToDate.format('HH:mm')}`);
        }
        if (timeDifferenceMin(startToDate, endToTime) <= 0) {
            return showAlert(`End time cannot be less or equal to start time!`);
        }

        const startToMin = timeDifferenceMin(fromToDate, startToDate).toFixed();
        const duration = timeDifferenceMin(startToDate, endToTime).toFixed();

        const body = { title, start: startToMin, duration };

        try {
            const event = await addEventRequest(body, jwtToken);
            onAddEvent(event);

        } catch (e) {
            showAlert(e.message);
        }
    }

    return (
        <form
            className="add-event-form d-flex justify-content-center p-2 mb-2"
            onSubmit={onSubmit}>
            <div className="form-group mr-4 mb-1">
                <label htmlFor="title">Event title</label>
                <input
                    value={title}
                    name="title"
                    id='title'
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    onChange={event => changeEventFormHandler(event, { title, start, end })}
                />
            </div>
            <div className="form-group mr-4 mb-1">
                <label htmlFor="start">Event start time</label>
                <input
                    value={start}
                    name="start"
                    id='start'
                    type="time"
                    className="form-control"
                    onChange={event => changeEventFormHandler(event, { title, start, end })}
                />
            </div>
            <div className="form-group mr-4 mb-1">
                <label htmlFor="end">Event end time</label>
                <input
                    value={end}
                    name="end"
                    id='end'
                    type="time"
                    className="form-control"
                    onChange={event => changeEventFormHandler(event, { title, start, end })}
                />
            </div>
            <button type="submit" className="btn btn-info align-self-end mb-1">Add event</button>
        </form>
    )
};

AddEventForm.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    jwtToken: PropTypes.string.isRequired,
    onAddEvent: PropTypes.func.isRequired,
    changeEventFormHandler: PropTypes.func.isRequired,
    addEventRequest: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
};

const mapStateToProps = ({ calendar: { title, start, end }, auth: { jwtToken } }) => ({ title, start, end, jwtToken });

export default withEventService(connect(mapStateToProps, actionCreators)(AddEventForm));