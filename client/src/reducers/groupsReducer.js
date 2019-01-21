import { SET_GROUPS, GET_GROUPS, SET_CURRENT_GROUP } from "../actions/types";

const INITIAL_STATE = {
  groups: [],
  currentGroup: null
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
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload.currentGroup
      };
    default:
      return state;
  }
}
