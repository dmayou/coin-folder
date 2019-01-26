import userReducer from '../userReducer';

test('reducer has initial state', () => {
    let initialState = {};
    let action = {
        type: 'any action',
        payload: null,
    }
    expect(userReducer(undefined, action)).toEqual(initialState);
});
test(`SET_USER sets state`, () => {
    let user = {
        userName: 'My name',
        userProperty: 'My property',
    };
    let action = {
        type: 'SET_USER',
        payload: user,
    };
    expect(userReducer(undefined, action)).toEqual(user);
});
test(`UNSET_USER returns empty object`, () => {
    let user = {
        userName: 'My name',
        userProperty: 'My property',
    };
    let action = {
        type: 'UNSET_USER',
        payload: user,
    };
    expect(userReducer(user, action)).toEqual({});
});