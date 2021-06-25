import axios from "axios";
import axiosInstance from "../../helpers/axiosInstance";
import { contactsActionType } from "./actionType";

export const fetchUserRequest = () => {
  return {
    type: contactsActionType.FETCH_CONTACT_REQUEST,
  };
};

export const fetchUserSucess = (users) => {
  return {
    type: contactsActionType.FETCH_CONTACT_SUCESS,
    payload: users,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: contactsActionType.FETCH_CONTACT_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axiosInstance()
      .get("/contacts/")
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSucess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUserFailure(errorMsg));
      });
  };
};
