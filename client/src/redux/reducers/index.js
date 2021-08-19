import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    post: postReducer,
    comment: commentReducer,
  });

export default createRootReducer;
