import Vue from 'vue';
import 'babel-polyfill';
import App from './App.vue';

import router from './router/index';
import store from './store/index';
import { auth } from '@/utils/api_helper';

Vue.config.productionTip = false;

router.beforeEach((from, to, next) => {
  if (!store.state.user.isLogin && store.state.user.firstEnter) {
    auth().then(data => {
      if (data.username) {
        store.commit('CHANGE_LOADING', data);
      } else {
        store.commit('CHANGE_ENTER');
      }
    });
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
