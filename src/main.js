/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.$http = Axios

//check login

router.beforeEach((to,from,next) =>{
  const token = store.getters.getToken;
  if(new RegExp('(\/login|\/register|\/forgot|\/resetpass)').test(to.path)){
    if(token !== 'null' && token !== null){
      next('/')
    }
    next();
  }else{
    if(token !== 'null' && token !== null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      next()
    }else{
      next('/login')
    }
  }
})

/* use iview */
Vue.use(iView)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
