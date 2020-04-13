<template>
  <div id="app">
    <router-view></router-view>
    <audio
      :src="url"
      ref="video"
      @ended="end"
      @timeupdate="updateTime"
      @loadedmetadata="loadedmetadata"
    />
  </div>
</template>
<script lang="ts">
import { State, Action, Mutation, Getter } from "vuex-class";
import { SongModule } from "@/store/modules/song";
import { Bus } from "@/utils/bus";
import { Component, Vue, Watch } from "vue-property-decorator";

// import Home from "@/components/home/main.vue"; // @ is an alias to /src

@Component({
  // components: {
  //   Home
  // },
  data() {
    return {
      name: "App"
    };
  }
})
export default class App extends Vue {
  private routeName = "";
  get url() {
    return SongModule.url;
  }
  get urlList() {
    return SongModule.urlList;
  }
  get id() {
    return SongModule.id;
  }
  get EndTime() {
    return SongModule.EndTime;
  }
  get playstate() {
    return SongModule.playstate;
  }
  get lyricObj() {
    return SongModule.lyricObj;
  }
  end() {
    SongModule.nextUrl(this.id);
  }
  updateTime(e: any) {
    SongModule.getCurrentTime(e.target.currentTime);
  }
  loadedmetadata(e: any) {
    SongModule.getEndtime(e.target.duration);
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
    Bus.$on("barChange", (percent:number) => {
      (this.$refs.video as any).currentTime = this.EndTime * percent;
      if (!this.playstate) {
        (this.$refs.video as any).play();
        SongModule.CHANGE_BF_STATE(true);
      }
    });
  }
}
</script>
<style lang="less">
#app {
  width: 100vw;
  overflow-x: hidden;
  .container {
    width: 100vw;
    overflow: hidden;
  }
  .container.hasMenu {
    height: 90vh;
    overflow-y: auto;
    margin-bottom: 10vh;
  }
}
</style>
