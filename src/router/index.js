import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/views/home'),
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
    },
    {
      path: '/movie',
      redirect: '/movie/1'
    },
    {
      path: '/movie/:type',
      component: () => import('@/views/movie.vue')
    },
    {
      path: '/cinema',
      component: () => import('@/views/cinema.vue')
    },
    {
      path: '/board',
      redirect: '/board/1'
    },
    {
      path: '/board/:type',
      component: () => import('@/views/board.vue')
    },
  ]
});

export default router;