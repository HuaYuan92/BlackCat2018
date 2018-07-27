import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import commons from './components/common/index'
import filters from './components/filters/index'
import axios from 'axios'
import ElementUI from 'element-ui';

Object.keys(commons).forEach(key => Vue.component(key, commons[key]));
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.router = router;
Vue.prototype.axios = axios;
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

/*状态判断*/
router.beforeEach((to, from, next) => {
  console.log(to.meta);
  console.log(from.meta);
  if(to.meta&&to.meta.title){
    window.document.title=`黑猫察 - ${to.meta.title}`;
  }
  let requireAuth = to.meta.requireAuth;

  if (requireAuth) {
    next('/login')
  }else {
    next()
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
