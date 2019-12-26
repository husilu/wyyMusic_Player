<template>
  <div class="password-login">
    <div class="nav flex">
      <div class="back" @click="backHandler">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="flex-auto text-center title">手机号登录</div>
    </div>
    <div class="login-container px1">
      <div class="flex align-center input-wrap">
        <van-field v-model="pw" placeholder="输入密码" class="flex-auto" type="password" />
      </div>
      <div class="next-btn" @click="loginHandler">立即登录</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "store/login/api/index";
import { UserModule } from "@/store/modules/login";

@Component
export default class PasswordLogin extends Vue {
  private tel: string = "";
  private pw = "";
  mounted() {
    this.tel = this.$route.query.tel as string;
  }
  backHandler() {
    this.$router.go(-1);
  }
  async loginHandler() {
    api
      .Login(this.tel, this.pw)
      .then(res => {
        UserModule.getUser(res);
        this.$router.push({ path: "/" });
      })
      .catch(error => {
        this.$toast("用户名或密码错误");
      });
  }
}
</script>
<style lang="less">
.password-login {
  .nav {
    padding-top: 2vw;
    padding-bottom: 2vw;
    .back {
      width: 13vw;
    }
    .iconfont {
      font-size: 1.5rem;
    }
    .title {
      margin-left: -13vw;
    }
  }
  .next-btn {
    background-color: #ff5143;
    color: #fff;
    border-radius: 25px;
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .next-btn.inactive {
    opacity: 0.3;
  }
  .input-wrap {
    margin-top: 10vh;
    margin-bottom: 10vh;
    border-bottom: 1px solid #e5e5e5;
  }
  .mtgap {
    margin-top: 10vh;
    color: #cacaca;
    font-size: 0.8rem;
  }
}
</style>
