const axios = require('axios');
axios.defaults.withCredentials = true;   //cookie

const auth = () => {
  return axios.post('/auth').then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
};
const login = (data) => {
  return axios.post('/login/user',{
    data: data,
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
};
const logout = () => {
  return axios.post('/logout').then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
};
const queryFilms = (data = {}) => {
  return axios.get('/films/query',{
    params: {
      data,
    }
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
};
const queryRecommand = (data = {}) => {
  return axios.get('/recommand/query',{
    params: {
      data,
    }
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
};
const queryCinemas = (data = {}) => {
  return axios.get('/cinemas/query',{
    params: {
      data,
    }
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
};
export {auth, login, logout, queryFilms, queryRecommand, queryCinemas};