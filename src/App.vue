<template>
  <div id="app">
    <mao-header v-if="isNormal"></mao-header>
    <router-view></router-view>
    <mao-footer v-if="isNormal"></mao-footer>
  </div>
</template>

<script>
import MaoHeader from './components/layout/header.vue';
import MaoFooter from './components/layout/footer.vue';
import getPosition from '@/utils/getPositionByApi';
import { addResize } from '@/utils/Responsive';

export default {
  name: 'app',
  components: {
    MaoHeader,
    MaoFooter,
  },
  beforeMount() {
    addResize(this.resizeChange);
  },
  mounted() {
    /* eslint-disable */
    const _this = this;
    const showLocation = data => {
      _this.$store.commit('CHANGE_CITY', data.content.address_detail.city.replace('市', '') || '');
    };
    /* eslint-enable */
    getPosition(showLocation);
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
html,
body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.stonefont {
  font-family: stonefont;
}
</style>
