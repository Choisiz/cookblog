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
  switch (action.type) {
    //loading comment
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
    //upLoading comment
    case COMMENT_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_UPLOAD_SUCESS:
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
    //default
    default:
      return state;
  }
};

export default commentReducer;
