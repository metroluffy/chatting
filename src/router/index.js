import Vue from 'vue'
import Router from 'vue-router'
import chatRoom from '@/components/chatRoom'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import ForgotPassword from '@/components/Auth/ForgotPassword'
import ResetPassword from '@/components/Auth/ResetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chatRoom',
      component: chatRoom
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/resetpass',
      name: 'ResetPassword',
      component: ResetPassword
    }
  ]
})
