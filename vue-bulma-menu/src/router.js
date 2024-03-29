import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: () => import(/* webpackChunkName: "" */ './views/LandingPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "" */ './views/About.vue')
    },
    {
      path: '/view1',
      name: 'view1',
      component: () => import(/* webpackChunkName: "" */ './views/View1.vue')
    },
    {
      path: '/view2',
      name: 'view2',
      component: () => import(/* webpackChunkName: "" */ './views/View2.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
