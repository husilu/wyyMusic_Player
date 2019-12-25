<template>
    <div class='discover'>
        <Banner></Banner>
        <recommendList></recommendList>
        <xdxg></xdxg>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "@/components/discover-page/discover/banner.vue";
import recommendList from "../recommend-list/main.vue";
import xdxg from '../xdxg/main.vue';
@Component({
  components: {
    Banner,
    recommendList,
    xdxg
  },
  data () {
    return {
      name: "discover"
    };
  }
})
export default class Discover extends Vue {}
</script>
<style lang="less">
</style>
