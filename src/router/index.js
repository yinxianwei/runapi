import Vue from 'vue'
import Router from 'vue-router'
import send from '@/components/send'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'send',
      component: send
    }
  ]
})
