import Vue from 'vue'
import axios from 'axios'
import vuexI18n from 'vuex-i18n'

import App from './App'
import router from './router'
import store from './store'
import robot from '../lib/robot.js'

robot.setMaxListeners(30)

Vue.use(vuexI18n.plugin,store)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.robot = global.robot = Vue.prototype.$robot = robot

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

import '../lib/services.es'
require('../lib/api_resolver.es')
import '../lib/layout.js'