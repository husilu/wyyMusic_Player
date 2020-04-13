<template>
  <div class="lyric-page">
    <div
      class="lyric-item"
      v-for="(item, index) in lyric"
      :key="index"
      :class="lyricIndex === index ?'active':''"
    >{{item ? item.text : ''}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { SongModule } from "@/store/modules/song";
import api from "store/song/api/index";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);
// 歌词解析
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
function parseLyric(lrc : string) {
  const lines = lrc.split("\n");
  const lyric = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const result = timeExp.exec(line);
    if (!result) {
      continue;
    }
    const text = line.replace(timeExp, "").trim();
    if (text) {
      lyric.push({
        time: ((result as any[1]) * 6e4 + (result as any[2]) * 1e3 + (result as any[3] || 0) * 1) / 1e3,
        text
      });
    }
  }
  return lyric;
}
@Component
export default class LyricPage extends Vue {
  private lyric: any = {};
  private lyricIndex = 0;
  get currentTime() {
    return SongModule.currentTime;
  }
  get playstate() {
    return SongModule.playstate;
  }
  get slyricIndex() {
    return SongModule.lyricIndex;
  }
  @Prop() private id!: string; // ! 表示确定msg有值
  created() {
    this.searchLyric();
  }
  searchLyric() {
    this.lyricIndex = this.slyricIndex ? this.slyricIndex : 0;
    api.lyric(this.id).then(res => {
      this.lyric = parseLyric(res.lrc.lyric);
    });
  }
  @Watch("currentTime")
  async onCurrentTime(newTime: any) {
    let lyricIndex = 0;
    for (let i = 0; i < this.lyric.length; i++) {
      if (newTime > this.lyric[i].time) {
        lyricIndex = i;
      }
    }
    this.lyricIndex = lyricIndex;
    SongModule.getlyricIndex(lyricIndex)
  }

  @Watch("$route")
  async onRouteChange(newroute: Route, oldroute: Route) {
    if (newroute.query.id !== oldroute.query.id) {
      this.searchLyric();
    }
  }

  // 如何在该页面验证，再次进入是同一首歌的话歌词显示要同步
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
