import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Setting from '../views/Setting.vue'
import User from '../views/User.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: User,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
