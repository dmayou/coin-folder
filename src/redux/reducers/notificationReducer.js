const initialNotificationState = {
    showing: false,
    message: '',
    variant: '',
    icon: '',
};

const notification = (state = initialNotificationState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
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