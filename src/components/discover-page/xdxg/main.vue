<template>
  <div class="xdxg px1 pt1">
    <div class="flex flex-between mb1">
      <span>新碟</span>
      <span class="gdgc">更多新碟</span>
    </div>
    <div class="container">
      <div class="flex music-card-list">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="music-card mb1"
          @click="getZJ(item.id)"
        >
          <img :src="item.picUrl" alt width="100%" />
          <p class="twoLinesEllipsis music-name">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "store/discover-page/api/index";
@Component
export default class Xdxg extends Vue {
  private list = [];
  async mounted() {
    let res = await api.newestAlbum();
    if (res.code === 200) {
      this.list = res.albums.slice(0, 3);
    }
  }
  getZJ(id: string) {
    this.$router.push({ path: "/zjdetail", query: { id: id } });
  }
}
</script>
<style lang="less">
.xdxg {
  margin-top: 0.8rem;
  border-top: 1px solid #ecebea;
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
  .music-card-list {
    flex-wrap: wrap;
    .music-card {
      width: 28.333%;
      img {
        border-radius: 5px;
      }
      margin-right: 0.9rem;
    }
    .music-name {
      margin-top: 0.2rem;
      font-size: 0.23rem;
      color: #333;
    }
    .music-card:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
