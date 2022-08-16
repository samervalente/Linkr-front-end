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
      console.log(err);
      return err.response.data;
    });
}