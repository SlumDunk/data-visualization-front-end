<template>
  <div class="footer">
    <router-link to="/home" style="text-align: -webkit-center">
      <i class="iconfont icon-shouye"></i>
      <span>homepage</span>
    </router-link>
    <!--<router-link to="/list">-->
      <!--<i class="iconfont icon-chazhaobiaodanliebiao"></i>-->
      <!--<span>列表</span>-->
    <!--</router-link>-->
    <!--<router-link to="/collect">-->
      <!--<i class="iconfont icon-shoucang"></i>-->
      <!--<span>收藏</span>-->
    <!--</router-link>-->
    <!--<router-link to="/add">-->
      <!--<i class="iconfont icon-tianjia"></i>-->
      <!--<span>添加</span>-->
    <!--</router-link>-->
    <router-link to="/physical" style="text-align: -webkit-center">
      <i class="iconfont icon-chazhaobiaodanliebiao"></i>
      <span>physical data</span>
    </router-link>
    <router-link to="/bmirange" style="text-align: -webkit-center">
      <i class="iconfont icon-chazhaobiaodanliebiao"></i>
      <span>bmi range</span>
    </router-link>
    <router-link to="/eastwest" style="text-align: -webkit-center">
      <i class="iconfont icon-chazhaobiaodanliebiao"></i>
      <span>east west</span>
    </router-link>
    <router-link to="/rangeteam" style="text-align: -webkit-center">
      <i class="iconfont icon-chazhaobiaodanliebiao"></i>
      <span>range team</span>
    </router-link>
    <router-link to="/top10" style="text-align: -webkit-center">
      <i class="iconfont icon-chazhaobiaodanliebiao"></i>
      <span>top 10</span>
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
    export default {
        name: "tab"
    }
</script>
<!--display:flex
    flex-direction: row/column
    justify-content-center 垂直居中
    align-item:center 横向居中
    flex:1 每份占1
-->
<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display:flex;
    border-top: 1px solid #ccc;
    a{
      diplay:flex;
      color: yellowgreen;
      flex-direction: column;
      flex:5;
      align-items: center;
      justify-content: center;

    }

    a.router-link-active{
      color:red;
    }
  }
</style>
