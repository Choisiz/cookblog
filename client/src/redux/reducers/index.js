import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import bookmarkReducer from "./bookmarkReducer";
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    post: postReducer,
    comment: commentReducer,
    bookmark: bookmarkReducer,
  });

export default createRootReducer;
