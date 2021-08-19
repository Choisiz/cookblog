import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  CLEAR_ERROR_FAIL,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCESS,
  PASSWORD_EDIT_FAIL,
  PASSWORD_EDIT_REQUEST,
  PASSWORD_EDIT_SUCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCESS,
  USER_LOADING_FAIL,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCESS,
} from "../types";

//==============login=================

//login api 통신
const loginUserAPI = (loginData) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/login", loginData, config);
};

//loginUserAPI 데이터에 따른 액션의 처리
function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    yield put({
      type: LOGIN_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAIL,
      payload: e.response,
    });
  }
}

//LOGIN_REQUEST 캐치할때마다 위 함수들 실행
function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

//==============logout=================

function* logoutUser(action) {
  try {
    yield put({
      type: LOGOUT_SUCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAIL,
    });
    console.log(e);
  }
}

function* watchLogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

//==============register=================

const registerUserAPI = (req) => {
  return axios.post("api/user", req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    yield put({
      type: REGISTER_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAIL,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

//==============userLoading=================

const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/login/user", config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAIL,
      payload: e.response,
    });
  }
}

function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

//==============ClearError=================

function* clearError(action) {
  try {
    yield put({
      type: CLEAR_ERROR_SUCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAIL,
    });
    console.log(e);
  }
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

//==============passwordEdit=================

const passwordEditAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`api/user/${payload.userName}/profile`, payload, config);
};

function* passwordEdit(action) {
  try {
    const result = yield call(passwordEditAPI, action.payload);
    yield put({
      type: PASSWORD_EDIT_SUCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log("??", e.response);
    yield put({
      type: PASSWORD_EDIT_FAIL,
      payload: e.response.data,
    });
  }
}

function* watchPasswordEdit() {
  yield takeEvery(PASSWORD_EDIT_REQUEST, passwordEdit);
}

//==============export default=================

export default function* loginSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchregisterUser),
    fork(watchUserLoading),
    fork(watchClearError),
    fork(watchPasswordEdit),
  ]);
}
