<template>
  <div class="dashboard">
    <Top-nav @toSearch="toSearch" @toDiscover="toDiscover" @totoSearch="totoSearch" :page="page" @toSearchPage='toSearchPage'></Top-nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNav from "common/top-nav.vue"; // @ is an alias to /src
import Discover from "@/components/discover-page/discover/main.vue";
import Search from "@/components/discover-page/search/main.vue";
import SearchList from "@/components/discover-page/search/searchlist.vue";

@Component({
  components: {
    TopNav,
    Discover,
    Search,
    SearchList
  }
})
export default class Dashboard extends Vue {
  page = "Discover";
  searchVal = "";
  keyword = "";
  toSearch() {
    if (this.page === "Discover") {
      this.page = "Search";
    }
  }
  toSearchPage() {
    this.$router.push({ path: "/discover/search" });
  }
  toDiscover() {
    this.page = "Discover";
  }
  totoSearch(val: string) {
    this.page = "toSearch";
    this.searchVal = val;
  }
  toSearchList(keyword:string) {
    this.page = "SearchList";
    this.keyword = keyword;
  }
}
</script>

<style lang="less">
.dashboard {
}
</style>
