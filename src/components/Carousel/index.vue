<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      // 不论数据有没有变化，直接上来就立即监听一次
      // 由于floor组件的数据是父组件给的，因此数据没有变化
      immediate:true,
      handler(newValue, oldValue) {
        // 只能监听到数据已经有了，但是不能确定v-for结构渲染完毕没有，因此还是需要$nextTick
        this.$nextTick(()=>{
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable:true
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
        })
      },
    },
  },
};
</script>

<style>
</style>