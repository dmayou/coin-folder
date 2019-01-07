const initState = {
    minYear: 1999,
    maxYear: 2008,
    startYear: 1999,
    endYear: 2008,
}

const search = (state = initState, action) => {
    switch (action.type) {
        case 'SET_YEARS':
            return {
                ...state,
                startYear: action.payload[0],
                endYear: action.payload[1],
            };
        default:
            return state;
    }
};

export default search;