<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link v-for="(book,index) in books" v-bind:key="index" :to="{name:'detail', params:{bid:book.bookId}}">
          <img v-lazy="book.bookCover"/>
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <div class="btn-list">
              <button @click.stop="remove(book.bookId)">删除</button>
              <button @click.stop="">添加</button>
            </div>
          </div>
        </router-link>
      </ul>
      <div @click="more" class="more">加载更多</div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import MHeader from '../base/MHeader.vue';
  import {getBook, removeBook, pagination} from '../api';

  export default {
    name: "List",
    components: {
      MHeader
    },
    created() {
      this.getData();
    },
    data() {
      return {books: [], offset: 0, hasMore: true, isLoading: false}
    },
    mounted() {
      let scroll = this.$refs.scroll;
      let top = scroll.offsetTop;
      console.log('top=' + top);
      let distance = 0;
      let ismove = false;
      scroll.addEventListener('touchstart', (e) => {
        //滚动条在最顶端时 并且当前盒子在最顶端的时候 才继续走
        console.log('scrollTop=' + scroll.scrollTop);
        console.log('offsetTop=' + scroll.offsetTop);
        if (scroll.scrollTop != 0 && scroll.offsetTop != top) return;
        let start = e.touches[0].pageY;//手指点击的开始
        console.log("start=" + start);
        let move = (e) => {
          ismove = true;
          let current = e.touches[0].pageY;
          distance = current - start;
          if (distance > 0) {//求的拉动距离，为负就不要了
            if (distance <= 50) {
              scroll.style.top = distance + top + 'px';
            } else {
              distance = 50;
              scroll.style.top = top + 50 + 'px';
            }
          } else {
            //如果不在考虑范围内 移除move和end事件
            scroll.removeEventListener('touchmove', move);
            scroll.removeEventListener('touchend', end);
          }

        };
        let end = (e) => {
          if (!move) return;
          move = false;
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            if (distance >= 0) {
              scroll.style.top -= 1;
              distance--;
            } else {
              clearTimeout(this.timer);
              distance = 0;
              scroll.style.top = top + 'px';
              scroll.removeEventListener('touchmove', move);
              scroll.removeEventListener('touchend', end);
              this.books = [];//先清空数据
              this.getData();
              return;
            }
          }, 1);
        };
        scroll.addEventListener('touchmove', move);
        scroll.addEventListener('touchend', end);
      }, false);


    },
    methods: {
      async getData() {
        // this.books = await getBook();
        if (this.hasMore && !this.isLoading) {//有更多的时候获取数据
          this.isLoading = false;
          let {hasMore, books} = await pagination(this.offset);
          this.books = [...this.books, ...books];
          this.hasMore = hasMore;
          this.offset = this.books.length;//维护偏移量 就是总数的长度
        }
      },
      async remove(id) {
        await removeBook(id);
        this.books = this.books.filter(item => item.bookId !== id);
      },
      more() {
        this.getData();
      },
      loadMore() {
        clearTimeout(this.timer);//防抖动
        //卷去的高度 当前可见区域高度 总高
        //触发scroll事件 可能触发n次 先进来开一个定时器 下一次触发时将上一次定时器清除掉
        this.timer = setTimeout(() => {
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          if (scrollTop + clientHeight + 20 > scrollHeight) {
            this.getData();
          }

        }, 60);


      }
    }

  }
</script>

<style scoped>
  .content ul {
    padding: 10px;
  }

  .content ul li {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
  }

  .content ul li img {
    width: 130px;
    height: 150px;
  }

  .content h3 {
    font-size: 20px;
    line-height: 25px;
  }

  .content p {
    color: #2a2a2a;
    line-height: 25px;
  }

  .content b {
    color: red;
  }

  .content button {
    display: block;
    width: 60px;
    height: 35px;
    background: orangered;
    color: #fff;
    border: none;
    border-radius: 15px;
    outline: none;

  }

  .more {
    margin: 10px;
    background: #2afedd;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
  }

  .btn-list {
    display: flex;
    justify-content: center;
  }
</style>
