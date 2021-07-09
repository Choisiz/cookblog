import { all, fork } from "redux-saga/effects";
import axios from "axios";

import loginSaga from "./loginSaga";
import dotenv from "dotenv";
import postSaga from "./postSaga";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

//제너레이터 함수: 여러값을 반환하는 최신문법함수
export default function* rootSaga() {
  yield all([fork(loginSaga), fork(postSaga)]);
}
