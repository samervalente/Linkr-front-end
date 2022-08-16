import axios from "axios";

function getUrlAPI(endpoint) {
  const local = `https://linkr-driven.herokuapp.com/${endpoint}`;
  const prod = `https://linkr-driven.herokuapp.com/${endpoint}`;
  return prod;
}

export async function getUsers(name) {
  return axios
    .get(getUrlAPI(`users?name=${name}`))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function followUnfollowUser(body, action){
  
  return axios
  .post(getUrlAPI(`users/follow?action=${action}`), body)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return err.response.data
  })
}