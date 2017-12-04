import Vue from 'vue';
import App from './App';
import iview from '../static/iview/iview'
Vue.use(iview)
import '../static/iview/styles/iview.css'
// import 'iview/dist/styles/iview.css';
import router from './router'
import $lm from 'common/index'

global.$lm=$lm;
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
