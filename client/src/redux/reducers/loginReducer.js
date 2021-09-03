import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCESS,
  CLEAR_ERROR_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCESS,
  LOGOUT_FAIL,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCESS,
  USER_LOADING_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCESS,
  REGISTER_FAIL,
  PASSWORD_EDIT_REQUEST,
  PASSWORD_EDIT_SUCESS,
  PASSWORD_EDIT_FAIL,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMassage: "",
  successMassage: "",
  preMessage: "",
  allMassage: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    //login, logout, register
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMassage: "",
        isLoading: true,
      };
    case REGISTER_SUCESS:
    case LOGIN_SUCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMassage: "",
      };
    case LOGOUT_SUCESS:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        userId: null,
        userRole: null,
        errorMassage: "",
      };
    case REGISTER_FAIL:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        userId: null,
        userRole: null,
        errorMassage: action.payload.data.message,
      };
    //loading user
    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: "",
      };
    //edit password
    case PASSWORD_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PASSWORD_EDIT_SUCESS:
      return {
        ...state,
        isLoading: false,
        successMassage: action.payload.successMassage,
        errorMassage: "",
        preMessage: "",
        allMassage: "",
      };
    case PASSWORD_EDIT_FAIL:
      return {
        ...state,
        isLoading: false,
        successMassage: "",
        errorMassage: action.payload.errorMassage,
        preMessage: action.payload.preMessage,
        allMassage: action.payload.allMassage,
      };
    //clear error
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCESS:
      return {
        ...state,
        errorMassage: "",
        preMessage: "",
      };
    case CLEAR_ERROR_FAIL:
      return {
        ...state,
        errorMassage: "fail",
        preMessage: "fail",
      };
    //default
    default:
      return state;
  }
};

export default loginReducer;
