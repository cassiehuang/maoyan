const axios = require('axios');

axios.defaults.withCredentials = true; // cookie

const auth = () =>
  axios
    .post('/api/auth')
    .then(res => res.data)
    .catch(err => err);

const login = data =>
  axios
    .post('/api/login/user', data)
    .then(res => res.data)
    .catch(err => err);

const logout = () =>
  axios
    .post('/api/logout')
    .then(res => res.data)
    .catch(err => err);

const getOnlineFilms = () =>
  axios
    .get('/api/films/online')
    .then(res => res.data)
    .catch(err => err);
const getPreFilms = () =>
  axios
    .get('/api/films/pre')
    .then(res => res.data)
    .catch(err => err);
const getGoodFilms = () =>
  axios
    .get('/api/films/good')
    .then(res => res.data)
    .catch(err => err);
const getHotFilms = () =>
  axios
    .get('/api/films/hot')
    .then(res => res.data)
    .catch(err => err);

const getFilms = (data = {}) =>
  axios
    .get('/api/films/query', {
      params: data,
    })
    .then(res => res.data)
    .catch(err => err);

const getRecommand = () =>
  axios
    .get('/api/recommand')
    .then(res => res.data)
    .catch(err => err);

const getCinemas = (data = {}) =>
  axios
    .get('/api/cinemas/query', {
      params: data,
    })
    .then(res => res.data)
    .catch(err => err);

const search = (data = {}) =>
  axios
    .get('/api/search', {
      params: data,
    })
    .then(res => res.data)
    .catch(err => err);

export {
  auth,
  login,
  logout,
  getOnlineFilms,
  getPreFilms,
  getGoodFilms,
  getHotFilms,
  getFilms,
  getRecommand,
  getCinemas,
  search,
};
