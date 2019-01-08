import { put as dispatch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserCollectionItems(action) {
    try {
        const { id, choice } = action.payload;
        const data = yield axios.get(`api/collection/collection_items/${id}/${choice}`);
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
        console.log('stats route', action.payload);
        const data = yield axios.get(
            `api/collection/collection_stats/${action.payload.id}/${action.payload.queryWhere}`);
        console.log('data:', data);
        yield dispatch({ type: 'SET_COLLECTION_STATS', payload: data });
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
}

export default userCollectionSaga;