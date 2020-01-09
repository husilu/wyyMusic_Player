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
      <div class="big-box">
        <div v-if="!showLyric" class="cd-box">
          <div class="relative wrap">
            <div class="arrow"></div>
            <div class="relative container">
              <div :class="bfstate?'active':'stop'" class="cd" @click="showLyric = true">
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
          </div>
        </div>
        <div v-else @click="showLyric = false" class="lyric-wrap">
          <Lyric-page :id='id'></Lyric-page>
        </div>
      </div>
      <div class="progress-wrap flex align-center">
        <span>{{format(currentTime)}}</span>
        <div class="progress-bar flex" ref="progressBar" @click="progressClick">
          <span class="bar" ref="bar"></span>
          <span
            class="progress-code"
            ref="progressCode"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend.prevent="progressTouchEnd"
          ></span>
        </div>
        <span>{{format(EndTime)}}</span>
      </div>
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
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, Getter } from "vuex-class";
import { SongModule } from "@/store/modules/song";
import { SongListModule } from "@/store/modules/song-list";
import { Bus } from "@/utils/bus";
import { Route } from "vue-router";
import LyricPage from "./lyric-page";
import api from "store/song/api/index";
@Component({
  components: {
    LyricPage
  }
})
export default class Song extends Vue {
  private id: string = "";
  private defaultimg: boolean = true;
  private touch;
  private showLyric: boolean = false;
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
  get currentTime() {
    return SongModule.currentTime;
  }
  get EndTime() {
    const codeWidth = 16;
    this.$nextTick(() => {
      const barwrapWidth = this.$refs.progressBar.clientWidth - codeWidth;
      const offsetWidth = (this.currentTime / this.EndTime) * barwrapWidth;
      this._offest(offsetWidth);
    });
    return SongModule.EndTime;
  }
  created() {
    this.touch = {};
    this.id = this.$route.query.id as string;
    // SongModule.getSongPercent(); // 获取歌曲进度到哪里了
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
    } else {
      this.$toast('暂无版权 无法播放 >.<');
      SongModule.getUrl('')
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
  progressTouchStart(e) {
    this.touch.initiated = true;
    this.touch.startX = e.touches[0].pageX;
    this.touch.left = this.$refs.bar.clientWidth;
  }
  progressTouchMove(e) {
    if (!this.touch.initiated) {
      return;
    }
    const deltaX = e.touches[0].pageX - this.touch.startX;
    const offsetWidth = Math.min(
      this.$refs.progressBar.clientWidth - 16,
      Math.max(0, this.touch.left + deltaX)
    );
    this._offest(offsetWidth);
  }
  progressTouchEnd(e) {
    this.touch.initiated = false;
    this._triggerPersent();
  }
  _offest(offsetWidth) {
    // 设置偏移量
    this.$refs.bar.style.width = `${offsetWidth}px`;
    this.$refs.progressCode.style.left = `${offsetWidth}px`;
  }
  showListHandler() {}
  progressClick(e) {
    this._offest(e.offsetX);
    this._triggerPersent();
  }
  _triggerPersent() {
    // 设置歌曲播放进度
    const codeWidth = 16;
    const barwrapWidth = this.$refs.progressBar.clientWidth - codeWidth;
    const percent = this.$refs.bar.clientWidth / barwrapWidth;
    Bus.$emit("barChange", percent);
  }

  @Watch("$route")
  async onRouteChange(route: Route) {
    this.id = this.$route.query.id as string;
    this.searchUrl();
  }

  @Watch("currentTime")
  async oncurrentTimeChange(val) {
    if (!this.touch.initiated) {
      const codeWidth = 16;
      const barwrapWidth = this.$refs.progressBar.clientWidth - codeWidth;
      const offsetWidth = (this.currentTime / this.EndTime) * barwrapWidth;
      this._offest(offsetWidth);
    }
  }

  format(interval) {
    // console.log(interval)
    interval = interval | 0; // 向下取整 相当于 Math.floor
    const minute = (interval / 60) | 0;
    const second = this._pad(interval % 60);
    return `${minute}:${second}`;
  }
  _pad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
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
  .cd-box,
  .lyric-wrap {
    position: absolute;
    top: 0;
    height: 100%;
  }
  .big-box {
    position: relative;
    height: 73vh;
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
    margin: 0 auto;
    margin-bottom: 4vh;
    height: 3vh;
    width: 90%;
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
  .progress-bar {
    width: 80vw;
    height: 2px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    position: relative;
    margin-left: 2vw;
    margin-right: 2vw;
  }
  .bar {
    height: 2px;
    background-color: #000;
  }
  .progress-code {
    width: 16px;
    height: 16px;
    background-color: #000;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: -7px;
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
