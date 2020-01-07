<template>
<div class="discover-page-search">
  <div class="px1 recommend-list" v-if='!val'>
    <div class="search-history mt1">
      <div class="flex flex-between">
        <span>搜索历史</span>
        <span>删除</span>
      </div>
      <div class="trash-wrap flex">
        <div class="px1 py1 history-item" v-for="(item, index) in history" :key="index">{{item}}</div>
      </div>
    </div>
    <p class="my1">热搜榜</p>
    <div class="list-wrap">
      <div class="flex align-center mb1" v-for="(item, index) in hotList" :key="index" @click='showSong(item.searchWord)'>
        <div class="number mr1" :class="{top: index <=2 ? true : false}">{{index + 1}}</div>
        <div class="song-item">
          <p class="flex mmb1">
            <span class="mr1 fs1" :class="{topname: index <=2 ? true : false}">{{item.searchWord}}</span>
            <span class="mr1">{{item.score}}</span>
            <!-- <img :src="item.iconUrl" alt width="10%" v-if="item.iconUrl" /> -->
          </p>
          <p class="content">{{item.content}}</p>
        </div>
      </div>
    </div>
    </div>
      <div class="discover-page-search-tosearch">
        <p class="py1 result ml1">搜索: {{val}}</p>
        <div class="example-list">
          <div
            class="list-item flex"
            v-for="(item, index) in list"
            :key="index"
            @click="showSong(item.keyword)"
          >
          <span class='iconfont icon-iconfonticonfontsousuo1'></span>
          <div class='song-name flex-auto'>{{item.keyword}}</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "store/discover-page/api";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Bus } from "@/utils/bus";
import { SearchModule } from "@/store/modules/search";

@Component({
  data() {
    return {
      name: "discover-page-search"
    };
  }
})
export default class Search extends Vue {
  hotList = [];
  list = [];
  searchHot() {
    api.searchHot().then((res: any) => {
      this.hotList = res.data;
    });
  }
  get val() {
    return SearchModule.value;
  }
  @Watch('val')
  private async valchangeHandler(value:string) {
    if (value) {
      let res = await api.searchSuggest(value);
      if (res.code === 200) {
        this.list = res.result.allMatch;
      }
    }
  }
  created() {
    this.searchHot();
  }
  showSong(keywords:string) {
    this.$router.push({ path: "/discover/searchList", query: { keywords: keywords } });
  }
  get history() {
    return localStorage.getItem("searh-history");
  }
}
</script>

<style lang='less'>
.discover-page-search {
  .top {
    color: #ea3f2d;
    font-size: 16px;
  }
  .content {
    color: #626263;
  }
  .mmb1 {
    margin-bottom: 0.5rem;
  }
  .history-item {
    background-color: #f7f7f7;
    border-radius: 20px;
  }
  .fs1 {
    font-size: 20px;
  }
  .topname {
    font-weight: bold;
  }
  .result {
    padding: 2vw;
    color: #536c81;
    font-size: 1rem;
    border-bottom: 1px solid #e8e8e8;
  }
  .list-item {
    width: 100%;
    align-items: center;
    span {
      width: 10%;
      text-align: center;
      color: #b1b1b1;
    }
    .song-name {
      padding: 2vw;
      border-bottom: 1px solid #e8e8e8;
      font-size: .8rem;
    }
  }
}
</style>
