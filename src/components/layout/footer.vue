<template>
  <section class="footer">
    <p>友情链接：<a href="https://github.com/cassiehuang/maoyan-api">后端接口</a> | <a href="https://github.com/cassiehuang/maoyan-admin">管理工具</a></p>
    <p>github: https://github.com/cassiehuang</p>
    <p>联系邮箱：2694915367@qq.com</p>
    <p>蜀ICP备19037583号-1</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};

</script>
<style lang="less" scoped>
@import '~@/less/common.less';
.footer {
  background: #333;
  color: #fff;
  padding: 40px 0;
  font-size: 14px;
  font-weight: 400;
  p {
    line-height: 1.8;
  }
  a {
    color: @red-color;
  }
}
</style>
