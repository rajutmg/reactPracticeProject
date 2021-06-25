import { contactsActionType } from "../actions/actionType";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case contactsActionType.FETCH_CONTACT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case contactsActionType.FETCH_CONTACT_SUCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    }
    case contactsActionType.FETCH_CONTACT_FAILURE: {
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default contactsReducer;
