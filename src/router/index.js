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
      component: () => import('../components/Home.vue'), meta: {keepAlive: true,title:'homepage'}
    },
    {
      path: '/physical',
      component: () => import('../components/Physical.vue'),
      meta:{title:'physical data'}
    },
    {
      path: '/bmirange',
      component: () => import('../components/BMI.vue'),
      meta:{title:'bmi data'}
    },
    {
      path: '/eastwest',
      component: () => import('../components/EastWest.vue'),
      meta:{title:'east vs west'}
    },
    {
      path: '/rangeteam',
      component: () => import('../components/Team.vue'),
      meta:{title:'team awards'}
    },
    {
      path: '/top10',
      component: () => import('../components/Top10.vue'),
      meta:{title:'team awards'}
    },
    {path: '*', redirect: '/home'}
  ]
})
