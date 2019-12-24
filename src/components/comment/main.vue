<template>
  <div class="comment">
    <div class="nav flex">
      <div class="back" @click="backHandler">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="text-center flex-auto">评论({{total}})</div>
      <div class="right flex">
        <span class="iconfont icon-fenxiang1"></span>
        <span class="iconfont icon-paixing"></span>
      </div>
    </div>
    <div class="container">
      <div class="title">精彩评论</div>
      <div class="flex list-item" v-for="(item, index) in hotList" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt class="userpic" />
        </div>
        <div class="right flex-auto">
          <div class="flex top flex-between">
            <div>
              <p class="nickname">{{item.user.nickname}}</p>
              <p class="time">{{item.time | filterTime}}</p>
            </div>
            <div class="zan">{{item.likedCount}}</div>
          </div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation, Getter } from "vuex-class";
import { Bus } from "@/utils/bus";
import { Route } from "vue-router";
import api from "store/comment/api/index";
import moment from "moment";

@Component({
  filters: {
    filterTime(value: any) {
      return moment(value).format('YYYY-MM-DD');
    }
  }
})
export default class Comment extends Vue {
  private total: number = 0;
  private hotList = [];
  mounted() {
    this.searchComment();
  }
  async searchComment() {
    let id = this.$route.query.id;
    let res = await api.MusicComment(id as string, 20);
    console.log(res);
    if (res.code === 200) {
      this.total = res.total;
      this.hotList = res.hotComments;
    }
  }
  backHandler() {
    this.$router.go(-1);
  }
}
</script>

<style lang="less">
.comment {
  .nav {
    padding-top: 2vw;
    padding-bottom: 2vw;
    .back {
      width: 13vw;
    }
    .right {
      width: 15vw;
    }
    .iconfont {
      font-size: 1.5rem;
    }
  }
  .container {
    border-top: 20px solid #f8f8f8;
    .title {
      padding: 5vw;
    }
    .list-item {
      padding-left: 5vw;
      padding-right: 5vw;
      .left {
        margin-right: 4vw;
        img {
          width: 11vw;
          border-radius: 50%;
        }
      }
      .right {
        .nickname {
          color: #888;
        }
        .time {
          color: #b2b2b2;
          font-size: .8rem;
        }
        .zan {
          color: #a4a4a4;
        }
        .content {
          padding-bottom: 5vw;
          margin-top: 5vw;
          margin-bottom: 5vw;
          border-bottom: 1px solid #e6e6e6;
        }
      }
    }
  }
}
</style>
