import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchConditions(action) {
    try {
        const data = yield axios.get(`api/condition`);
        yield dispatch({ type: 'SET_CONDITIONS', payload: data.data });
    } catch (err) {
        console.log('Error fetching conditions.');
    }
}

function* conditionSaga() {
    yield takeLatest('FETCH_CONDITIONS', fetchConditions);
}

export default conditionSaga;