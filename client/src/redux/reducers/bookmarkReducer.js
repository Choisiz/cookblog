import {
  POST_BOOKMARK_REQUEST,
  POST_BOOKMARK_SUCESS,
  POST_BOOKMARK_FAIL,
} from "../types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  bookmarked: [],
  creatorId: "",
  errorMassage: "",
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    //bookmark
    case POST_BOOKMARK_REQUEST:
      return {
        ...state,
        bookmarked: [],
        isLoading: true,
      };
    case POST_BOOKMARK_SUCESS:
      return {
        ...state,
        bookmarked: [...state.bookmarked, action.payload],
        isAuthenticated: true,
        isLoading: false,
      };
    case POST_BOOKMARK_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    //default
    default:
      return state;
  }
};

export default bookmarkReducer;
