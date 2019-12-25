<template>
  <div id="app">
    <div class='container' :class='routeName!=="play-song"?"hasMenu":""'>
      <Home></Home>
    </div>
    <div class="bottom flex" v-if='routeName!=="play-song"'>
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
    <audio :src="url" ref="video" />
  </div>
</template>
<script lang="ts">
import { State, Action, Mutation, Getter } from "vuex-class";
import { SongModule } from "@/store/modules/song";
import { Bus } from "@/utils/bus";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import Home from "@/components/home/main.vue"; // @ is an alias to /src

@Component({
  components: {
    Home
  },
  data() {
    return {
      name: "App"
    };
  }
})
export default class App extends Vue {
  private routeName = '';
  private tab = 'fx';
  get url() {
    return SongModule.url;
  }
  get urlList() {
    return SongModule.urlList;
  }
  mounted() {
    Bus.$on("playsong", () => {
      this.$nextTick(() => {
        if (this.$refs.video) {
          (this.$refs.video as any).play();
          SongModule.CHANGE_BF_STATE(true);
        }
      });
    });
    Bus.$on("stopsong", () => {
      this.$refs.video && (this.$refs.video as any).pause();
      SongModule.CHANGE_BF_STATE(false);
    });
  }
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
<style lang="less">
#app {
  width: 100vw;
  overflow-x: hidden;
  video {
    display: none;
  }
  .container {
    width: 100vw;
    overflow: hidden;
  }
  .container.hasMenu {
    height: 90vh;
    overflow-y: auto;
  }
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
