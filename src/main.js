import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import './assets/css/style.css'

import Vue from 'vue'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import 'sweetalert2/dist/sweetalert2.min.css'

require('@/store/subscriber')

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:1000/api/'
store.dispatch('auth/attempt', localStorage.getItem('token'))
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      VueSweetalert2,
      render: h => h(App),
    }).$mount('#app')
  })

// eslint-disable-next-line no-new
Vue.use(VueSweetalert2)
