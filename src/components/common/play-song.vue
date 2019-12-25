<template>
  <div class="play-song" :style="{background:'url('+ info.al.picUrl +')'}">
    <div class="play-song-inner">
      <div class="flex align-center nav">
        <div class="back text-center" @click="back">
          <span class="iconfont icon-fanhui"></span>
        </div>
        <div class="text-center flex-auto">
          <p>{{info.name}}</p>
          <p>{{singername}}</p>
        </div>
        <div class="share text-center">
          <span class="iconfont icon-fenxiang1"></span>
        </div>
      </div>
      <div class="relative wrap">
        <div class="arrow"></div>
        <div class="relative container">
          <div :class="bfstate?'active':'stop'" class="cd">
            <div class="cd-wrap">
              <img
                src="https://s3.music.126.net/mobile-new/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188="
                alt
                v-if="defaultimg"
              />
              <img :src="info.al.picUrl" alt v-else />
            </div>
          </div>
        </div>
        <div class="usertool flex">
          <div class="flex-auto">
            <span class="iconfont icon-xihuan"></span>
          </div>
          <div class="flex-auto">
            <span class="iconfont icon-xiazai"></span>
          </div>
          <div class="flex-auto">
            <span class="iconfont icon-mianraomoshi"></span>
          </div>
          <div class="flex-auto" @click="toPl">
            <span class="iconfont icon-pinglun"></span>
          </div>
          <div class="flex-auto">
            <span class="iconfont icon-gengduo"></span>
          </div>
        </div>
        <div class="progress-wrap"></div>
        <div class="tool flex align-center">
          <div class="flex-auto">模式</div>
          <div class="flex-auto" @click="preHandler">
            <span class="iconfont icon-48shangyishou"></span>
          </div>
          <div class="flex-auto" @click="pauseHandler" v-if="bfstate">
            <span class="iconfont icon-zanting"></span>
          </div>
          <div class="flex-auto" @click="playHandler" v-else>
            <span class="iconfont icon-bofang"></span>
          </div>
          <div class="flex-auto" @click="nextHandler">
            <span class="iconfont icon-xiayigexiayishou"></span>
          </div>
          <div class="flex-auto" @click="showListHandler">
            <span class="iconfont icon-liebiao1"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, Getter } from "vuex-class";
import { SongModule } from "@/store/modules/song";
import { SongListModule } from "@/store/modules/song-list";
import { Bus } from "@/utils/bus";
import { Route } from "vue-router";
@Component
export default class Song extends Vue {
  private id: string = "";
  private defaultimg: boolean = true;
  get info() {
    return SongModule.info;
  }
  get singername() {
    return SongModule.singername;
  }
  get gedanid() {
    return SongListModule.id;
  }
  get bfstate() {
    return SongModule.playstate;
  }
  get sid() {
    return SongModule.id;
  }
  mounted() {
    this.id = this.$route.query.id as string;
    if (this.id !== this.sid) {
      this.defaultimg = true;
      this.searchUrl();
    } else {
      this.defaultimg = false;
    }
  }
  async searchUrl() {
    let res = await SongModule.searchUrl(this.id);
    await SongModule.SongDetail(this.id);
    SongModule.getId(this.id);
    if (res) {
      Bus.$emit("playsong");
      this.defaultimg = false;
    }
  }
  back() {
    // this.$router.push({ path: "/song-list", query: { id: this.gedanid } });
    this.$router.go(-1);
  }
  preHandler() {
    SongModule.preUrl(this.id);
    this.defaultimg = true;
  }
  nextHandler() {
    SongModule.nextUrl(this.id);
    this.defaultimg = true;
  }
  pauseHandler() {
    Bus.$emit("stopsong");
  }
  playHandler() {
    Bus.$emit("playsong");
  }
  toPl() {
    this.$router.push({
      path: "/comment",
      query: { id: this.$route.query.id, type: "dq" }
    });
  }
  showListHandler() {}
  @Watch("$route")
  async onRouteChange(route: Route) {
    this.id = this.$route.query.id as string;
    this.searchUrl();
  }
}
</script>
<style lang="less">
.play-song {
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .wrap {
    height: 100vh;
  }
  .back {
    width: 13vw;
  }
  .share {
    width: 13vw;
  }
  .container {
    height: 67vh;
  }
  .tool {
    div {
      text-align: center;
    }
    .iconfont {
      font-size: 1.5rem;
    }
    .icon-bofang,
    .icon-zanting {
      font-size: 3rem;
    }
  }
  .usertool {
    div {
      text-align: center;
    }
  }
  .progress-wrap {
    margin-bottom: 4vh;
    height: 3vh;
    width: 100%;
    margin-top: 4vh;
  }
  .cd {
    position: absolute;
    top: 15%;
    left: 9%;
    transform: translateX(-50%) translateY(-50%);
    background: url("http://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48")
      no-repeat;
    width: 82vw;
    height: 82vw;
    border-radius: 50%;
    background-size: 82vw 82vw;
    animation: rotate 10s linear infinite;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 65%;
      height: 65%;
      border-radius: 50%;
    }
  }
  .cd.stop {
    -webkit-animation-play-state: paused;
  }
  .nav {
    padding-top: 2vw;
    padding-bottom: 2vw;
    .back {
      width: 13vw;
      .iconfont {
        font-size: 1.5rem;
      }
    }
    .share {
      width: 13vw;
      .iconfont {
        font-size: 1.5rem;
      }
    }
  }
  .usertool {
    .iconfont {
      font-size: 1.5rem;
    }
  }
}
.play-song {
  background-size: cover;
  background-attachment: fixed;
}
.play-song-inner {
  background: hsla(20, 40%, 90%, 0.8) border-box;
  overflow: hidden;
}
.play-song-inner::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  -webkit-filter: blur(50px);
  filter: blur(50px);
}
</style>
