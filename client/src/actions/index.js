import axios from "axios";
import jwt_decode from "jwt-decode";
import tokenSetter from "../utils";
import { SET_GROUPS, GET_ERRORS, SET_USER, SET_CURRENT_GROUP } from "./types";

export const login = (userData, history) => dispatch => {
  axios
    .post("user/login", userData)
    .then(res => {
      const { token } = res.data;
      tokenSetter(token);
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      dispatch(setUser(decoded));
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const signup = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const logout = history => dispatch => {
  dispatch(setUser({}));
  tokenSetter(false);
  localStorage.removeItem("jwtToken");
};

export const getGroups = groupData => dispatch => {
  axios
    .post("/group/get", groupData)
    .then(function(response) {
      dispatch(setGroups(response.data.groups));
    })
    .catch(function(error) {});
};

export const setUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};

export const setGroups = groups => {
  return {
    type: SET_GROUPS,
    payload: groups
  };
};

export const setCurrentGroup = group => {
  return {
    type: SET_CURRENT_GROUP,
    payload: {
      currentGroup: group
    }
  }
}