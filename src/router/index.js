/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
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
