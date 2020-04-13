<template>
  <div class="wd">
    <div class="nav flex">
      <div class="flex-auto text-center">我的音乐</div>
    </div>
    <div class="menu-list">
      <div class="flex align-center">
        <span class="iconfont icon-diantaizhibo"></span>
        <span class="bd">我的电台</span>
      </div>
      <div class="flex align-center">
        <span class="iconfont icon-favorite"></span>
        <span>我的收藏</span>
      </div>
    </div>
    <div class="gedan-list-wrap px1">
      <div class="list-title py1">
        <span></span>
        <span>我创建的歌单</span>
      </div>
      <div class="create-gedanlist">
        <div class="flex mb1" v-for="(item, index) in creatorList" :key="index">
          <img :src="item.coverImgUrl" alt class="cdimg mr1" />
          <div class="info flex-auto">
            <p class="gd-name">{{item.name}}</p>
            <p class="count">{{item.trackCount}}首</p>
          </div>
        </div>
      </div>
      <div class="list-title py1">
        <span></span>
        <span>我收藏的歌单</span>
      </div>
      <div class="collect-gedanlist">
        <div class="flex mb1" v-for="(item, index) in collectList" :key="index">
          <img :src="item.coverImgUrl" alt class="cdimg mr1" />
          <div class="flex-auto info">
            <p class="gd-name">{{item.name}}</p>
            <p class="count">
              <span>{{item.trackCount}}首 </span>
              <span>by {{item.creator.nickname}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import api from "store/wd/api/index";
import { UserModule } from "@/store/modules/login";

Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);
@Component
export default class Wd extends Vue {
  creatorList = [];
  collectList = [];
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next((vm: Vue) => {
      if (!localStorage.getItem("userName")) {
        vm.$router.replace({ path: "/login" });
      }
    });
  }
  created() {
    if (localStorage.getItem("userName")) {
      this.getUserPlayList();
    }
  }
  async getUserPlayList() {
    let res = await api.userplayList(UserModule.userid);
    this.creatorList = res.playlist.filter((item:any) => {
      if (item.creator.defaultAvatar) {
        return item;
      }
    });
    this.collectList = res.playlist.filter((item: any) => {
      if (!item.creator.defaultAvatar) {
        return item;
      }
    });
  }
}
</script>
<style lang="less">
.wd {
  .nav {
    padding-top: 2vw;
    padding-bottom: 2vw;
    .back {
      width: 13vw;
    }
    .iconfont {
      font-size: 1.5rem;
    }
  }
  .cdimg {
    border-radius: 5px;
    width: 10vw;
    height: 10vw;
  }
  .menu-list {
    div {
      padding-top: 2vw;
      padding-bottom: 2vw;
      .iconfont {
        font-size: 1.5rem;
        width: 20vw;
        text-align: center;
      }
    }
  }
  .gedan-list-wrap {
    border-top: 2vh solid #f8f8f8;
  }
  .gd-name {
    font-size: 1rem;
    color: #1d1d1d;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .count {
    color: #909090;
    font-size: 0.8rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .info {
    width: 80vw;
  }
}
</style>
