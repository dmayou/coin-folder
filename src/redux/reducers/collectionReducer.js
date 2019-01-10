import { combineReducers } from 'redux';

const collectionItems = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_COLLECTION_ITEMS':
            return action.payload.data;
        default:
            return state;
    }
};

const collectionType = (state = [], action) => {
    switch (action.type) {
        case 'SET_COLLECTION_TYPE':
            return action.payload.data;
        default:
            return state;
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case 'SET_SELECTED_COLLECTION':
            return action.payload;
        default:
            return state;
    }
}

const collectionStats = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COLLECTION_STATS':
            return action.payload.data;
        default:
            return state;
    }
};

const collectionCount = (state = 0, action) => {
    switch (action.type) {
        case 'SET_COLLECTION_COUNT':
            return action.payload.data.count;
        default:
            return state;
    }
};

export default combineReducers({
    collectionItems,
    collectionType,
    collectionStats,
    collectionCount,
    selected,
});
