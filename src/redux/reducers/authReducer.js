import { AuthActionType } from "../actions/actionType";

const authState = {
  loading: false,
  user: {},
};
// get user from local storage
export const getStorageUser = () => {
  const localStore = localStorage.getItem("auth_token");
  try {
    const authobj = JSON.parse(localStore);
    const { user } = authobj;
    if (user) {
      return {
        ...authState,
        user: user,
      };
    }
  } catch (error) {
    return authState;
  }
};
const newAUth = getStorageUser();

export const authReducer = (state = newAUth, action) => {
  switch (action.type) {
    // register
    case AuthActionType.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthActionType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case AuthActionType.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
      };
    // login
    case AuthActionType.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthActionType.LOGIN_SUCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case AuthActionType.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };

    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: {},
      };
    // default
    default:
      return state;
  }
};

export default authReducer;
