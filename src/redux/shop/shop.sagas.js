import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";
import { ShopActionTypes } from "./shop.types";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

//fetching will be inside sagas instead of
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    if (snapshot.empty) yield put(fetchCollectionsFailure("snapshot is empty"));

    //call is the effect inside of our generator function that invokes the method.
    //we want to yield collectionsMap incase async code takes longer we expect.
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    //sagas do not dispatch actions using dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (e) {
    yield put(fetchCollectionsFailure(e));
  }
}

//this is wherw we start saga code to trigger
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
// take waits for this action of increment to happen
// whnen it does we are able to get the payload from that action as well
// rest of code does not operate until take operates
// const incrementPayload=yield take('INCREMENT')
// takeEvery kicks off a new task, using the generator, for every Increment action that comes in.
// everytime we fire the action, saga is regenerating that generator in a loop.

// while(true){
//     yield take("INCREMENT")
//     yield delay(5000) //setTimeout in saga
// }
//takeEvery spawns new sagas concurrently. creating new sub tasks
