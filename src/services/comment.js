import axios from "axios";

function getUrlAPI(endpoint) {
  return `https://linkr-driven.herokuapp.com/${endpoint}`;
}

export async function sendComment(id, body, config) {
  return axios
    .post(getUrlAPI(`comments/${id}`), body, config)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function fetchComments(id, config) {
  return axios
    .get(getUrlAPI(`comments/${id}`), config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}