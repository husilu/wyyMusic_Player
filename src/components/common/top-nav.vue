<template>
  <div class="top-nav px1 py1">
    <div class="flex align-center">
      <span class="iconfont icon-fanhui" @click='backHandler' v-if='page=="search-list"'></span>
      <span class="iconfont icon-shouqi1" v-if='page=="discover-index"'></span>
      <div class="search-wrap flex-auto">
        <van-field
          v-model="value"
          left-icon="search"
          @focus="toSearch"
          :placeholder="searchDefault"
          @input='debounceInput'
          clearable
        />
      </div>
      <div :class='page!=="discover-index" && page!=="search-list" ? "long" : "short"'>
        <span @click="toDiscover" v-if='page!=="discover-index" && page!=="search-list"' class='cancel-btn'>取消</span>
        <span class="iconfont icon-paixing" @click='playSongHandler'></span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "store/discover-page/api";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SongModule } from "@/store/modules/song";
import { SearchModule } from "@/store/modules/search";
import _ from 'lodash';

@Component
export default class TopNav extends Vue {
  value = this.storevalue ? this.storevalue : '';
  show = false;
  searchDefault = "";
  get id() {
    return SongModule.id;
  }
  get showoff() {
    return this.page !== "Discover" && this.page !== "SearchList";
  }
  get page() {
    return this.$route.name;
  }
  get storevalue() {
    return SearchModule.value;
  }
  @Watch("value")
  onChildChanged(val: string, oldVal: string) {
    if (val === "") {
      this.toSearch();
    }
  }
  toSearch() {
    if (!this.value && this.$route.name !== "search") {
      this.$router.push({ path: "/discover/search" });
    }
  }
  toDiscover() {
    this.value = '';
    SearchModule.getSearchValue(this.value);
    this.$router.push({ path: "/discover" });
  }
  getSearchDefault() {
    api.searchDefault().then((res: any) => {
      this.searchDefault = res.data.realkeyword;
    });
  }
  totoSearch() {
    SearchModule.getSearchValue(this.value)
  }
  created() {
    this.getSearchDefault();
    this.debounceInput = _.debounce( this.totoSearch, 500)
  }
  debounceInput() {

  }
  playSongHandler() {
    this.$router.push({ path: "/song", query: { id: this.id } });
  }
  backHandler() {
    this.value = "";
    SearchModule.getSearchValue(this.value);
    this.$emit("toSearchPage");
  }
}
</script>

<style lang="less">
.top-nav {
  padding-bottom: 1vh;
  padding-top: 1vh;
  position: fixed;
  top:0;
  width: 100vw;
  z-index:999;
  background-color: #fff;
  .icon-shouqi1 {
    margin-right: 2vw;
    text-align: center;
  }
  .search-wrap {
    border-radius: 20px;
    margin-right: 2vw;
    background-color: #f7f7f7;
    height: 40px;
    .van-cell {
      background-color: transparent;
    }
  }
  .user-center {
    width: 50vw;
  }
  .long {
    width: 24vw;
  }
  .short {
    width: 14vw;
  }
  .cancel-btn {
    font-size: 1rem;
    margin-right: 2vw;
  }
}
</style>
