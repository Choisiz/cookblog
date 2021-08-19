import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  CATEGORY_FIND_FAIL,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCESS,
  POST_DETAIL_FAIL,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCESS,
  POST_EDIT_LOADING_FAIL,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCESS,
  POST_EDIT_UPLOAD_FAIL,
  POST_EDIT_UPLOAD_REQUEST,
  POST_EDIT_UPLOAD_SUCESS,
  POST_LOADING_FAIL,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCESS,
  POST_UPLOAD_FAIL,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCESS,
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCESS,
} from "../types";

//==============load Post=================

const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
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

//==============upload Post=================

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

//==============Detail Post=================

const detailPostAPI = (payload) => {
  return axios.get(`/api/post/${payload}`);
};

function* detailPost(action) {
  try {
    const result = yield call(detailPostAPI, action.payload);
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

//==============Delete Post=================

const DeletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
  try {
    const result = yield call(DeletePostAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAIL,
      payload: e,
    });
  }
}

function* watchDeletePostPost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}

//==============Edit Load Post=================

const EditloadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* EditloadPost(action) {
  try {
    const result = yield call(EditloadPostAPI, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAIL,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchEditloadPost() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, EditloadPost);
}

//==============Edit Upload Post=================

const EditUploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* EditUploadPost(action) {
  try {
    const result = yield call(EditUploadPostAPI, action.payload);
    yield put({
      type: POST_EDIT_UPLOAD_SUCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOAD_FAIL,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchEditUploadPost() {
  yield takeEvery(POST_EDIT_UPLOAD_REQUEST, EditUploadPost);
}

//==============category=================

const CategoryFindAPI = (payload) => {
  return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);
    yield put({
      type: CATEGORY_FIND_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAIL,
      payload: e,
    });
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

//==============search=================

const SearchResultAPI = (payload) => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);

    yield put({
      type: SEARCH_SUCESS,
      payload: result.data,
    });
    yield put(push(`/search/${encodeURIComponent(action.payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAIL,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}

//==============export default=================

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchUploadPostPost),
    fork(watchDetailPostPost),
    fork(watchDeletePostPost),
    fork(watchEditloadPost),
    fork(watchEditUploadPost),
    fork(watchCategoryFind),
    fork(watchSearchResult),
  ]);
}
