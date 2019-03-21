//document.body.innerHTML='helloworld';

import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';
//计数器
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  store// store被注册到实例上 所有组件都会有一个属性 this.$store
});
