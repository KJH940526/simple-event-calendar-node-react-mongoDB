import React from 'react';

import { EventServiceConsumer } from '../http-service-context/httpServiceContext';

export const withEventService = (Wrapped) => {
    return (props) => {
        return (
            <EventServiceConsumer>
                {
                    (httpService) => {
                        return (
                            <Wrapped {...props} {...httpService} />
                        );
                    }
                }
            </EventServiceConsumer>
        )
    }
}