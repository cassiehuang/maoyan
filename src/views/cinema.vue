<template>
  <div cinemas>
    <div class="category" @click="categoryClick">
      <div class="list">
        <span class="name">品牌:</span>
        <ul>
          <li v-for="(item, idx) in brandList" :key="idx" :class="{on: idx === dataParams.brandIndex}" data-parent="1" :data-child="idx" v-html="item.text"></li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">行政区:</span>
        <ul>
          <li v-for="(item, idx) in areaList" :key="idx" :class="{on: idx === dataParams.areaIndex}" data-parent="2" :data-child="idx">{{ item.text }}</li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">特殊厅:</span>
        <ul>
          <li v-for="(item, idx) in hallList" :key="idx" :class="{on: idx === dataParams.hallIndex}" data-parent="3" :data-child="idx">{{ item.text }}</li>
        </ul>
      </div>
    </div>
    <h2>影院列表</h2>
    <div class="cinema_list" v-show="!isLoading">
      <div class="item" v-for="(item, idx) in cinemasList" :key="idx">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
        <div class="buy">
          <input type="button" value="选座购票"/>
        </div>
      </div>
    </div>
    <pagination :count="count" :page="dataParams.curPage" @page="getPage" v-if="count > 0"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/pagination.vue';
const cinemas = require('@/data/cinemas.json');
const queryCinemas = require('@/utils/api_helper.js').queryCinemas;

export default {
  data () {
    return {
      dataParams: {
        curPage: 1,
        brandIndex: 0,
        areaIndex: 0,
        hallIndex: 0,
      },
      cinemasList: [],
      count: 0,
      listeners: [],
      isLoading: false,
    }
  },

  components: { pagination },

  computed: {
    brandList() {
      return cinemas.brand;
    },
    areaList() {
      return cinemas.area;
    },
    hallList() {
      return cinemas.hall;
    }
  },

  mounted() {},

  methods: {
    getData(params) {
      this.isLoading = true;
      queryCinemas(params).then((data) => {
        if (data.count || data.count === 0) {
          this.cinemasList = data.data;
          this.count = data.count;
        }
        this.isLoading = false;
        this.emitListener();
      }).catch(() => {
        this.isLoading = false;
        this.emitListener();
      })
    },
    addListener() {
      let params = {
        skip: (this.dataParams.curPage - 1) * 12,
        limit: 12,
      }
      if ( this.dataParams.brandIndex != 0) params.brandId = cinemas.brand[this.dataParams.brandIndex].id;
      if ( this.dataParams.areaIndex != 0) params.areaId = cinemas.area[this.dataParams.areaIndex].id;
      if ( this.dataParams.hallIndex != 0) params.hallId = cinemas.hall[this.dataParams.hallIndex].id;
      this.listeners.push(params);
    },
    emitListener() {
      if (this.isLoading === false && this.listeners.length > 0) {
        this.getData(this.listeners.pop());
        this.listeners = [];
      }
    },
    categoryClick(e) {
      switch (parseInt(e.target.dataset.parent, 10)) {
        case 2:
          this.$set(this.dataParams, 'areaIndex', parseInt(e.target.dataset.child, 10));
          break;
        case 3:
          this.$set(this.dataParams, 'hallIndex', parseInt(e.target.dataset.child, 10));
          break;
        default:
          this.$set(this.dataParams, 'brandIndex', parseInt(e.target.dataset.child, 10));
      }
      this.count = 0;
      this.$set(this.dataParams, 'curPage', 1);
    },
    getPage(value) {
      this.$set(this.dataParams, 'curPage', value);
    }
  },
  watch: {
    dataParams: {
      deep: true,
      immediate: true,
      handler: function () {
        this.addListener();
        this.emitListener();
      }
    }
  }
}

</script>
<style scoped lang="less">
@import '~@/less/common.less';
[cinemas] {
  padding: 0 20px 60px 20px;
}
.category {
  .border();
  padding: 0 20px;
  margin: 35px 0;
  box-sizing: border-box;
  hr {
    background: @border-color;
  }
  .list {
    text-align: left;
    .fs(14);
    padding: 10px 0;
    span {
      float: left;
      display: block;
      color: #999;
      height: 1px;
      width: 50px;
    }
    ul {
      margin-left: 50px;
      li {
        display: inline-block;
        margin-left: 12px;
        vertical-align: top;
        padding: 5px 9px;
        border-radius: 10px;
        cursor: pointer;
        &.on {
          background: @red-color;
          color: #fff;
        }
      }
    }
  }
}
h2 {
  text-align: left;
  border-left: 3px solid @red-color;
  padding-left: 6px;
}
.cinema_list {
  text-align: left;
  margin-bottom: 35px;
  .item {
    padding: 20px 0;
    .border(bottom);
    position: relative;
    h4 {
      .fs(16);
      margin-right: 100px;
    }
    p {
      .fs(14);
      line-height: 20px;
      padding-top: 5px;
      margin-right: 100px;
      color: #666;
    }
    .buy {
      position: absolute;
      right: 0;
      top: 20px;
      input[type="button"] {
        border-radius: 15px;
        color: #fff;
        width: 80px;
        line-height: 30px;
        padding: 0;
        border: 0;
        background: @red-color;
        .fs(14);
      }
    }
  }
}
@media (min-width: @xl-min) {
  [cinemas] {
    width: 1200px;
    margin: 0 auto;
    padding-right: 0;
    padding-left: 0;
  }
}
</style>