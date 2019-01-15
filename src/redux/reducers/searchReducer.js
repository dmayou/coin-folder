let initState = {
    startYear: 0,
    endYear: 0,
    mintP: true,
    mintD: true,
    mintS: true,
    found: true,
    needed: true,
}

const search = (state = initState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_CHOICES':
            return action.payload.search;
        case 'SET_YEARS':
            return {
                ...state,
                startYear: action.payload[0],
                endYear: action.payload[1],
            }
        case 'SHOW_ALL':
            return {
                ...initState,
                startYear: action.payload.startYear,
                endYear: action.payload.endYear,
            }
        default:
            return state;
    }
};

export default search;