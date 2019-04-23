<template>
  <div>
    <ul @click="pageClick">
      <li v-if="curPage > 1">上一页</li>
      <li v-for="(item, idx) in showPageList"
          :key="idx"
          :class="{on: curIndex === idx}">{{item}}</li>
      <li v-if="curPage < totalPage">下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPageList: [],
      curIndex: 0,
    };
  },
  props: ['count', 'page'],
  components: {},

  computed: {
    totalPage() {
      return Math.ceil(this.count / 30);
    },
    curPage() {
      return this.showPageList[this.curIndex];
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.count === 0) {
        this.$el.innerHTML = '';
        return;
      }
      if (this.totalPage <= 7) {
        for (let i = 1; i <= this.totalPage; i += 1) {
          this.showPageList.push(i);
        }
        return;
      }
      this.showPageList = [1, 2, 3, 4, 5, '...', this.totalPage];
    },
    changePage(page) {
      this.$emit('page', page);
      if (this.totalPage <= 7) {
        this.curIndex = page - 1;
      } else if (page <= 3) {
        this.showPageList = [1, 2, 3, 4, 5, '...', this.totalPage];
        this.curIndex = page - 1;
      } else if (page >= this.totalPage - 1) {
        this.showPageList = ['...', this.totalPage - 5, this.totalPage - 4, this.totalPage - 3, this.totalPage - 2, this.totalPage - 1, this.totalPage];
        this.curIndex = page + 6 - this.totalPage;
      } else {
        this.showPageList = ['...', page - 2, page - 1, page, page + 1, page + 2, '...'];
        this.curIndex = 3;
      }
    },
    pageClick(e) {
      if (e.target.innerHTML === '上一页') {
        this.changePage(this.curPage - 1);
      } else if (e.target.innerHTML === '下一页') {
        this.changePage(this.curPage + 1);
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
  }
}
</style>
