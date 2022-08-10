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
      return err.response.data;
    });
}
