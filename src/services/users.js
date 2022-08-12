import axios from "axios"

function getUrlAPI(endpoint) {
    const local = `http://localhost:4000/${endpoint}`;
    const prod = `https://linkr-driven.herokuapp.com/${endpoint}`
    return local
  }

  export async function getUsers(name){
    return axios.get(getUrlAPI(`users?name=${name}`))
    .then(res => {
        return res.data
    })
    .catch(err => {
        return err.response.data
    })
  }