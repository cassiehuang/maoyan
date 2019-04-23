const axios = require('axios');

axios.defaults.withCredentials = true; // cookie

const auth = () => axios.post('/auth').then(res => res.data).catch(err => err);
const login = data => axios.post('/login/user', {
  data,
}).then(res => res.data).catch(err => err);
const logout = () => axios.post('/logout').then(res => res.data).catch(err => err);
const queryFilms = (data = {}) => axios.get('/films/query', {
  params: {
    data,
  },
}).then(res => res.data).catch(err => err);
const queryRecommand = (data = {}) => axios.get('/recommand/query', {
  params: {
    data,
  },
}).then(res => res.data).catch(err => err);
const queryCinemas = (data = {}) => axios.get('/cinemas/query', {
  params: {
    data,
  },
}).then(res => res.data).catch(err => err);
export {
  auth, login, logout, queryFilms, queryRecommand, queryCinemas,
};
