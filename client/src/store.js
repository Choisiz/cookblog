import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();

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

//일반적으로 리덕스는 어떻게 리액트를 상태관리는 하는가?
//부모 즉 최상위에서 어떤 상태값을 가지고 있을때 그것을 다시 자식,아래
//로 상태값을 넘겨줄수 있다.
//결론적으로는 고조-증조-조부-부모-자식 과 같이 차례로 상태값을 전달하여
//상태값을 받을 수 있다.

//리덕스는 모든 생태를 한곳에 저장해서
//어느곳에서도 한곳에서 끄집에 내서 쓰게 된다
//이러면 개발자 입장에서는 더욱 관리를 하기 편하다.
//reducer는 a,b 상태에 대한 함수,로직을 선언한다.
//sagas는 reducer에서 어떤 함수들이 작동해야 하는지를 정의
