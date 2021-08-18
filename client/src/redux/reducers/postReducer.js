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
  searchBy: "",
  searchResult: "",
};
//빈배열인 이유는 카테고리를 찾고
//홈으로 넘어갈시
//빈배열로 만들어주지 않는다면
//카테고리에서 찾은 배열과
//기존에 있던 홈에서 받던 배열이 겹쳐
//포스트가 증가됨
//즉 카테고리를 누를시 기존 홈에있던
//포스트+ 찾은 카테고리가 증가됨
//원래는 기존 포스트 없어지고
//찾은 카테고리 포스트만 나타나야함
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
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
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
    default:
      return state;
  }
};

export default postReducer;
