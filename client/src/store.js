import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();

//사가 미들웨어 객체 생성
const sagaMiddleware = createSagaMiddleware();

const initialState = {};

//connect-react-router를 사용하고 있기때문 이렇게 배열안에 추가
//사용하지 않는다면 그냥 따로만,
const middlewares = [sagaMiddleware, routerMiddleware(history)];

//리덕스 개발 툴
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

//배포시 devtools를 감추기
const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
  createRootReducer(history),
  initialState, //모든 상태를 담고 있는 초기값
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default store;
