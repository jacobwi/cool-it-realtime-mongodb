import axios from "axios";
import jwt_decode from "jwt-decode";
import tokenSetter from "../utils";
import { SET_GROUPS, SET_FRIENDS, GET_ERRORS, SET_USER } from "./types";

export const login = (userData, history) => dispatch => {
  console.log("logging");
  axios
    .post("user/login", userData)
    .then(res => {
      const { token } = res.data;
      tokenSetter(token);
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      dispatch(setUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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
