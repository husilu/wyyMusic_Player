<template>
  <div class="search-list-page">
    <div class="nav">
      <div class='active'>单曲</div>
    </div>
    <div class='container'>
      <div v-for="(item, index) in list" :key="index" class="list-item" @click='toSong(item.id)'>
        <div class="flex">
          <div class='song-item'>
            <p class="song-name">{{item.name}}</p>
            <p class="singer">
              <span>{{item.artists.name}}</span>
              <span>{{item.album.name}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import api from "store/discover-page/api";
import { SongModule } from "@/store/modules/song";
@Component
export default class searchList extends Vue {
  private list: any = [];
  @Prop() private keyword!: string; // ! 表示确定msg有值
  async mounted() {
    let { keywords } = this.$route.query;
    let res = await api.searchkey(keywords as string);
    if (res.code === 200) {
      this.list = res.result.songs;
    }
  }
  toSong(id:string) {
    this.$router.push({ path: "/song", query: { id: id } });
  }
}
</script>

<style lang='less'>
.search-list-page {
  .container {
    padding:2vw
  }
  .singer {
    color: #7e7e7e;
    font-size: 0.7vw;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-item {
    width: 100%;
  }
  .song-name {
    font-size: 1rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-item {
    border-bottom: 1px solid #e9e9e9;
    padding-top: 2vw;
    padding-bottom: 2vw;
  }
  .nav {
    border-bottom: 1px solid #f6f6f6;
    div {
      padding: 2vw;
    }
    &.active {
      border-bottom: 1px solid #ff3a38;
    }
  }
}
</style>
