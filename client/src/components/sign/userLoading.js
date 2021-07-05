import store from "../../store";
import { USER_LOADING_REQUEST } from "../../redux/types";

const userLoading = () => {
  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  } catch (e) {
    console.log(e);
  }
};

export default userLoading;
