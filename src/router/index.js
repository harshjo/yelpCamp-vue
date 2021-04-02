import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/campgrounds',
    name: 'Campgrounds',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "index" */ '../views/Campgrounds/index.vue'),
  },
  {
    path: '/campgrounds/new',
    name: 'AddCampground',
    component: () => import(/* webpackChunkName: "new" */ '../views/Campgrounds/new.vue')
  },
  {
    path: '/campgrounds/:id',
    name: 'ShowCampground',
    component: () => import(/* webpackChunkName: "show" */ '../views/Campgrounds/show.vue')
  },
  {
    path: '/campgrounds/:id/edit',
    name: 'editCampground',
    component: () => import(/* webpackChunkName: "edit" */ '../views/Campgrounds/edit.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "catch" */ '../views/FourOFour.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router