import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";
const createRootReducer = (history) =>
  combineReducers({
    //router로 connectRouter를 이름지음
    router: connectRouter(history),
    login: loginReducer,
    post: postReducer,
  });

export default createRootReducer;
