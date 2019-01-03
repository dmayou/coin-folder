import { put as dispatch, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addUserCollectionItems(action) {
    try {
        yield axios.post(`api/collection/collection_items/${action.payload}`, null);
        // yield dispatch({ type: '' }); // probably need to update some reducer list
    } catch (error) {
        console.log('Error adding user collection:', error);
    }
}

function* userCollectionSaga() {
    yield takeEvery('ADD_USER_COLLECTION_ITEMS', addUserCollectionItems);
}

export default userCollectionSaga;
