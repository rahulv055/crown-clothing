import ShopActionTypes from "./shop.types";
import { firestore, collectionsSnapshotToMap } from "../../firebase/firebase.utils";


export const fetchCollectionStart = () => ({
    type:ShopActionTypes.FETCH_COLLECTION_START,
})

export const fetchCollectionSuccess = (collectionMap) => ({
    type:ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload:collectionMap
})

export const fetchCollectionFailure = (errorMessage) => ({
    type:ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload:errorMessage
})

export const fecthCollectionStartAsync = ()=>{
    return dispatch => {
        const collectionRefs = firestore.collection('collections');
        dispatch(fetchCollectionStart());
        collectionRefs.get().then(async snapshot => {
          const collectionMap = collectionsSnapshotToMap(snapshot);
          dispatch(fetchCollectionSuccess(collectionMap))
        }).catch(error=>dispatch(fetchCollectionFailure(error)))
    }
}