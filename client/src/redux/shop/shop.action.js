import { shopActionTypes } from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/filebase.utils';

export const fetchCollectionsStart = () => ({
  //notify is Fetching is true, without payload
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  //retrieve data successfully
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  //retrieve data successfully
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

//redux-thunk make us able to return a function access "dispatch"
//similar with a wrapper, wrap normal action creators
//dispatch multiple actions and handle asynchronous code inside of it.
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionsRef = firestore.collection('collections');
    //switch isFetching in shopReducer to true
    dispatch(fetchCollectionsStart());
    //begin async request
    collectionsRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((err) => {
        dispatch(fetchCollectionsFailure(err.message));
      });
  };
};
