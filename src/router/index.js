import Vue from 'vue';
import VueRouter from 'vue-router';
import Randomizer from '@/views/Randomizer.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Randomizer',
    component: Randomizer,
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
