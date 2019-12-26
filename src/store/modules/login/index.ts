import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import Vuex from 'vuex';
import api from './api'
import _ from 'lodash';
import router from '@/routes';
import { Bus } from "@/utils/bus";
import Vue from 'vue';

export interface IUserState {
  token: string,
  userName: string,
  userid: string
}

@Module({ dynamic: true, store, name: 'login' })
class IUserstate extends VuexModule implements IUserState {
  public token: string = '';
  public userName: string = localStorage.getItem("userName") ? localStorage.getItem("userName") as string : ''
  public userid: string = localStorage.getItem("userid") ? localStorage.getItem("userid") as string : ''
  @Mutation
  getUserInfo(res: any) {
    // this.token = arg;
    console.log(res)
    this.token = res.token;
    this.userName = res.account.userName;
    this.userid = res.account.id;
    localStorage.setItem("userName", this.userName);
    localStorage.setItem("userid", this.userid);
  }

  @Action({ commit: 'getUserInfo' })
  async getUser(res: any) {
    return res;
  }
}

export const UserModule = getModule(IUserstate);
