import { SET_USER } from "../actions/types";
import { isEmpty } from "lodash";
// IN PRODUCTION ENV SET isAuth.. to false
const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
