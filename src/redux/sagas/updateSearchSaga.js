import { put as dispatch, takeEvery, takeLatest } from 'redux-saga/effects';

function* updateSearch(action) {
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

function* updateSearchAll(action) {
    try {
        yield dispatch({
            type: 'SHOW_ALL',
            payload: {
                startYear: action.payload.search.startYear,
                endYear: action.payload.search.endYear,
            }
        });
        yield dispatch({
            type: 'FETCH_USER_COLLECTION_ITEMS',
            payload: {
                id: action.payload.selected,
                searchParams: action.payload.search,
            }
        });
        yield dispatch({
            type: 'FETCH_COLLECTION_COUNT',
            payload: {
                id: action.payload.selected,
                searchParams: action.payload.search,
            }
        });
    } catch (err) {
        console.log('Error updating search all.');
    }
}

function* updateSearchSaga() {
    yield takeEvery('UPDATE_SEARCH_CHOICES', updateSearch);
    yield takeLatest('UPDATE_SEARCH_ALL', updateSearchAll);
}

export default updateSearchSaga;