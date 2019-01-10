import { put as dispatch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserCollectionItems(action) {
    try {
        const { id, searchParams } = action.payload;
        const data = yield axios.get(`api/collection/collection_items/${id}/${JSON.stringify(searchParams)}`);
        yield dispatch({ type: 'SET_USER_COLLECTION_ITEMS', payload: data });
    } catch (err) {
        console.log('Error fetching user collection items:', err)
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

function* buildItemsTable(action) {
    try {
        yield console.log('in buildItemsTable');
    } catch (err) {
        console.log('Error rebuilding items table.');
    }
}

function* addUserCollectionItems(action) {
    try {
        yield axios.post(`api/collection/collection_items/${action.payload}`, null);
        yield dispatch({ type: 'FETCH_USER_COLLECTION_ITEMS' });
    } catch (err) {
        console.log('Error adding user collection items:', err);
    }
}

function* fetchCollectionStats(action) {
    try {
        const data = yield axios.get(`api/collection/collection_stats/${action.payload}`);
        yield dispatch({ type: 'SET_COLLECTION_STATS', payload: data });
        console.log('fetch years', data.data);
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
        yield dispatch({ type: 'FLASH_COUNT' });
    } catch (err) {
        console.log('Error fetching collection stats.');
    }
}

function* userCollectionSaga() {
    yield takeEvery('ADD_USER_COLLECTION_ITEMS', addUserCollectionItems);
    yield takeLatest('FETCH_USER_COLLECTION_ITEMS', fetchUserCollectionItems);
    yield takeLatest('FETCH_COLLECTION_TYPE', fetchCollectionType);
    yield takeLatest('BUILD_ITEMS_TABLE', buildItemsTable);
    yield takeLatest('FETCH_COLLECTION_STATS', fetchCollectionStats);
    yield takeLatest('FETCH_COLLECTION_COUNT', fetchCollectionCount);
}

export default userCollectionSaga;