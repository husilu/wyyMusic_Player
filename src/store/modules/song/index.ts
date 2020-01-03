import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import Vuex from 'vuex';
import api from './api'
import _ from 'lodash';
import router from '@/routes';
import { Bus } from "@/utils/bus";

export interface ISongState {
  id: string,
  url: string,
  idList: string[],
  info: {
    name: string,
    al: {
      picUrl: string
    }
  },
  playstate: Boolean,
  currentTime: number,
  EndTime: number,
}

@Module({ dynamic: true, store, name: 'song' })
class ISongstate extends VuexModule implements ISongState {
  public url: string = '';
  public idList: string[] = [];
  public id: string = '';
  public info = {
    name: '',
    al: {
      picUrl: ''
    }
  }
  public al = {
    picUrl: ''
  }
  public singername: string = ''
  public playstate: Boolean = false
  public currentTime: number = 0
  public EndTime:number = 0
  public songPercent:number = 0
  public lyricIndex:number = 0;
  @Mutation
  getUrl(url: string) {
    this.url = url;
  }
  @Mutation
  getId(id: string) {
    this.id = id;
  }

  @Mutation
  getCurrentTime(time:number) {
    // console.log(time)
    this.currentTime = time;
    this.songPercent = this.currentTime / this.EndTime;
  }

  @Mutation
  getEndtime(time:number) {
    this.EndTime = time;
  }

  @Mutation
  getlyricIndex(index:any) {
    this.lyricIndex = index;
  }

  @Mutation
  preUrl(id: string) {
    let idList = _.map(this.idList, (item: any) => {
      return item.id;
    });
    let index = _.indexOf(idList, id);
    index--;
    router.replace({ path: "/song", query: { id: idList[index] } });
  }
  @Mutation
  nextUrl(id: string) {
    let idList = _.map(this.idList, (item: any) => {
      return item.id;
    });
    let index = _.indexOf(idList, id);
    index++;
    router.replace({ path: "/song", query: { id: idList[index] } });
  }

  @Mutation
  getSongList(list: any[]) {
    this.idList = list;
  }

  @Mutation
  getSongDetail(info: any) {
    this.singername = info.ar[0].name
    this.info = info;
  }

  @Mutation
  CHANGE_BF_STATE(state: boolean) {
    this.playstate = state;
  }

  @Action({ commit: 'CHANGE_BF_STATE' })
  async changebfway() {}

  @Action({ commit: 'getUrl' })
  async searchUrl(id: string) {
    let res = await api.song(id)
    return res.data[0].url;
  }
  @Action({ commit: 'getSongList' })
  async SongList(list: any[]) {
    return list;
  }
  @Action({ commit: 'getSongDetail' })
  async SongDetail(id: string) {
    let res = await api.songdetail(id)
    return res.songs[0];
  }
}

export const SongModule = getModule(ISongstate);
