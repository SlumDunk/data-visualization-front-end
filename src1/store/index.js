import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger.js';//logger是一个日志插件
Vue.use(Vuex);

//容器是唯一的
const state = {count: 0};
import mutations from './mutation.js';

const getters = {
    val: (state) =>
      state.count % 2 ? 'odd' : 'even'

  }
;
export default new Vuex.Store({
  state,
  strict: true,//只能通过mutation(管理员)来更改状态,mutation不支持异步
  mutations,
  getters: getters,
  plugins: [logger()]
});
