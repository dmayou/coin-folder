import { put as dispatch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserCollectionItems(action) {
    try {
        yield dispatch({ type: 'SHOW_SPINNER' });
        const { id, searchParams } = action.payload;
        const data = yield axios.get(`api/collection/collection_items/${id}/${JSON.stringify(searchParams)}`);
        yield dispatch({ type: 'SET_USER_COLLECTION_ITEMS', payload: data });
        yield dispatch({ type: 'HIDE_SPINNER' });
    } catch (err) {
        console.log('Error fetching user collection items:', err);
        yield dispatch({ type: 'HIDE_SPINNER' });
    }
}

function* fetchCollectionType(action) {
    try {
        const data = yield axios.get(`api/collection/collection_type`);
        yield dispatch({ type: 'SET_COLLECTION_TYPE', payload: data });
    } catch (err) {
        console.log('Error fetching collection_type.');
    }
}

function* fetchUserCollections(action) {
    try {
        const data = yield axios.get(`api/collection/user_collections`);
        yield dispatch({ type: 'SET_USER_COLLECTIONS', payload: data });
    } catch (err) {
        console.log('Error fetching user_collections.');
    }
}

function* fetchCanAddCollections(action) {
    try {
        const data = yield axios.get(`api/collection/can_add_collections`);
        yield dispatch({ type: 'SET_CAN_ADD_COLLECTIONS', payload: data });
    } catch (err) {
        console.log('Error fetching can_add_collections.');
    }
}

function* addUserCollection(action) {
    try {
        yield axios.post(`api/collection/collection_items/${action.payload}`);
        yield dispatch({ type: 'FETCH_CAN_ADD_COLLECTIONS' });
        yield dispatch({ type: 'FETCH_USER_COLLECTIONS'});
        yield dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: {
                message: 'Your collection has been added!',
                variant: 'success',
                dwell: 2500,
            }
        });
    } catch (err) {
        console.log('Error adding user collection items:', err);
        yield dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: {
                message: 'Error adding the collection. Try again!',
                variant: 'error',
                dwell: 2500,
            }
        });
    }
}

function* fetchCollectionStats(action) {
    try {
        const data = yield axios.get(`api/collection/stats/${action.payload}`);
        yield dispatch({ type: 'SET_COLLECTION_STATS', payload: data });
        yield dispatch({ type: 'SET_YEARS', payload: [data.data.min, data.data.max] });
    } catch (err) {
        console.log('Error fetching collection stats.');
    }
}
function* fetchCollectionCount(action) {
    try {
        const { id, searchParams } = action.payload;
        const data = yield axios.get(
            `api/collection/collection_count/${id}/${JSON.stringify(searchParams)}`);
        yield dispatch({ type: 'SET_COLLECTION_COUNT', payload: data });
    } catch (err) {
        console.log('Error fetching collection stats.');
    }
}

function* fetchFoundCounts(action) {
    try {
        const data = yield axios.get('api/collection/found_counts');
        yield dispatch({ type: 'SET_FOUND_COUNTS', payload: data });
    } catch(err) {
        console.log('Error fetching found counts');
    }
}

function* fetchUserItemCounts(action) {
    try {
        const data = yield axios.get('api/collection/user_item_counts');
        let counts = {};
        for (let count of data.data) {
            counts[String(count.item_id)] = +count.count;
        }
        yield dispatch({ type: 'SET_USER_ITEM_COUNTS', payload: counts });
    } catch (err) {
        console.log('Error fetching user item counts')
    }
}

function* fetchOtherFoundAvg(action) {
    try {
        const data = yield axios.get(`api/collection/other_found_avg/${action.payload}`);
        yield dispatch({ type: 'SET_OTHER_FOUND_AVG', payload: data.data[0] });
    } catch(err) {
        console.log('Error fetching other found average.');
    }
}

function* userCollectionSaga() {
    yield takeEvery('ADD_USER_COLLECTION', addUserCollection);
    yield takeLatest('FETCH_USER_COLLECTION_ITEMS', fetchUserCollectionItems);
    yield takeLatest('FETCH_COLLECTION_TYPE', fetchCollectionType);
    yield takeLatest('FETCH_COLLECTION_STATS', fetchCollectionStats);
    yield takeLatest('FETCH_COLLECTION_COUNT', fetchCollectionCount);
    yield takeLatest('FETCH_USER_ITEM_COUNTS', fetchUserItemCounts);
    yield takeLatest('FETCH_FOUND_COUNTS', fetchFoundCounts);
    yield takeLatest('FETCH_OTHER_FOUND_AVG', fetchOtherFoundAvg);
    yield takeLatest('FETCH_USER_COLLECTIONS', fetchUserCollections);
    yield takeLatest('FETCH_CAN_ADD_COLLECTIONS', fetchCanAddCollections);
}

export default userCollectionSaga;