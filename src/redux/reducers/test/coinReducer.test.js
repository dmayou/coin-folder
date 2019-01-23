import coinReducer from '../coinReducer';

test('reducer has initial state', () => {
    let action = {
        type: 'any type',
        payload: null,
    };
    expect(coinReducer(undefined, action)).toEqual({});
});
test('correct initial state for coin found', () => {
    let initialFoundState = {
        date_found: new Date().toISOString().substring(0, 10), // may lack timezone awareness
        location_found: '',
        found: true,
        condition_id: 0, // not legal in database, but needed for SelectCondition component
    };
    let action = {
        type: 'INIT_COIN_FOUND',
        payload: null,
    }
    expect(coinReducer(undefined, action)).toEqual(initialFoundState);
});
test('SET_COIN sets data', () => {
    let action = {
        type: 'SET_COIN',
        payload: {
            date_found: '2019-01-01',
            location_found: 'right here',
            found: true,
            condition_id: 1,
        },
    };
    expect(coinReducer(null, action)).toEqual(action.payload);
});
test('SET_CONDITION_ID changes only condition_id', () => {
    let initialState = {
        date_found: '2019-01-01',
        location_found: 'right here',
        found: true,
        condition_id: 1,
    };
    let action = {
        type: 'SET_CONDITION_ID',
        payload: 2,
    };
    let finalState = {
        ...initialState,
        condition_id: action.payload,
    };
    expect(coinReducer(initialState, action)).toEqual(finalState);
});

test('SET_EDIT_VALUE changes only what is sent', () => {
    let initialState = {
        date_found: '2019-01-01',
        location_found: 'right here',
        found: true,
        condition_id: 1,
    };
    let action = {
        type: 'SET_EDIT_VALUE',
        payload: {
            location_found: 'over there',
        },
    };
    let finalState = {
        ...initialState,
        ...action.payload,
    };
    expect(coinReducer(initialState, action)).toEqual(finalState);
});
