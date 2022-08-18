import axios from "axios";

function getUrlAPI(endpoint) {
  const local = `https://linkr-driven.herokuapp.com/${endpoint}`;
  return `https://linkr-driven.herokuapp.com/${endpoint}`;
}

export async function sendPost(body, config) {
  return axios
    .post(getUrlAPI("posts"), body, config)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
}

export async function getPosts(config, newEndpoint) {
  return axios
    .get(getUrlAPI("posts"), config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function getTrending() {
  return axios
    .get(getUrlAPI("trending"))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return "Não foi possível carregar o trending";
    });
}

export async function getPostsByHashtagName(hashtagName) {
  return axios
    .get(getUrlAPI(`posts/${hashtagName}`))
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function updatePost(id, body, config) {
  return axios
    .put(getUrlAPI(`posts/${id}`), body, config)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
}
