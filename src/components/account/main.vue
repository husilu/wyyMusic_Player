<template>
  <div class="account">
    <div class="nav flex flex-between">
      <span class="iconfont icon-shouqi1"></span>
      <span class="iconfont icon-paixing"></span>
    </div>
    <div class="content">
      <div class="account-container px1 py1">
        <div class="info-wrap flex flex-between">
          <div class="flex align-center">
            <img :src="profile.avatarUrl" alt class="userpic" />
            <div>
              <p>{{profile.nickname}}</p>
              <div></div>
            </div>
          </div>
        </div>
        <div class="data-wrap flex">
          <div class="flex-auto">
            <p>{{profile.eventCount}}</p>
            <p class="text">动态</p>
          </div>
          <div class="flex-auto">
            <p>{{profile.follows}}</p>
            <p class="text">关注</p>
          </div>
          <div class="flex-auto">
            <p>{{profile.followeds}}</p>
            <p class="text">粉丝</p>
          </div>
          <div class="flex-auto">
            <p></p>
            <p class="text">编辑资料</p>
          </div>
        </div>
      </div>
      <div class="logoff py1 text-center" @click='logout'>退出登录</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { UserModule } from "@/store/modules/login";
import api from "store/login/api/index";

Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);
@Component
export default class Account extends Vue {
  private profile = {};
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(vm => {
      if (!localStorage.getItem("userName")) {
        vm.$router.replace({ path: "/login" });
      }
    });
  }
  created() {
    if (localStorage.getItem("userName")) {
      this.getUserDetial();
    }
  }
  async getUserDetial() {
    let res = await api.userDetail(UserModule.userid);
    this.profile = res.profile;
    console.log(res);
  }
  logout() {
    // api.logout();
    localStorage.setItem("userName", "");
    localStorage.setItem("userid", "");
    this.$toast('退出成功');
    this.$router.go(-1);
  }
}
</script>
<style lang="less">
.account {
  overflow-y: auto;
  .content {
    position: relative;
    margin-top: 5vh;
    min-height: 90vh;
  }
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    padding-bottom: 1vh;
    padding-top: 1vh;
    .iconfont {
      width: 13vw;
      text-align: center;
    }
  }
  .account-container {
  }
  .data-wrap {
    div {
      text-align: center;
      .text {
        color: #848485;
      }
    }
    div:not(:last-child) {
      border-right: 1px solid #e6e6e7;
    }
  }
  .userpic {
    border-radius: 50%;
    width: 18vw;
    height: 18vw;
    margin-right: 2vw;
  }
  .info-wrap {
    margin-bottom: 5vh;
  }
  .logoff {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    color: #fe2114;
    border-top: 2vh solid #f8f8f8;
  }
}
</style>
