import { handlers } from './handlers';

export const reducer = (state, action) => {
    if (state === undefined) {
        return {
            calendar: {
                events: [],
                title: '',
                start: '',
                end: ''
            },
            auth: {
                jwtToken: null,
                userId: null,
                isAuthenticated: false,
                email: '',
                password: ''
            },
            alert: {
                text: null,
                type: null,
                visible: false
            }
        }
    }
    
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
