<template>
    <div>
        <Banner></Banner>
        <recommendList></recommendList>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "@/components/discover-page/discover/banner.vue";
import recommendList from "../recommend-list/main.vue";
@Component({
  components: {
    Banner,
    recommendList
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
