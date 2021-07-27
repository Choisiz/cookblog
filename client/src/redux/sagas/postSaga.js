import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POST_DETAIL_FAIL,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCESS,
  POST_LOADING_FAIL,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCESS,
  POST_UPLOAD_FAIL,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCESS,
} from "../types";

//load Post
const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    console.log("포스트 작성사가:", result);
    yield put({
      type: POST_LOADING_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAIL,
      payload: e,
    });
  }
}

function* watchLoadPost() {
  yield takeEvery(POST_LOADING_REQUEST, loadPost);
}

//upload Post
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPost(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    console.log("try 구문 실패:", action.payload);
    yield put({
      type: POST_UPLOAD_SUCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAIL,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchUploadPostPost() {
  yield takeEvery(POST_UPLOAD_REQUEST, uploadPost);
}

//Detail Post
const detailPostAPI = (payload) => {
  console.log("payload:", payload);
  return axios.get(`/api/post/${payload}`);
};

function* detailPost(action) {
  try {
    const result = yield call(detailPostAPI, action.payload);
    console.log("result:", result);
    yield put({
      type: POST_DETAIL_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_FAIL,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchDetailPostPost() {
  yield takeEvery(POST_DETAIL_REQUEST, detailPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchUploadPostPost),
    fork(watchDetailPostPost),
  ]);
}
