import { combineReducers } from "redux";

import authenticationReducer from "./authenticationReducer";
import groupsReducer from "./groupsReducer";

export default combineReducers({
  authentication: authenticationReducer,
  groups: groupsReducer
});
