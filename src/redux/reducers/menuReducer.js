const menu = (state = {}, action) => {
    switch (action.type) {
        case 'SHOW_MENU':
            return {
                show: true,
                anchorEl: action.payload,
            };
        case 'HIDE_MENU':
            return {
                show: false,
                anchorEl: null,
            }
        default:
            return state;
    }
};

export default menu;
