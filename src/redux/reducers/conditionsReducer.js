const conditions = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONDITIONS':
            return action.payload;
        default:
            return state;
    }
};

export default conditions;