const initialState = {
    // date_found: (new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
    date_found: null,
    location_found: null,
    found: true,
    condition_id: null,
}

const coin = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COIN':
            return {
                date_found: action.payload.date_found,
                location_found: action.payload.location_found,
                found: true,
                condition_id: action.payload.condition_id,
            };
        default:
            return state;
    }
};

export default coin;