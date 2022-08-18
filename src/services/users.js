import axios from "axios";

function getUrlAPI(endpoint) {
  return `https://linkr-driven.herokuapp.com/${endpoint}`;
}

export async function getUsers(name, config) {
  return axios
    .get(getUrlAPI(`users?name=${name}`), config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function followUnfollowUser(body, action) {
  return axios
    .post(getUrlAPI(`users/follow?action=${action}`), body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      alert("Could not complete the operation");
    });
}
