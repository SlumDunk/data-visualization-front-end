<template>
  <div id="app">
   <Content></Content>
  </div>
</template>

<script>
/* eslint-disable */
import Content from "./components/Content.vue";

  export default {
    name: 'App',
    components:{
      Content
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  ul, li {
    list-style: none
  }
  a {
    text-decoration: none;
  }
  input,button{
    -webkit-appearance: none;
  }
  .content{
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 50px;
    overflow: auto;
  }
  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition: all 0.3s linear;
  }
  .fadeIn-leave-active{
    transition: all 0.3s linear;
    opacity: 0;
  }
</style>
