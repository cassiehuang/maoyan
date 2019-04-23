import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLogin: false,
      username: null,
      firstEnter: true,
    },
    city: '成都',
    screen: {
      size: 'xl',
    },
  },
  actions: {},
  mutations: {
    CHANGE_SCREEN(state, size) {
      state.screen = {
        size,
      };
    },
    CHANGE_LOADING(state, { username }) {
      state.user = {
        isLogin: true,
        username,
      };
    },
    CHANGE_ENTER(state) {
      state.user = {
        firstEnter: false,
        isLogin: true,
      };
    },
    CHANGE_CITY(state, city) {
      state.city = city;
    },
  },
  getters: {},
});
