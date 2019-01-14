import { put as dispatch, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateCoin(action) {
    try {
        yield axios.put(`api/coin/${action.payload.id}`, action.payload.data);
        yield dispatch({
            type: 'FETCH_USER_COLLECTION_ITEMS',
            payload: { 
                id: action.payload.selectedCollection, 
                searchParams: action.payload.searchParams 
            }
        });;
    } catch (err) {
        console.log('Error updating coin.');
    }
}

function* updateCoinSaga() {
    yield takeEvery('UPDATE_COIN', updateCoin);
}

export default updateCoinSaga;