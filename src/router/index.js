import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ selector: to.hash, offset: { y: 50 } });
        }, 300);
      });
    }
    if (savedPosition) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(savedPosition);
        }, 100);
      });
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home", webpackPrefetch: true */ '@/views/home'),
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '@/views/login'),
    },
    {
      path: '/movie',
      component: () => import(/* webpackChunkName: "movie", webpackPrefetch: true */ '@/views/movie.vue'),
    },
    {
      path: '/cinema',
      component: () => import(/* webpackChunkName: "cinema", webpackPrefetch: true */ '@/views/cinema.vue'),
    },
    {
      path: '/board',
      redirect: '/board/1',
    },
    {
      path: '/board/:type',
      component: () => import(/* webpackChunkName: "board", webpackPrefetch: true */ '@/views/board.vue'),
    },
    {
      path: '/search',
      component: () => import(/* webpackChunkName: "board", webpackPrefetch: true */ '@/views/search.vue'),
    },
  ],
});

export default router;
