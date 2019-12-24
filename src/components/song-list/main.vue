<template>
  <div class="song-list">
    <div class="nav flex align-center">
      <div class="back text-center" @click="backHandler">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="flex-auto text-center">歌单</div>
      <div class="more text-center" @click="moreHandler">
        <span class="iconfont icon-gengduo"></span>
      </div>
    </div>
    <div class="song-list-banner">
      <div class="flex">
        <div>
          <img :src="playlist.coverImgUrl" alt class="cover" />
        </div>
        <div>
          <p class="title">{{playlist.name}}</p>
          <div class="flex creator align-center">
            <img :src="creator.avatarUrl" alt class="avapic" />
            <p>{{creator.nickname}}</p>
          </div>
          <div>
            <p class="description">{{playlist.description}}</p>
          </div>
        </div>
      </div>
      <div class="tool-box flex">
        <div>
          <span class="iconfont icon-pinglun"></span>
          <p class="descount">{{commentCount}}</p>
        </div>
        <div>
          <span class="iconfont icon-fenxiang1"></span>
          <p class="descount">{{shareCount}}</p>
        </div>
        <div>
          <span class="iconfont icon-xiazai"></span>
          <p class="descount">下载</p>
        </div>
        <div>
          <span class="iconfont icon-duoxuan"></span>
          <p class="descount">多选</p>
        </div>
      </div>
    </div>
    <div class="song-list-container">
      <div class="flex player-tool align-center flex-between">
        <div>
          <span class="iconfont icon-bofang"></span>播放全部
        </div>
        <div class="collect">收藏</div>
      </div>
      <div class="list">
        <div
          class="flex align-center list-item"
          v-for="(item, index) in tracklist"
          :key="index"
          @click="toSong(item.id)"
        >
          <div class="order">{{index + 1}}</div>
          <div class="flex">
            <div>
              <p class="song-name">{{item.name}}</p>
              <p class="singer">{{item.ar[0].name}} - {{item.al.name}}</p>
            </div>
            <!-- <div>mv</div>
            <div>tool</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, Getter } from "vuex-class";
import { SongListModule } from "@/store/modules/song-list";
import { SongModule } from "@/store/modules/song";
import api from "@/store/modules/song-list/api";
@Component
export default class SongList extends Vue {
  private id: string | null = null;
  private playlist: any = {};
  private creator: any = {};
  private tracklist: any = {};
  private commentCount: number = 0;
  private shareCount: number = 0;
  mounted() {
    this.id = this.$route.query.id as string; // 歌单id
    this.searchList(this.id as string);
  }
  async searchList(id: string) {
    let res = (await api.songList(id)) as any;
    this.playlist = res.playlist;
    this.creator = res.playlist.creator;
    this.tracklist = res.playlist.tracks;
    this.commentCount = res.playlist.commentCount;
    this.shareCount = res.playlist.shareCount;
    await this.getSongList();
  }
  toSong(sid: string) {
    SongListModule.getSongListId(this.id as string);
    this.$router.push({ path: "/song", query: { id: sid } });
  }
  async getSongList() {
    SongModule.SongList(this.tracklist);
  }
  async backHandler() {
    this.$router.go(-1);
  }
  moreHandler() {}
}
</script>
<style lang="less">
.song-list {
  .avapic {
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    margin-right: 1vw;
  }
  .song-list-banner {
    padding: 4vw;
  }
  .cover {
    height: 37vw;
    width: 37vw;
    border-radius: 20px;
    margin-right: 4.6vw;
  }
  .title {
    font-size: 1rem;
    margin-bottom: 3vw;
  }
  .creator {
    margin-bottom: 3vw;
  }
  .description {
    font-size: 0.7rem;
    height: 8vw;
    // width: 41vw;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .song-list-container {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: 1px solid #000;
  }
  .order {
    width: 11vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d1d1d1;
    font-size: 1rem;
  }
  .singer {
    color: #7e7e7e;
    font-size: 0.7rem;
  }
  .list-item {
    margin-top: 6vw;
  }
  .song-name {
    font-size: 1rem;
  }
  .player-tool {
    font-size: 1rem;
    padding: 1vw 2vw;
    .collect {
      background-color: #fe1f13;
      color: #fff;
      width: 30vw;
      text-align: center;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
      font-size: 0.8rem;
    }
  }
  .tool-box {
    margin-top: 23px;
    .iconfont {
      font-size: 2rem;
    }
    div {
      flex: 1 1 auto;
      text-align: center;
    }
    .descount {
      font-size: 0.7rem;
    }
    .icon-fenxiang {
      font-size: 2rem;
    }
  }
  .nav {
    padding-top: 2vw;
    padding-bottom: 2vw;
    .back {
      width: 13vw;
      .iconfont{
        font-size: 1.5rem;
      }
    }
    .more {
      width: 13vw;
      .iconfont{
        font-size: 1.5rem;
      }
    }
  }
}
</style>
