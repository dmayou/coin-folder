const initialNotificationState = {
    showing: false,
    message: '',
    variant: '',
    dwell: 2500,
    showSpinner: false,
};

const notification = (state = initialNotificationState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                ...action.payload,
                showing: true,
            };
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                showing: false,
            };
        case 'SHOW_SPINNER':
            return {
                ...state,
                showSpinner: true,
            };
        case 'HIDE_SPINNER':
            return {
                ...state,
                showSpinner: false,
            }
        default:
            return state;
    }
};

export default notification;