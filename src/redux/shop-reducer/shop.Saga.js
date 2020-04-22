import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from "./shop.types";
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';
import { firestore, collectionsSnapshotToMap } from "../../firebase/firebase.utils"


function* fecthCollectionStartAsync() {
    try {
        const collectionRefs = firestore.collection('collections');
        const snapshot = yield collectionRefs.get();
        const collectionMap = yield call(collectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionMap))
    } catch (error) {
        yield put(fetchCollectionFailure(error.message))
    }
}

export function* fecthCollectionStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fecthCollectionStartAsync)
    console.log("I am logged");
}


export function* shopSaga() {
    yield all([call(fecthCollectionStart)])
}




