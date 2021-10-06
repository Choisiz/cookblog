import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  POST_BOOKMARK_REQUEST,
  POST_BOOKMARK_SUCESS,
  POST_BOOKMARK_FAIL,
} from "../types";

//==============upload Comment=================
const BookMarkPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`/api/post/${payload.id}/bookmark`, payload, config);
};

function* BookMarkPost(action) {
  try {
    const result = yield call(BookMarkPostAPI, action.payload);
    yield put({
      type: POST_BOOKMARK_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_BOOKMARK_FAIL,
      payload: e,
    });
  }
}
function* watchBookMarkPostPost() {
  yield takeEvery(POST_BOOKMARK_REQUEST, BookMarkPost);
}

//==============export default=================

export default function* bookmarkSaga() {
  yield all([fork(watchBookMarkPostPost)]);
}
