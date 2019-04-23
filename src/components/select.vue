<template>
  <div select-container :id="type" >
    <slot name="label"></slot>
    <slot name="list"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['type'],
  components: {},

  computed: {},

  mounted() {
  },

  methods: {
  },
};

</script>
<style lang="less">
@import '~@/less/common.less';
[select-container] {
  position: relative;
  line-height: 80px;
  .select-label {
    display: inline-block;
    cursor: pointer;
    border-right: 1px solid rgba(255, 255, 255, 0);
    border-left: 1px solid rgba(255, 255, 255, 0);
    padding: 0 10px;
    .fs(14);
    .arrow {
      width: 0;
      height: 0;
      border-top: 6px solid #444444;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      vertical-align: middle;
      position: relative;
      margin-left: 10px;
      display: inline-block;
      transition: all 0.2s ease;
    }
  }
  &:hover {
    .select-list {
      display: block;
    }
  }
  .select-list {
    position: absolute;
    .border();
    border-top: none;
    z-index: 999;
    background: #ffffff;
    box-sizing: border-box;
    display: none;
  }
  &#city-select {
    flex-shrink: 0;
    margin: 0 50px 0 10px;
    .select-list {
      width: 480px;
      height: 340px;
      overflow-y: scroll;
    }
  }
  &#user-select {
    flex-shrink: 0;
    margin-left: 20px;
    .select-list {
      width: 80px;
      .fs(14);
      text-align: center;
      color: @border-color;
      line-height: 50px;
      height: 50px;
      overflow: hidden;
    }
  }
  &.on {
    .arrow {
      transform: rotate(180deg);
    }
    .select-label {
      .border(right);
      .border(left);
    }
  }
}
</style>
