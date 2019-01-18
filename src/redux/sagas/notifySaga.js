import { put as dispatch, takeEvery } from 'redux-saga/effects';

function* notifyUser(action) {
    try {
        yield dispatch({ type: 'SHOW_NOTIFICATION', payload: data.data });
        yield setTimeout( () => {
            dispatch({ type: 'HIDE_NOTIFICATION' })
            }
            , 2500);
    } catch (err) {
        console.log('Error notifying user.');
    }
}

function* notifySaga() {
    yield takeLatest('NOTIFY_USER', notifyUser);
}

export default notifySaga;