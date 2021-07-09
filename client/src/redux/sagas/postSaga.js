import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POST_LOADING_FAIL,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCESS,
} from "../types";

const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    console.log("loadPostAPI:", result);
    yield put({
      type: POST_LOADING_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAIL,
      payload: e,
    });
    yield push("/");
  }
}

function* watchLoadPost() {
  yield takeEvery(POST_LOADING_REQUEST, loadPost);
}

export default function* postSaga() {
  yield all([fork(watchLoadPost)]);
}
