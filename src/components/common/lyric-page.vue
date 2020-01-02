<template>
  <div class="lyric-page">
    <div
      class="lyric-item"
      v-for="(item, index) in LrcArray.lines"
      :key="index"
      :class="currentLineNum === index ?'active':''"
    >{{item ? item.txt : ''}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { SongModule } from "@/store/modules/song";
import api from "store/song/api/index";
import Lyric from "lyric-parser";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);

@Component
export default class LyricPage extends Vue {
  private LrcArray = {};
  private currentLineNum = 0;
  get currentTime() {
    return SongModule.currentTime;
  }
  get playstate() {
    return SongModule.playstate;
  }
  @Prop() private id!: string; // ! 表示确定msg有值
  mounted() {}
  @Watch("id")
  async onIdChange(val, oldval) {
    if (val === oldval) {
      return;
    }
    api.lyric(this.id).then(res => {
      this.LrcArray = new Lyric(res.lrc.lyric, this.handleLyric);
      SongModule.getlyricObj(this.LrcArray);
    });
  }
  @Watch("playstate")
  async onPlaystateChange(val) {
    this.LrcArray && this.LrcArray.togglePlay();
  }

  /**
   * 创建歌词数组
   * 通过换行符分割字符串，形成数组，数组的每一项是一个对象，对象返回格式如下
   * {time：， word：}
   * @param {String} lrc 歌词字符串
   */
  createLrcArray(lrc) {
    const parts = lrc.split("\n");
    for (let index = 0; index < parts.length; index++) {
      const element = parts[index];
      parts[index] = this.changeToObject(element);
    }
    return parts;
  }
  /**
   * 根据一行歌词 转换为对象
   * @param {string} str 一行歌词
   */
  changeToObject(str) {
    const words = str.split("]")[1];
    // 这个正则返回时间信息
    const reg = /\w{0,}:\w{0,}.\w{0,}/g;
    let timeArray = reg.exec(str);
    if (!timeArray) {
      return;
    }
    timeArray = timeArray[0].split(":");
    const minute = parseInt(timeArray[0]); // 分钟数
    const second = parseFloat(timeArray[1]); // 秒数
    const time = minute * 60 + second;
    return {
      time,
      words
    };
  }
  handleLyric({ lineNum, txt }) {
    this.currentLineNum = lineNum;
  }
}
</script>
<style lang="less">
.lyric-page {
  height: 100%;
  width: 100vw;
  text-align: center;
  overflow: auto;
  .lyric-item {
    margin-bottom: 10px;
  }
  .active {
    color: red;
  }
}
</style>
