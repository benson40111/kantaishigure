import Vue from 'vue'
import axios from 'axios'
import vuexI18n from 'vuex-i18n'

import App from './App'
import router from './router'
import store from './store'

Vue.use(vuexI18n.plugin,store)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

import '../lib/services.es'
import '../lib/api_resolver.es'
import '../lib/layout.js'
