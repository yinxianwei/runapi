// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
    Select,
    Option,
    Button,
    Input
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(Input, { size: 'small' })
Vue.use(Select, { size: 'small' })
Vue.use(Option, { size: 'small' })
Vue.use(Button, { size: 'small' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
