import { put as dispatch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserEmails(action) {
    try {
        // const data = yield axios.get(`api/user_email/${action.payload}`);
        // yield dispatch({ type: 'SET_USER_EMAILS', payload: data.data });
    } catch (err) {
        console.log('Error fetching user emails.');
    }
}

function* sendEmails(action) {
    try {
        yield dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: {
                message: 'Emails sent!',
                variant: 'info',
                dwell: 3000,
            }
        });
    } catch (err) {
        console.log('Error send emails.');
    }
}

function* sendEmailSaga() {
    yield takeLatest('FETCH_USER_EMAILS', fetchUserEmails);
    yield takeEvery('SEND_EMAILS', sendEmails);
}

export default sendEmailSaga;