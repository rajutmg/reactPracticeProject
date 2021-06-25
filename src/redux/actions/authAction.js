import axios from "axios";
import axiosInstance from "../../helpers/axiosInstance";
import { AuthActionType } from "./actionType";

// register
export const registerRequest = () => {
  return {
    type: AuthActionType.REGISTER_REQUEST,
  };
};
export const registerSucess = (data) => {
  return {
    type: AuthActionType.REGISTER_SUCCESS,
    payload: data,
  };
};
export const registerFail = (errorMessage) => {
  return {
    type: AuthActionType.REGISTER_FAIL,
    payload: errorMessage,
  };
};

const setFormikErrors = (errorObject, setErrorFunction) => {
  const error = Object.keys(errorObject);
  error.map((item) => {
    setErrorFunction(item, errorObject[item].join("\r\n"));
  });
  console.log("Errors");
};

export const RegisterAuthAction = (userState, history, { setErrors }) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequest());
      const res = await axiosInstance().post("/auth/register", userState);
      const { data } = res;
      dispatch(registerSucess(data));
      history.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        dispatch(registerFail(errorMessage));
        handle400Error(errorMessage, setErrors);
      }
    }
  };
};
const handle400Error = (backendErrors, setErrors) => {
  let errors = [backendErrors];
  // console.log(errors);
  errors.map((item) => {
    setErrors(item);
  });
  // console.log("errors object", errors);
};

// login
export const loginRequest = () => {
  return {
    type: AuthActionType.LOGIN_REQUEST,
  };
};
export const loginSucess = (data) => {
  return {
    type: AuthActionType.LOGIN_SUCESS,
    payload: data.user,
  };
};
export const loginFail = (errorMessage) => {
  return {
    type: AuthActionType.LOGIN_FAIL,
    payload: errorMessage,
  };
};

export const LoginAuthAction = (
  userState,
  history,
  setErrorHandler,
  handleClick
) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const res = await axiosInstance().post("/auth/login", userState);
      const { data } = res;
      dispatch(loginSucess(data));
      console.log(data);
      localStorage.setItem("auth_token", JSON.stringify(data));
      history.push("/");
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
        const errorMessage = error.response.data;
        dispatch(loginFail(errorMessage));
        console.log(setErrorHandler({ message: errorMessage.detail }));
        handleClick();
      }
    }
  };
};

// logout
export const logOut = () => {
  return {
    type: AuthActionType.LOGOUT,
  };
};

export const LogOutAuthAction = (history) => {
  return async (dispatch) => {
    dispatch(logOut());
    localStorage.removeItem("auth_token");
    history.push("/login");
  };
};
