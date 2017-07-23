import Vue from 'vue'
import axios from 'axios'
import vuexI18n from 'vuex-i18n'

import App from './App'
import router from './router'
import store from './store'

Vue.use(vuexI18n.plugin,store)
this.$http = axios
this.$http.get('static/i18n/zh-TW.json')
	.then( (res) => Vue.i18n.add('tw', res.data) )
	.catch( (err) => console.log(err) )

Vue.i18n.set('tw')

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
