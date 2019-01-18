import { put as dispatch, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateCoin(action) {
    try {
        yield axios.put(`api/coin/${action.payload.id}`, action.payload.data);
        yield dispatch({
            type: 'FETCH_USER_COLLECTION_ITEMS',
            payload: { 
                id: action.payload.collectionId, 
                searchParams: action.payload.searchParams 
            }
        });
        yield dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: {
                message: 'Your collection has been updated!',
                variant: 'success',
                dwell: 2500,
            }
        });
    } catch (err) {
        console.log('Error updating coin.');
        yield dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: {
                message: 'There was an error saving what you entered. Try again!',
                variant: 'error',
                dwell: 2500,
            }
        });
    }
}

function* updateCoinSaga() {
    yield takeEvery('UPDATE_COIN', updateCoin);
}

export default updateCoinSaga;