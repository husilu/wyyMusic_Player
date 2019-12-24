<template>
  <div class="top-nav px1">
    <div class="flex align-center flex-between">
      <span class="iconfont icon-fanhui" @click='backHandler' v-if='page=="search-list"'></span>
      <span class="iconfont icon-shouqi1" v-if='page=="discover-index"'></span>
      <div class="search-wrap">
        <van-field
          v-model="value"
          left-icon="search"
          @focus="toSearch"
          :placeholder="searchDefault"
          @input='totoSearch'
        />
      </div>
      <span @click="toDiscover" v-if='page!=="discover-index" && page!=="search-list"'>取消</span>
      <span class="iconfont icon-paixing" @click='playSongHandler'></span>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "store/discover-page/api";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SongModule } from "@/store/modules/song";
import { SearchModule } from "@/store/modules/search";

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
    SearchModule.getSearchValue(this.value);
  }
  mounted() {
    this.getSearchDefault();
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
  margin-top: 5px;
  margin-bottom: 10px;
  .search-wrap {
    width: 80%;
    border-radius: 20px;
    background-color: #f7f7f7;
    height: 40px;
    .van-cell {
      background-color: transparent;
    }
  }
  .user-center {
    width: 50vw;
  }
}
</style>
