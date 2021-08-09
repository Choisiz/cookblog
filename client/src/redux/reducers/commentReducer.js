import {
  COMMENT_LOADING_FAIL,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCESS,
  COMMENT_UPLOAD_FAIL,
  COMMENT_UPLOAD_REQUEST,
  COMMENT_UPLOAD_SUCESS,
} from "../types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  comments: [],
  creatorId: "",
  errorMassage: "",
};

const commentReducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case COMMENT_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_LOADING_SUCESS:
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
      };
    case COMMENT_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case COMMENT_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_UPLOAD_SUCESS:
      console.log("tkrmtm", action.payload);
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isAuthenticated: true,
        isLoading: false,
      };
    case COMMENT_UPLOAD_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
