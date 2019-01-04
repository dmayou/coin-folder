import { combineReducers } from 'redux';

const collectionItems = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_COLLECTION_ITEMS':
            return action.payload.data;
        default:
            return state;
    }
};

export default combineReducers({
    collectionItems,
});
