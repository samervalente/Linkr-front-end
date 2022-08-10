import axios from "axios";

function getUrlAPI(endpoint) {
  const local = `http://localhost:4000/${endpoint}`;
  const prod = `https://linkr-driven.herokuapp.com/${endpoint}`
  return local
}

export async function sendRegisterData(payload) {
  return axios
    .post(getUrlAPI("signup"), payload)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function sendLoginData(payload) {
  return axios
    .post(getUrlAPI("signin"), payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
