import {
  POST_DETAIL_FAIL,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCESS,
  POST_LOADING_FAIL,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCESS,
  POST_WRITE_FAIL,
  POST_WRITE_REQUEST,
  POST_WRITE_SUCESS,
} from "../types";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  error: "",
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
    case POST_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        isLoading: true,
      };
    case POST_WRITE_SUCESS:
      return {
        ...state,
        posts: [],
        isLoading: false,
      };
    case POST_WRITE_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case POST_DETAIL_REQUEST:
      return {
        ...state,
        posts: [],
        isLoading: true,
      };
    case POST_DETAIL_SUCESS:
      return {
        ...state,
        posts: [],
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        isLoading: false,
      };
    case POST_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
