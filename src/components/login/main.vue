<template>
  <div class="login relative">
    <div class="login-btn" @click="loginHandler">手机号登录</div>
    <div class="ljty">立即体验</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  loginHandler() {
    this.$router.push({ path: "/mobile-login" });
  }
}
</script>
<style lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #db2d1d;
  .login-btn,
  .ljty {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30%;
    background-color: #fff;
    color: #db2d1d;
    font-size: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 25px;
    width: 80vw;
    height: 8vh;
    justify-content: center;
  }
  .ljty {
    bottom: 18%;
    background-color: #db2d1d;
    color: #fff;
    justify-content: center;
    border: 1px solid #fff;
  }
}
</style>
