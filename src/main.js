import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router/index.js'
import store from './store/index.js'
import { auth } from '@/utils/api_helper.js'

axios.defaults.baseURL = 'http://localhost:3333';
Vue.config.productionTip = false;

router.beforeEach((from, to, next) => {
  if (!store.state.user.isLogin && store.state.user.firstEnter) {
    auth().then((data) => {
      if (data.username) {
        store.commit('CHANGE_LOADING', data);
      }
      else {
        store.commit('CHANGE_ENTER');
      }
    })
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
