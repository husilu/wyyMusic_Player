<template>
  <div class="mobile-login">
    <div class='nav flex'>
      <div class='back' @click="backHandler">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class='flex-auto text-center title'>手机号登录</div>
    </div>
    <div class='login-container px1'>
      <p class='mtgap'>未登录的手机号登录后将自动创建账号</p>
      <div class='flex align-center input-wrap'>
        <span>+86</span>
        <van-field v-model="tel" placeholder="请输入手机号" class='flex-auto' type='tel'/>
      </div>
      <div class='next-btn' :class='tel?"":"inactive"' @click="nextHandler">
         下一步
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "store/login/api/index";
@Component
export default class MobileLogin extends Vue {
  private tel = '';
  backHandler() {
    this.$router.go(-1);
  }
  async nextHandler() {
    if (this.tel) {
      if (this.tel.length < 11) {
        this.$toast('手机号不应该小于11位数')
      } else {
        let res = await api.Existence(this.tel)
        if (res.exist === 1) {
          this.$router.push({ path: '/password', query: { tel: this.tel } })
        } else {
          this.$router.push({ path: '/yzm', query: { tel: this.tel } })
        }
      }
    }
  }
}
</script>
<style lang="less">
.mobile-login {
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
    opacity: .3;
  }
  .input-wrap {
    margin-top:10vh;
    margin-bottom: 10vh;
    border-bottom: 1px solid #e5e5e5;
  }
  .mtgap {
    margin-top: 10vh;
    color: #cacaca;
    font-size: .8rem;
  }
}
</style>
