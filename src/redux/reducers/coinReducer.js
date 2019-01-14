const initialFoundState = {
    date_found: new Date().toISOString().substring(0, 10), // may lack timezone awareness
    location_found: '',
    found: true,
    condition_id: 0, // not legal in database, but needed for SelectCondition component
}

const coin = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_COIN_FOUND':
            return initialFoundState;
        case 'INIT_COIN_EDITED':
            return action.payload;
        case 'SET_COIN':
            return {
                date_found: action.payload.date_found,
                location_found: action.payload.location_found,
                found: true,
                condition_id: action.payload.condition_id,
            };
        case 'SET_CONDITION_ID':
            return {
                ...state,
                condition_id: action.payload,
            };
        case 'SET_EDIT_VALUE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default coin;