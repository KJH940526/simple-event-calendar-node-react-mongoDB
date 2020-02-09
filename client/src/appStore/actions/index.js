const onLogin = (jwtToken, userId) => {
    localStorage.setItem('userData', JSON.stringify({
        userId,
        token: jwtToken
    }));
    return {
        type: 'USER_LOGGED_IN',
        payload: {
            jwtToken, userId
        }

    };
};

const onLogout = () => {
    localStorage.removeItem('userData');
    return { type: 'USER_LOGGED_OUT' };
};



const changeEventFormHandler = (event, form) => {
    return {
        type: 'EVENT_FORM_CHANGED',
        payload: {
            ...form,
            [event.target.name]: event.target.value
        }
    }
}

const changeAuthFormHandler = (event, form) => {
    return {
        type: 'AUTH_FORM_CHANGED',
        payload: {
            ...form,
            [event.target.name]: event.target.value
        }
    }
};

const onFetchEvents = events => ({
    type: 'FETCH_EVENTS_REQUESTED',
    payload: events
});

const onAddEvent = event => ({
    type: 'EVENT_ADDED',
    payload: event
});
const onRemoveEvent = id => ({
    type: 'EVENT_REMOVED',
    payload: id
});

const showAlert = (text, type = 'danger') => ({
    type: 'SHOW_ALERT',
    payload: { text, type }
});

const hideAlert = () => ({ type: 'HIDE_ALERT' });


export {
    onLogin,
    onLogout,
    changeAuthFormHandler,
    changeEventFormHandler,
    onFetchEvents,
    onAddEvent,
    onRemoveEvent,
    showAlert,
    hideAlert
}







