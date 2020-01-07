<template>
  <div class="discover-page-discover-banner">
    <div class="banner mb2">
      <van-swipe>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <div class="px1">
            <div class='img-wrap-box'>
            <img
              v-lazy="image.imageUrl"
              @click="toUrl()"
              class="banner-img"
            />
            <span class="titletype" :style="{background:image.titleColor}">{{image.typeTitle}}</span>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class='search-menu flex align-center flex-around'>
      <div class='menu-item'>
        <span class='iconfont icon-rili'></span>
        <p>每日推荐</p>
      </div>
      <div class='menu-item' @click='togedanSquare'>
        <span class='iconfont icon-faxian'></span>
        <p>歌单</p>
      </div>
      <div class='menu-item'>
        <span class='iconfont icon-paixingbang'></span>
        <p>排行榜</p>
      </div>
      <div class='menu-item'>
        <span class='iconfont icon-xianxing_diantai'></span>
        <p>电台</p>
      </div>
      <div class='menu-item'>
        <span class='iconfont icon-zhibo'></span>
        <p>直播</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import api from "store/discover-page/api/index";

@Component({})
export default class DiscoverBanner extends Vue {
  images = [];
  created() {
    this.search();
  }
  search() {
    api.banner().then((res: any) => {
      this.images = res.banners;
    });
  }
  toUrl() {}
  togedanSquare() {
    this.$router.push({ path: "/gdsquare" });
  }
}
</script>

<style lang='less'>
.discover-page-discover-banner {
  .search-menu {
    .menu-item {
      text-align: center;
      span {
        background-color: #ea3f2d;
        border-radius: 50%;
        padding: 0.5rem;
        font-size: 1.5rem;
        color: #fff;
      }
      p {
        text-align: center;
        font-size: 0.5rem;
        color: #626263;
        margin-top: 0.7rem;
      }
    }
  }
  .banner-img {
    border-radius: 15px;
    width: 100%;
    height: 151px;
  }
  .img-wrap-box {
    position: relative;
    height: 151px;
    .titletype {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 10px;
      color: #fff;
      border-top-left-radius: 15px;
      border-bottom-right-radius: 15px;
      padding: 5px;
    }
  }
}
</style>
