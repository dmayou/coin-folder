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

const stats = (state = {}, action) => {
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

const foundCounts = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FOUND_COUNTS':
            let months = [];
            let counts = [];
            let otherCounts = [];
            let numOtherUsers = action.payload.data[0].num_other_users;
            const length = action.payload.data.length;
            for (let i = 0; i < length; i++) {
                let row = action.payload.data[i];
                months[i] = row.mon_year.replace(/ +(?= )/g, ''); // remove extra spaces
                counts[i] = +row.count;
                if (numOtherUsers === 0) {
                    otherCounts[i] = 0; // prevent division by 0
                } else {
                    otherCounts[i] = row.other_count / numOtherUsers; // average
                }
            }
            return {
                months,
                counts,
                otherCounts,
                numOtherUsers,
            };
        default:
            return state;
    }
};

const otherFoundAvg = (state = {}, action) => {
    switch (action.type) {
        case 'SET_OTHER_FOUND_AVG':
            return action.payload;
        default:
            return state;
    }
}

const userItemCounts = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_ITEM_COUNTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    collectionItems,
    collectionType,
    userCollections,
    canAddCollections,
    stats,
    collectionCount,
    foundCounts,
    otherFoundAvg,
    userItemCounts,
    selected,
});