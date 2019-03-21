<template>
  <div class="detail">
    <MHeader :back="true">详情</MHeader>
    <div>
      <ul>
        <li>
          <label for="bookName">书的名称</label>
          <input type="text" v-model="book.bookName" id="bookName"/>
        </li>
        <li>
          <label for="bookInfo">书的信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo"/>
        </li>
        <li>
          <label for="bookPrice">书的价格</label>
          <input type="number" v-model="book.bookPrice" id="bookPrice"/>
        </li>
        <li><button @click="update">确认修改</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import MHeader from '../base/MHeader.vue';
  import {findOneBook,updateBook} from '../api';

  export default {
    name: "Detail",
    computed: {
      bid() {
        return this.$route.params.bid;// 将路径参数的ID映射到bid上
      }
    },
    created() {// 页面一加载 需要根据id 发送请求
      this.getData();
    },
    methods: {
      async getData() {
        this.book = await findOneBook(this.bid);
        //如果是空对象 需要跳转回到列表页
        Object.keys(this.book).length>0? void 0: this.$router.push('/list');
      },
      async update(){// 点击修改图书信息
        await updateBook(this.bid,this.book);
        this.$router.push('/list');
      }
    },
    data() {
      return {book: {}};
    },
    components: {
      MHeader
    },
    watch:{
      $route(){// 只要路径变化 重新获取数据
        this.getData();
      }
    }
  }
</script>

<style scoped lang="less">
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;
  }
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
</style>
