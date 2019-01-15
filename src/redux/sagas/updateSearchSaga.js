import { put as dispatch, takeEvery } from 'redux-saga/effects';

function* updateSearch(action) {
    console.log('UpdateSearch saga:', action);
    try {
        yield dispatch({
            type: 'SET_SEARCH_CHOICES',
            payload: {
                search: action.payload.search,
            }
        });
        yield dispatch({
            type: 'FETCH_USER_COLLECTION_ITEMS',
            payload: {
                id: action.payload.selected,
                searchParams: action.payload.search
            }
        });
        yield dispatch({
            type: 'FETCH_COLLECTION_COUNT',
            payload: {
                id: action.payload.selected,
                searchParams: action.payload.search
            }
        });
    } catch (err) {
        console.log('Error updating search.');
    }
}

function* updateSearchSaga() {
    yield takeEvery('UPDATE_SEARCH_CHOICES', updateSearch);
}

export default updateSearchSaga;