import { SET_USER, SET_LOADER, GET_ERRORS } from "../actions/types";
import { isEmpty } from "lodash";
// IN PRODUCTION ENV SET isAuth.. to false
const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  isLoading: true,
  errors: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        isLoading: false
      };

    case SET_LOADER:
      return {
        ...state,
        isLoading: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
