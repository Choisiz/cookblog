import {
  CATEGORY_FIND_FAIL,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCESS,
  POST_DETAIL_FAIL,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCESS,
  POST_EDIT_LOADING_FAIL,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCESS,
  POST_EDIT_UPLOAD_FAIL,
  POST_EDIT_UPLOAD_REQUEST,
  POST_EDIT_UPLOAD_SUCESS,
  POST_LOADING_FAIL,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCESS,
  POST_WRITE_FAIL,
  POST_WRITE_REQUEST,
  POST_WRITE_SUCESS,
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCESS,
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
  categoryFindResult: "",
  title: "",
  search: "",
  searchResult: "",
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    //loading post
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
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
        isLoading: false,
      };
    case POST_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    //write post
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
    //detail post
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
    //edit loading post
    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        isLoading: true,
      };
    case POST_EDIT_LOADING_SUCESS:
      return {
        ...state,
        postDetail: action.payload,
        isLoading: false,
      };
    case POST_EDIT_LOADING_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    //edit upLoading post
    case POST_EDIT_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case POST_EDIT_UPLOAD_SUCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case POST_EDIT_UPLOAD_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    //category
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [],
        isLoading: true,
      };
    case CATEGORY_FIND_SUCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        isLoading: false,
      };
    case CATEGORY_FIND_FAIL:
      return {
        ...state,
        categoryFindResult: action.payload,
        isLoading: false,
      };
    //search
    case SEARCH_REQUEST:
      return {
        ...state,
        posts: [],
        search: action.payload,
        isLoading: true,
      };
    case SEARCH_SUCESS:
      return {
        ...state,
        search: action.payload,
        searchResult: action.payload,
        isLoading: false,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        searchResult: action.payload,
        isLoading: false,
      };
    //default
    default:
      return state;
  }
};

export default postReducer;
