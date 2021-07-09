import {
  POST_LOADING_FAIL,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCESS,
} from "../types";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  posts: [],
  postDetail: "",
  postCount: "",
  errorMassage: "",
  creatorId: "",
  catagoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMassage: "",
      };
    case POST_LOADING_SUCESS:
      return {
        ...state,
        //기존 포스터 -> 최신
        posts: [...state.posts, ...action.payload],
        isLoading: false,
      };
    case POST_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
