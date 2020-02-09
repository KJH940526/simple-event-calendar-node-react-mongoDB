export const handlers = {
    USER_LOGGED_IN: (state, { payload }) => {
        const { jwtToken, userId } = payload;
        const { auth } = state;
        const isAuthenticated = !!jwtToken;

        return {
            ...state,
            auth: {
                ...auth,
                email: '',
                password: '',
                jwtToken,
                userId,
                isAuthenticated
            }
        };
    },
    USER_LOGGED_OUT: (state) => {
        const { auth } = state;
        return {
            ...state,
            auth: {
                ...auth,
                jwtToken: null,
                userId: null,
                isAuthenticated: false
            }
        }
    },
    AUTH_FORM_CHANGED: (state, { payload }) => {
        const { auth } = state;
        return {
            ...state,
            auth: {
                ...auth,
                ...payload
            }
        };
    },
    EVENT_FORM_CHANGED: (state, { payload }) => {
        const { calendar } = state;
        return {
            ...state,
            calendar: {
                ...calendar,
                ...payload
            }
        };
    },
    FETCH_EVENTS_REQUESTED: (state, { payload }) => {
        const { calendar } = state;
        return {
            ...state,
            calendar: {
                ...calendar,
                events: [...payload]
            }
        }
    },
    EVENT_ADDED: (state, { payload }) => {
        const { events } = state.calendar;
        return {
            ...state,
            calendar: {
                events: [...events, payload],
                title: '',
                start: '',
                end: ''
            }
        }
    },
    EVENT_REMOVED: (state, { payload: id }) => {
        const { events } = state.calendar;
        return {
            ...state,
            calendar: {
                ...state.calendar,
                events: events.filter(event => event.id !== id)
            }
        }
    },
    SHOW_ALERT: (state, { payload }) => {
        const { text, type } = payload;
        return {
            ...state,
            alert: {
                text,
                type,
                visible: true
            }
        };
    },
    HIDE_ALERT: (state) => {
        return {
            ...state,
            alert: {
                text: null,
                type: null,
                visible: false
            }
        }
    },
    DEFAULT: state => state
};
