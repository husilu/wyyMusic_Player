<template>
  <div class="gdsquare">
    <div class="nav flex align-center">
      <div class="back text-center" @click="backHandler">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="flex-auto text-center">歌单广场</div>
      <div class="more text-center" @click="moreHandler">
        <span class="iconfont icon-gengduo"></span>
      </div>
    </div>
    <div class="flex menu">
      <div class="flex-auto px1" v-for="(item, index) in catList" :key="index" :class='tab === item.name? "active" : ""' @click='changeTab(item)'>{{item.name}}</div>
    </div>
    <div class='sq-container px1 pt1'>
      <van-loading size="1.5rem"  color="#f73527" class='loading' vertical v-show='loading'>加载中...</van-loading>
     <div class="flex music-card-list" v-show='!loading'>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="music-card mb1"
        @click="toSongList(item.id)"
      >
        <img :src="item.coverImgUrl" alt width="100%" />
        <p class="twoLinesEllipsis music-name">{{item.name}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import api from "@/store/modules/gedanguangchang/api";
@Component
export default class Gedanguangchang extends Vue {
  private catList = [];
  private tab = '';
  private list = [];
  private loading = true;
  async created() {
    let res = await api.playlist();
    this.catList = res.sub.slice(0, 5);
    this.tab = (this.catList[0] as any).name;
  }
  backHandler() {
    this.$router.go(-1);
  }
  moreHandler() {}
  changeTab(item : any) {
    this.tab = item.name;
  }
  async getPlayList(cat:string) {
    let res = await api.topplaylist(cat);
    if (res.code === 200) {
      this.list = res.playlists
      this.loading = false;
    }
  }
  toSongList(sid: any) {
    this.$router.push({ path: "/song-list", query: { id: sid } });
  }
  @Watch('tab')
  private changeTabHandler(val: any) {
    this.loading = true;
    this.getPlayList(val)
  }
}
</script>
<style lang='less'>
.gdsquare {
  .nav {
    background-color: #fff;
    position: fixed;
    top:0;
    width: 100%;
    padding-top: 2vw;
    padding-bottom: 2vw;
    overflow-x:auto;
    .back {
      width: 13vw;
      .iconfont {
        font-size: 1.5rem;
      }
    }
    .more {
      width: 13vw;
      .iconfont {
        font-size: 1.5rem;
      }
    }
  }
  .sq-container {
    margin-top: 21vw;
    .music-card-list {
      flex-wrap: wrap;
      .music-card {
        width: 30.333%;
        img {
          border-radius: 5px;
        }
        margin-right: 0.9rem;
      }
      .music-name {
        margin-top: 0.2rem;
        font-size: 0.8rem;
        color: #333;
      }
      .music-card:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .menu {
    position: fixed;
    background-color: #fff;
    width: 100%;
    overflow-x:auto;
    top: 11vw;
    div {
      padding-top: 2vw;
      padding-bottom: 2vw;
      white-space:nowrap;
    }
    div.active {
      color: #f73527;
      border-bottom: 2px solid #f73527;
      font-weight: bold;
    }
  }
  .loading {
    text-align: center;
  }
}
</style>
