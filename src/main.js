import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import global from './global/global'
import JsEncrypt from 'jsencrypt'
Vue.prototype.$jsEncrypt = JsEncrypt

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(global);
window.Vue = Vue;

require('./assets/css/reset.css');
require('./assets/css/index.css');
require('./assets/icofont/style.css');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
