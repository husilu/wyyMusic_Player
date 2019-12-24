import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import Vuex from 'vuex';
import _ from 'lodash';
import router from '@/routes';

export interface ISearchState {
  value: string
}

@Module({ dynamic: true, store, name: 'search' })
class ISearchstate extends VuexModule implements ISearchState {
  public value: string = '';
  @Mutation
  getSearchValue(val: string) {
    this.value = val;
  }
}

export const SearchModule = getModule(ISearchstate);
