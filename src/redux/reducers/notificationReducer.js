const initialNotificationState = {
    showing: false,
    message: '',
    variant: '',
    dwell: 2500,
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
        default:
            return state;
    }
};

export default notification;