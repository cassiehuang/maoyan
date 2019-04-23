<template>
  <div id="app">
    <mao-header v-if="isNormal"></mao-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MaoHeader from './components/layout/header.vue';
import { addResize } from '@/utils/Responsive';

export default {
  name: 'app',
  components: {
    MaoHeader,
  },
  beforeMount() {
    addResize(this.resizeChange);
  },
  methods: {
    resizeChange(size) {
      this.$store.commit('CHANGE_SCREEN', size);
    },
  },
  computed: {
    isNormal() {
      return this.$route.path.indexOf('login') === -1;
    },
  },
};
</script>

<style lang="less">
@import '~@/less/reset.less';
@import '~@/less/common.less';
html,body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.stonefont {
  font-family: stonefont;
}
</style>
