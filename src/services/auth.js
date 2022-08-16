import axios from "axios";

function getUrlAPI(endpoint) {
  const local = `https://linkr-driven.herokuapp.com/${endpoint}`;
  const prod = `https://linkr-driven.herokuapp.com/${endpoint}`;
  return local;
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

export async function validateToken(body, config) {
  return axios
    .post(getUrlAPI("auth/validate"), body, config)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.data;
    });
}
