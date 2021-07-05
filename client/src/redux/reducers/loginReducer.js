import {
  //로그인,로그이웃,에러
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
} from "../types";

//초기값세팅
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMassage: "",
  sucessMassage: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    //로그인, 로그아웃, 회원가입
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        //처음에는 기존의 상태값을 복사하자
        //(왜냐하면 기존것과 비교해 바뀐것만 반영해야하므로)
        errorMassage: "",
        isLoading: true, //스피너 표시
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
    //유저로딩
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

    //에러
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
        errorMassage: null,
      };

    case CLEAR_ERROR_SUCESS:
      return {
        ...state,
        errorMassage: null,
      };

    case CLEAR_ERROR_FAIL:
      return {
        ...state,
        errorMassage: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
