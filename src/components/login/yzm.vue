<template>
  <div class="yzm">
    验证码
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);
@Component
export default class Yzm extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next(vm => {
      if (!localStorage.getItem("user")) {
        vm.$router.replace({ path: "/login" });
      }
    });
  }
}
</script>
<style lang="less">
</style>
