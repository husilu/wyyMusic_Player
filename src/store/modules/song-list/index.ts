import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import Vuex from 'vuex';
import api from './api'
import _ from 'lodash';
import router from '@/routes';

export interface ISongListState {
  id: string
}

@Module({ dynamic: true, store, name: 'songlist' })
class ISongListstate extends VuexModule implements ISongListState {
  public id: string = ''; // 歌单id
  @Mutation
  GET_GD_ID(id: string) {
    this.id = id;
  }

  @Action({ commit: 'GET_GD_ID' })
  async getSongListId(id: string) {
    return id;
  }
}

export const SongListModule = getModule(ISongListstate);
