/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-05-07 09:18:17
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-06-11 15:35:06
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import '@/common/scss/index.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
