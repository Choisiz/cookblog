import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    //router로 connectRouter를 이름지음
    router: connectRouter(history),
  });

export default createRootReducer;
