<template>
  <div class='discover-page-discover-main mt1'>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  data () {
    return {
      name: "discover"
    };
  }
})
export default class Discover extends Vue {}
</script>

<style>

</style>
