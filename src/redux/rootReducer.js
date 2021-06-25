import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import contactsReducer from "../redux/reducers/contactsReducer";
export const rootReducer = combineReducers({
  authState: authReducer,
  contacts: contactsReducer,
});
