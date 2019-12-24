
import Vue from 'vue'
import Vuex from 'vuex'
import { ISongState } from './modules/song/index'
import { ISongListState } from './modules/song-list/index'
import { ISearchState } from './modules/search/index'

Vue.use(Vuex)

export interface IRootState {
  song:ISongState,
  songList: ISongListState,
  search: ISearchState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
