import * as Types from './mutation-types.js';

const mutations = {
  [Types.INCREMENT](state, count) {// state是自动放入的，默认指的就是当前的state
    if (isNaN(parseInt(count))) return;
    state.count += count;

  },
  [Types.DECREMENT](state){
    state.count-=1;
  }
};
export default mutations;
