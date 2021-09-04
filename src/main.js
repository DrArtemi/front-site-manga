import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import './css/style.css'
import FlagIcon from 'vue-flag-icon'

Vue.config.productionTip = false
Vue.use(FlagIcon);

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
