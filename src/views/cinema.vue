<template>
  <div cinemas>
    <div class="category">
      <div class="list">
        <span class="name">品牌:</span>
        <ul>
          <li
            v-for="item in brandList"
            :key="item.id"
            :class="{ on: item.id === brandId }"
            v-html="item.text"
            @click="changeCategory(1, item.id)"
          ></li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">行政区:</span>
        <ul>
          <li
            v-for="item in areaList"
            :key="item.id"
            :class="{on: item.id === areaId}"
            @click="changeCategory(2, item.id)"
          >{{ item.text }}</li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">特殊厅:</span>
        <ul>
          <li
            v-for="item in hallList"
            :key="item.id"
            :class="{on: item.id === hallId}"
            @click="changeCategory(3, item.id)">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
    <h2>影院列表</h2>
    <div class="cinema_list" v-show="!isLoading">
      <div class="item" v-for="(item, idx) in cinemasList" :key="idx">
        <h4>{{ item.name }}</h4>
        <p>{{ item.address }}</p>
        <div class="buy">
          <input type="button" value="选座购票">
        </div>
      </div>
    </div>
    <pagination :count="count" :page="pageNo" pageSize=30 @page="getPage" v-if="count > 0"></pagination>
  </div>
</template>

<script>
import _ from 'lodash';
import pagination from '@/components/pagination.vue';

const cinemas = require('@/data/cinemas.json');
const { getCinemas } = require('@/utils/api_helper.js');

export default {
  data() {
    return {
      cinemasList: [],
      count: 0,
      isLoading: false,
    };
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
    },
    brandId() {
      return this.$route.query.brandId ? parseInt(this.$route.query.brandId, 10) : 'all';
    },
    areaId() {
      return this.$route.query.areaId ? parseInt(this.$route.query.areaId, 10) : 'all';
    },
    hallId() {
      return this.$route.query.hallId ? parseInt(this.$route.query.hallId, 10) : 'all';
    },
    pageNo() {
      return this.$route.query.pageNo ? parseInt(this.$route.query.pageNo, 10) : 1;
    }
  },

  methods: {
    queryAppend(obj) {
      let query = { ...this.$route.query, ...obj };
      query = _.omitBy(query, (value) => { return value === 'all' })
      if (!obj.pageNo) {
        query = _.omit(query, 'pageNo');
      }
      this.$router.push({ query });
    },
    getData() {
      const params = {
        params: _.omitBy({
          brandId: this.brandId,
          areaId: this.areaId,
          hallId: this.hallId,
        }, (value) => { return value === 'all' }),
        pageNo: this.pageNo,
        pageSize: 30,
      }
      this.isLoading = true;
      getCinemas(params)
        .then(data => {
          if (data.count || data.count === 0) {
            this.cinemasList = data.data;
            this.count = data.count;
          }
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    changeCategory(type, subType) {
      switch (type) {
        case 2:
          this.queryAppend({ areaId: subType });
          break;
        case 3:
          this.queryAppend({ hallId: subType });
          break;
        default:
          this.queryAppend({ brandId: subType });
      }
    },
    getPage(value) {
      this.queryAppend({ pageNo: value });
    },
  },
  watch: {
    $route() {
      this.getData();
    },
  },

  mounted() {
    this.getData();
  },
};
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
      input[type='button'] {
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
