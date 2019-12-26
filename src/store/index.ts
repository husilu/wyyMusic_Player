
import Vue from 'vue'
import Vuex from 'vuex'
import { ISongState } from './modules/song/index'
import { ISongListState } from './modules/song-list/index'
import { ISearchState } from './modules/search/index'
import { IUserState } from './modules/login/index'

Vue.use(Vuex)

export interface IRootState {
  song:ISongState,
  songList: ISongListState,
  search: ISearchState,
  user: IUserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
