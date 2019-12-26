<template>
  <div id="app">
    <router-view></router-view>
    <audio :src="url" ref="video" />
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
  private routeName = '';
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
}
</style>
