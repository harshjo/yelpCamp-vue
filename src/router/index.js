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
    component: () => import(/* webpackChunkName: "about" */ '../views/Campgrounds/index.vue'),
  },
  {
    path: '/campgrounds/new',
    name: 'AddCampground',
    component: () => import('../views/Campgrounds/new.vue')
  },
  {
    path: '/campgrounds/:id',
    name: 'ShowCampground',
    component: () => import('../views/Campgrounds/show.vue')
  },
  {
    path: '/campgrounds/:id/edit',
    name: 'editCampground',
    component: () => import('../views/Campgrounds/edit.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router