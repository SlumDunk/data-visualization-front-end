<template>
  <div>
    计数器：
    <button @click="minus">-</button>
    <br/>
    当前：{{this.$store.state.count}}<br/>
    计数器：
    <button @click="add">+</button>
    {{this.$store.getters.val}}
    <br/>

  </div>
</template>

<script>
  import * as Types from '../store/mutation-types.js';
  export default {
    name: "Content",
    methods: {
      add(){
        //提交add的mutation
        //载荷 payload
        this.$store.commit(Types.INCREMENT,2);
      },
      minus(){
        this.$store.commit(Types.DECREMENT);
      }
    }
  }
</script>

<style scoped>

</style>
