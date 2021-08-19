import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  COMMENT_LOADING_FAIL,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCESS,
  COMMENT_UPLOAD_FAIL,
  COMMENT_UPLOAD_REQUEST,
  COMMENT_UPLOAD_SUCESS,
} from "../types";
import { push } from "connected-react-router";

//==============load Comment=================

const loadCommentAPI = (payload) => {
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComment(action) {
  try {
    const result = yield call(loadCommentAPI, action.payload);
    yield put({
      type: COMMENT_LOADING_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_LOADING_FAIL,
      payload: e,
    });
    yield push("/");
  }
}
function* watchLoadComment() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComment);
}

//==============upload Comment=================
const uploadCommentAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`/api/post/${payload.id}/comments`, payload, config);
};

function* uploadComment(action) {
  try {
    const result = yield call(uploadCommentAPI, action.payload);
    yield put({
      type: COMMENT_UPLOAD_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOAD_FAIL,
      payload: e,
    });
    yield push("/");
  }
}
function* watchUploadComment() {
  yield takeEvery(COMMENT_UPLOAD_REQUEST, uploadComment);
}

//==============export default=================

export default function* commentSaga() {
  yield all([fork(watchLoadComment), fork(watchUploadComment)]);
}
