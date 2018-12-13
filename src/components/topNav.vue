<template>
  <nav class="topNav" :class="{ open: isOpen}">
    <slot></slot>
    <div class="toggle-bar" :class="{ open: isOpen, close: !isOpen }" @click="toggleBanner"></div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    toggleBanner() {
      this.isOpen = !this.isOpen;
    }
  }
}

</script>
<style lang="less">
@import '~@/less/common.less';
nav.topNav {
  display: flex;
  justify-items: right;
  align-items: center;
  height: 100%;
  .toggle-bar {
    width: 29px;
    height: 3px;
    position: relative;
    flex-shrink: 0;
    &.close {
      background: @red-color;
      padding: 8px 0;
      border-top: 3px solid @red-color;
      border-bottom: 3px solid @red-color;
      background-clip: content-box;
    }
    &.open:before {
      content: '\2716';
      position: absolute;
      top: -20px;
      left: 0;
      color: @red-color;
      .fs(30);
    }
  }
  .navbar-brand {
      line-height: 80px;
      img{
        vertical-align: middle;
      }
      img:before{
        content:'';
        width: 1px;
        height: 100%;
        vertical-align: middle;
        display: inline-block;
      }
    }
  .navbar-collapse {
    .navbar-nav {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
@media (max-width: @md-max) {
  nav.topNav {
    flex-direction: row;
    &.open .navbar-collapse {
      display: block;
    }
    .navbar-collapse {
      display: none;
      position: absolute;
      top:80px;
      left: 0px;
      width: 100%;
      background: #fff;
      .navbar-nav {
        flex-direction: column;
        align-items: stretch;
        li {
          line-height: 50px;
          .fs(16);
          padding-left: 40px;
          text-align: left;
          letter-spacing: 5px;
          .border(top);
        }
      }
    }
  }
}
@media (min-width: @lg-min) {
  nav.topNav {
    flex-direction: row;
    .toggle-bar {
      display: none;
    }
    .navbar-collapse {
      .navbar-nav {
        flex-direction: row;
        height: 100%;
      }
    }
  }
}
</style>