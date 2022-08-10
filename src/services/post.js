import axios from "axios";

function getUrlAPI(endpoint) {
  return `http://localhost:4000/${endpoint}`;
}

export async function sendPost(body, config) {
  return axios
    .post(getUrlAPI("posts"), body, config)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err)
      return err.response.data;
    });
}

export async function getPosts(config) {
  return axios
    .get(getUrlAPI("posts"), config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}