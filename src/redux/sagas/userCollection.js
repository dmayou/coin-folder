import { put as dispatch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserCollectionItems(action) {
    try {
        const data = yield axios.get(`api/collection/collection_items/${action.payload}`);
        yield dispatch({ type: 'SET_USER_COLLECTION_ITEMS', payload: data });
    } catch (err) {
        console.log('Error fetching user collection items:', err)
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

function* userCollectionSaga() {
    yield takeEvery('ADD_USER_COLLECTION_ITEMS', addUserCollectionItems);
    yield takeLatest('FETCH_USER_COLLECTION_ITEMS', fetchUserCollectionItems);
}

export default userCollectionSaga;
