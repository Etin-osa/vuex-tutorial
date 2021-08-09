import Vue from 'vue'
import App from './App.vue'
import store from './store/store' //or
//import store from './store' //or

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
