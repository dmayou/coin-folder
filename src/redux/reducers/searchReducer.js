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
        case 'UPDATE_SEARCH_CHOICES':
            return action.payload;
        case 'SET_YEARS':
            return {
                ...state,
                startYear: action.payload[0],
                endYear: action.payload[1],
            }
        case 'SET_MINT':
            return {
                ...state,
                [action.payload.mint]: action.payload.value,
            }
        case 'SET_FOUND_NEEDED':
            return {
                ...state,
                found: action.payload[0],
                needed: action.payload[1],
            }
        case 'SHOW_ALL':
            return {
                startYear: action.payload[0],
                endYear: action.payload[1],
                mintP: true,
                mintD: true,
                mintS: true,
                found: true,
                needed: true,
            }
        default:
            return state;
    }
};

export default search;