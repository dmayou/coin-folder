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
                showing: true,
                message: action.payload.message,
                variant: action.payload.variant,
                icon: action.payload.icon,
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