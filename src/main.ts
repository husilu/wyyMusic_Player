import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/index'
import axios from './utils/request'
import VueRouter from 'vue-router';
import 'style/global';
import './assets/font/iconfont';
import {
  Field,
  Swipe,
  SwipeItem,
  Lazyload,
  Popup,
  Loading,
  Toast
} from 'vant';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// Vue.prototype.$Bus = Bus
Vue.use(VueRouter);
Vue.use(Field);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(Loading);
Vue.use(Toast);

declare var window: any;
window._vueInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
