<template>
  <div class="discover-page-recommend px1 pt1">
    <div class="flex flex-between mb1">
      <span>推荐歌单</span>
      <span class="gdgc" @click='togedanSquare'>歌单广场</span>
    </div>
    <div class="flex music-card-list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="music-card mb1"
        @click="toSongList(item.id)"
      >
        <img :src="item.picUrl" alt width="100%" />
        <p class="twoLinesEllipsis music-name">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import api from "store/discover-page/api/index";
@Component({})
export default class DiscoverBanner extends Vue {
  list = [];
  mounted() {
    this.search();
  }
  search() {
    api.personalized().then((res: any) => {
      this.list = res.result;
    });
  }
  toUrl() {}
  toSongList(sid: any) {
    this.$router.push({ path: "/song-list", query: { id: sid } });
  }
  togedanSquare() {
    this.$router.push({ path: "/gdsquare" });
  }
}
</script>

<style lang='less'>
.discover-page-recommend {
  margin-top: 0.8rem;
  border-top: 1px solid #ecebea;
  .music-card-list {
    flex-wrap: wrap;
    .music-card {
      width: 27.2vw;
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
  span {
    font-size: 1rem;
  }
  .gdgc {
    font-size: 0.6rem;
    color: #5d5d5e;
    border: 1px solid #e6e6e6;
    padding: 0.2rem 0.5rem;
    border-radius: 20px;
  }
}
</style>
