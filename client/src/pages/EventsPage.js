import React from 'react';

import AddEventForm from '../components/add-event-form/AddEventForm';
import EventsLayout from '../components/events-layout/EventsLayout';

export const EventsPage = () => {
    const from = 8;
    const to = 17;
    return (
        <div className="container">
            <AddEventForm from={from} to={to} />
            <EventsLayout from={from} to={to} />
        </div>
    );
};