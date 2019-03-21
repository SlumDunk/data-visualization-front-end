<template>
  <div>
    <MHeader>Animal Hospital UI</MHeader>
    <div class="content">
      <ul>
        <li>
          <label for="command">Query Command</label>
          <textarea v-model="sql.command" id="command" style="width: 750px;height: 200px;"></textarea>
        </li>
        <li><button @click="query">query</button></li>
        <li>
          <label for="data">Query Result</label>
          <!--<div style="width: 750px;height: 200px; border:1px solid #F00">-->
          <table id="data">
            <thead>
            <tr>
              <td v-for='item in headers'>{{item}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for='item in data'>
            <template v-for='value in item'>
              <td>{{value}}</td>
            </template>
            </tr>
            </tbody>
          </table>
          <!--</div>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import MHeader from '../base/MHeader.vue';
  import {query} from '../api';

  export default {
    name: "Query",
    data() {
      return {sql: {}, resultset:{}, data:[],headers:[]};
    },
    components: {MHeader},
    methods:{
      async query(){
        this.resultset=await query(this.sql);
        if(this.resultset!=null) {
          this.data = this.resultset.data.data;
          this.headers = this.resultset.data.headers;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  ul{
    margin: 50px 10px 0px 10px;
    li{
      label{
        display: block;
        font-size: 25px;
      }
      input{
        height: 25px;
        margin: 10px 0;
        width: 100%;
      }
      button{
        display:block;
        width: 80px;
        height:35px;
        background:deepskyblue;
        color: #fff;
        border: none;
        border-radius: 15px;
        outline: none;

      }
    }
  }

  table,table tr th, table tr td { border:1px solid #0094ff; }
  table { width: 200px; min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse;}
</style>
