import { SET_GROUPS, GET_GROUPS } from "../actions/types";

const INITIAL_STATE = {
  groups: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload;
    case SET_GROUPS:
      return {
        ...state,
        groups: [...action.payload]
      };
    default:
      return state;
  }
}
