<template>
  <div class='container hasMenu'>
    <div class='home'>
      <transition name="router-fade" mode="out-in">
        <router-view />
      </transition>
        <div class="bottom flex">
          <div class="flex-auto text-center" @click='toPage("fx")' :class='tab==="fx" ? "active" : ""'>
            <span class="iconfont icon-faxian"></span>
            <p>发现</p>
          </div>
          <div class="flex-auto text-center" @click='toPage("wd")' :class='tab==="wd" ? "active" : ""'>
            <span class="iconfont icon-iconfontyuleyinle" ></span>
            <p>我的</p>
          </div>
          <div class="flex-auto text-center" @click='toPage("zh")' :class='tab==="zh" ? "active" : ""'>
            <span class="iconfont icon-geren1"></span>
            <p>账号</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
@Component
export default class Home extends Vue {
  private routeName:string | undefined = '';
  private tab = 'fx';
  @Watch("$route")
  async onRouteChange(route: Route) {
    this.routeName = route.name;
  }
  toPage(way: any) {
    if (way === 'fx') {
      this.tab = 'fx'
      if (this.$route.name !== 'discover-index') {
        this.$router.push({ path: "/discover" });
      }
    } else if (way === 'wd') {
      this.tab = 'wd'
      this.$router.push({ path: "/wd" });
    } else if (way === 'zh') {
      this.tab = 'zh'
      this.$router.push({ path: "/account" });
    }
  }
}
</script>
<style lang='less'>
.home {
  .bottom {
    position: fixed;
    width: 100%;
    background-color: #f6f6f6;
    left: 0;
    bottom: 0;
    z-index: 999;
    height: 10vh;
    align-items: center;
    div.active {
      color: #ff231d;
    }
    .iconfont {
      font-size: 1.5rem;
    }
  }
}
</style>
