//we actually need to import in certain effects from sagas and these effects
//allow us to do different things with either the store like creating actions or listening for actions

// first import: take every
//listening for every action of a specific type that we pass to it
import { all, call, put, takeLatest } from 'redux-saga/effects';

//we're listening for specific action types
import { shopActionTypes } from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/filebase.utils';

import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from './shop.action';

//So this is going to actually be are generally a function that does the asynchronous code that we wanted
export function* fetchCollectionsAsync() {
  try {
    //functions pause whenever we hit the yield
    //until we call next(),  then our functions continue
    //in saga, its whole purpose is to run these sagas all concurrently
    //concurrently meaning it wants to run them all together in a way that does not block the execution.

    //we're yielding control over this saga back to the middleware to the saga middleware
    // /and then the saga middleware if it gets say another take every action call
    //It can then determine whether or not to cancel any of the previous
    //we want to yield control of these sagas back to the library.

    //we do not need an Async action anymore
    const collectionsRef = firestore.collection('collections');

    // instead of using a promised oriented dot style we are using a generator function
    //similar with async, await
    //this value comes back it comes back in a promised form that gets resolved with the value of
    // our collection reference which is our snapshot.
    const snapshot = yield collectionsRef.get();
    //What call does is that call is the code.
    //Call is the effect inside of our generator function that invokes the method.
    //want to yield this in case this call takes longer than we expect
    //We want to be able to use this call method whenever we can.
    //Which is an effect that invokes functions.
    // it allows again us to defer control at this point of the execution
    //So in case it needs to cancel we give it another place where it's able to do so.
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    //sagas do not dispatch actions using the dispatch keyword.
    //Instead they use another effect called put,
    //put is the saga effect for creating action
    //put this action to the normal redux flow
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  //switch isFetching in shopReducer to true
  // dispatch(fetchCollectionsStart());
  // //begin async request
  // collectionsRef
  //   .get()
  //   .then((snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   })
  //   .catch((err) => {
  //     dispatch(fetchCollectionsFailure(err.message));
  //   });
}

export function* fetchCollectionsStart() {
  //what this saga does with the effect is
  // it's going to pause when ever a specific action type
  // that we want comes in.
  //alternatively we are also actually able to cancel these tasks that are coming out of our function

  //takeEvery creates a non blocking call in order to
  // not stop our application to continue running either other sagas

  //takeEvery
  //first param: type of action,
  //second param: another generator function that will run in response to this take every listener.
  //So this is how we actually are able to trigger more code to run depending on an action type.
  //We need to write another generator that will then do the expected thing that we're looking for

  //taleLatest: we only want to fire fetchCollectionsAsync the latest one, from our database
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
