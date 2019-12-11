<template>
  <div>
    <ul @click="pageClick">
      <li :class="{disabled: prevDisabled}">上一页</li>
      <li v-for="item in showPageList" :key="item" :class="{on: page === item}">{{item}}</li>
      <li :class="{disabled: nextDisabled}">下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['count', 'page', 'pageSize'],

  computed: {
    totalPage() {
      return Math.ceil(this.count / this.pageSize);
    },
    showPageList() {
      if (this.totalPage === 0) {
        return [];
      }
      if (this.totalPage <= 7) {
        const array = []
        for (let i = 1; i <= this.totalPage; i += 1) {
          array.push(i);
        }
        return array;
      }
      if (this.page <= 3) {
        return [1, 2, 3, 4, 5, '>', this.totalPage];
      }
      if (this.page >= this.totalPage - 1) {
        return [
          '<',
          this.totalPage - 5,
          this.totalPage - 4,
          this.totalPage - 3,
          this.totalPage - 2,
          this.totalPage - 1,
          this.totalPage,
        ];
      }
      return ['<', this.page - 2, this.page - 1, this.page, this.page + 1, this.page + 2, '>'];
    },
    prevDisabled() {
      return this.page <= 1;
    },
    nextDisabled() {
      return this.page >= this.totalPage
    }
  },

  methods: {
    changePage(page) {
      this.$emit('page', page);
    },
    pageClick(e) {
      if (e.target.innerHTML === '上一页' && !this.prevDisabled) {
        this.changePage(this.page - 1);
      } else if (e.target.innerHTML === '下一页' && !this.nextDisabled) {
        this.changePage(this.page + 1);
      } else if (parseInt(e.target.innerHTML, 10) > 0) {
        this.changePage(parseInt(e.target.innerHTML, 10));
      }
    },
  },
};
</script>
<style scoped lang="less">
@import '~@/less/common.less';
ul {
  li {
    padding: 8px 12px;
    .border();
    display: inline-block;
    margin: 10px 10px;
    cursor: pointer;
    &:hover {
      border: 1px solid @red-color;
    }
    &.on {
      background: @red-color;
      color: #fff;
      border: 1px solid @red-color;
    }
    &.disabled {
      background: #dadada;
      border: #dadada;
      color: #999999;
    }
  }
}
</style>
