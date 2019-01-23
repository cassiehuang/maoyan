<template>
  <div class="slider">
    <div class="slider-container">
      <ul class="slider-wrapper">
        <slot></slot>
      </ul>
      <div class="navigation" @click="dotClick">
        <span class="dot" v-for="(item, idx) in dotList" :key="idx" :class="{ on: curDot === idx}" :data-index="idx"></span>
      </div>
      <div class="pagination">
        <span class="prev-page" @click="prevSlide"></span>
        <span class="next-page" @click="nextSlide"></span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
export default {
  data() {
    return {
      curDot: 0,
      myInterval: null,
      dotList: [],
      len: 0,
      obj: [],
    }
  },

  components: {},

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this.init();
      this.obj.eq(0).css({ 'opacity': 1 });
      this.slide();
    })
  },

  methods: {
    init() {
      this.obj = $(this.$el).find('.slider-wrapper > li');
      this.len = this.obj.length;
      this.dotList = _.range(0, this.len);
    },
    dotClick(e) {
      if (e.target.className === 'dot') {
        this.stopSlide();
        this.slideTo(this.curDot, parseInt($(e.target)[0].dataset.index), 10);
        this.slide();
      }
    },
    slide() {
      this.myInterval = setInterval( () => {
        this.nextSlide();
      }, 3000);
    },
    slideTo(old, cur) {
      this.curDot = cur;
      this.obj.eq(cur).css({ 'opacity': 1 });
      this.obj.eq(old).css({ 'opacity': 0 });
    },
    stopSlide() {
      clearInterval(this.myInterval);
    },
    prevSlide() {
      this.stopSlide();
      this.slideTo(this.curDot, this.curDot <=0 ? (this.len - 1) : (this.curDot - 1));
      this.slide();
    },
    nextSlide() {
      this.stopSlide();
      this.slideTo(this.curDot, this.curDot >= (this.len - 1) ? 0 : (this.curDot + 1));
      this.slide();
    }
  }
}

</script>
<style lang="less">
@import '~@/less/common.less';
.slider {
  width: 100%;
  overflow: hidden;
  height: 443px;
  position: relative;
  text-align: center;
  .slider-container {
    height: 100%;
    &:hover {
      .prev-page, .next-page{
        opacity: 1;
      }
    }
    .slider-wrapper {
      // display: flex;
      // flex-direction: row;
      // flex-wrap: nowrap;
      // overflow: visible;
      position: relative;
      li {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: -1;
        a {
          display: block;
          img {
            max-width: 1420px;
            min-height: 350px;
          }
        }
      }
    }
  }
  .navigation {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    .dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffffff;
      margin: 0 5px;
      transition-duration: .2s;
      &.on {
        background: @red-color;
      }
    }
  }
  .pagination {
    max-width: 1600px;
    z-index: 999;
    margin:0 auto;
    position: relative;
    .prev-page, .next-page{
      width: 18px;
      height: 40px;
      background: url('/public/img/arrow.png') no-repeat;
      display: inline-block;
      position: absolute;
      top: 180px;
      padding: 10px;
      border: 2px solid rgba(220,220,220,0.6);
      background-position: 10px 10px;
      opacity: 0;
      z-index: 999;
      cursor: pointer;
    }
    .prev-page {
      left: 20px;
      transform: rotate(180deg);
    }
    .next-page {
      right: 20px;
    }
  }
}
@media (max-width: @xl-max) {
  .slider {
    height: 350px;
    .pagination {
      .prev-page, .next-page {
        top: 150px;
      }
    }
  }
}
</style>
