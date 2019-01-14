import { combineReducers } from 'redux';

const collectionItems = (state = null, action) => {
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

const userCollections = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_COLLECTIONS':
            return action.payload.data;
        default:
            return state;
    }
};

const canAddCollections = (state = [], action) => {
    switch (action.type) {
        case 'SET_CAN_ADD_COLLECTIONS':
            return action.payload.data;
        default:
            return state;
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case 'SET_SELECTED_COLLECTION':
            return action.payload;
        case 'CLEAR_SELECTED_COLLECTION':
            return null;
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
    userCollections,
    canAddCollections,
    collectionStats,
    collectionCount,
    selected,
});
