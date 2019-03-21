/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Home from '../components/Home.vue';
// import Collect from '../components/Collect.vue';
// import Detail from '../components/Detail.vue';
// import List from '../components/List.vue';
// import Add from '../components/Add.vue';

// export default new Router({
//   routes: [
//     {path: '/', redirect: '/home'},
//     {
//       path: '/home',
//       component: Home, meta: {keepAlive: true}
//     },
//     {
//       path: '/collect',
//       component: Collect
//     }, {// /detail/1 {bid:1} 路径参数 必须有但是可以随机
//       path: '/detail/:bid',
//       component: Detail,
//       name: 'detail'
//     }, {
//       path: '/list',
//       component: List
//     },
//     {
//       path: '/add',
//       component: Add
//     },
//     {path: '*', redirect: '/home'}
//   ]
// })
/**
 * 动态加载
 */
export default new Router({
  mode:'history',
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      component: () => import('../components/Home.vue'), meta: {keepAlive: true,title:'首页'}
    },
    {
      path: '/collect',
      component: () => import('../components/Collect.vue'),
      meta:{title:'收藏'}
    }, {// /detail/1 {bid:1} 路径参数 必须有但是可以随机
      path: '/detail/:bid',
      component: () => import('../components/Detail.vue'),
      name: 'detail',
      meta:{title:'详情'}
    }, {
      path: '/list',
      component: () => import('../components/List.vue'),
      meta:{title:'列表'}
    },
    {
      path: '/add',
      component: () => import('../components/Add.vue'),
      meta:{title:'添加'}
    },
    {path: '*', redirect: '/home'}
  ]
})
