<template>
  <div sticky :class="type">
    <div class="holder">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
[sticky] {
  position: relative;
}
.fixed .holder {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #d8d8d8;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  props: ['type'],
  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
