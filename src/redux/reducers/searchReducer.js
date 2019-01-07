const initState = {
    minYear: 1999,
    maxYear: 2008,
    startYear: 1999,
    endYear: 2008,
    mintP: true,
    mintD: true,
    mintS: true,
    found: true,
    needed: true,
}

const search = (state = initState, action) => {
    switch (action.type) {
        case 'SET_YEARS':
            return {
                ...state,
                startYear: action.payload[0],
                endYear: action.payload[1],
            };
        case 'SET_MINT':
            return {
                ...state,
                [action.payload.mint]: action.payload.value,
            }
        default:
            return state;
    }
};

export default search;