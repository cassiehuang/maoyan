<template>
  <div movie>
    <nav>
      <ul>
        <li>
          <router-link :class="{ on: showType === 1 }" to="/movie?showType=1">正在热映</router-link>
        </li>
        <li>
          <router-link :class="{ on: showType === 2 }" to="/movie?showType=2">即将上映</router-link>
        </li>
        <li>
          <router-link :class="{ on: showType === 3 }" to="/movie?showType=3">经典影片</router-link>
        </li>
      </ul>
    </nav>
    <div class="category">
      <div class="list">
        <span class="name">类型:</span>
        <ul>
          <li
            v-for="(item, idx) in catList"
            :key="idx"
            :class="{ on: item.id === catId }"
            @click="changeCategory(1, item.id)"
          >{{ item.text }}</li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">区域:</span>
        <ul>
          <li
            v-for="(item, idx) in sourceList"
            :key="idx"
            :class="{ on: item.id === sourceId }"
            @click="changeCategory(2, item.id)"
          >{{ item.text }}</li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">年代:</span>
        <ul>
          <li
            v-for="(item, idx) in timeList"
            :key="idx"
            :class="{ on: item.id === timeId }"
            @click="changeCategory(3, item.id)"
          >{{ item.text }}</li>
        </ul>
      </div>
    </div>
    <div class="movieList">
      <div class="sortList">
        <my-radio :myRadioList="myRadioList" name="type" @radioChange="radioChange" :value="sortId"></my-radio>
      </div>
      <div class="filmList" v-if="!isLoading">
        <div class="item" v-for="(film, idx) in filmsList" :key="idx">
          <img :src="film.img">
          <p>{{ film.title }}</p>
          <div v-html="film.grade ? film.grade : 暂无评分"></div>
        </div>
      </div>
    </div>
    <pagination :count="count" v-if="count > 0" @page="getPage" :page="pageNo" pageSize=30></pagination>
  </div>
</template>

<script>
import _ from 'lodash';
import myRadio from '@/components/myRadio.vue';
import pagination from '@/components/pagination.vue';
import category from '@/data/category.json';
import { getFilms } from '@/utils/api_helper';

export default {
  data() {
    return {
      myRadioList: [
        {
          value: 1,
          label: '按热度排序',
          isChecked: true,
        },
        {
          value: 2,
          label: '按时间排序',
          isChecked: false,
        },
        {
          value: 3,
          label: '按评价排序',
          isChecked: false,
        },
      ],
      filmsList: [],
      count: 0,
      isLoading: false,
    };
  },

  components: { myRadio, pagination },

  computed: {
    catList() {
      return category.type;
    },
    sourceList() {
      return category.area;
    },
    timeList() {
      return category.time;
    },
    pageNo() {
      return this.$route.query.pageNo ? parseInt(this.$route.query.pageNo, 10) : 1;
    },
    showType() {
      return this.$route.query.showType ? parseInt(this.$route.query.showType, 10) : 1;
    },
    sortId() {
      return this.$route.query.sortId ? parseInt(this.$route.query.sortId, 10) : 1;
    },
    catId() {
      return this.$route.query.catId ? parseInt(this.$route.query.catId, 10) : 'all';
    },
    sourceId() {
      return this.$route.query.sourceId ? parseInt(this.$route.query.sourceId, 10) : 'all';
    },
    timeId() {
      return this.$route.query.timeId ? parseInt(this.$route.query.timeId, 10) : 'all';
    },
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
    changeCategory(type, subType) {
      switch (type) {
        case 2:
          this.queryAppend({ sourceId: subType });
          break;
        case 3:
          this.queryAppend({ timeId: subType });
          break;
        default:
          this.queryAppend({ catId: subType });
      }
    },
    getData() {
      const params = {
        params: _.omitBy({
          catId: this.catId,
          timeId: this.timeId,
          sourceId: this.sourceId,
          type: this.showType,
        }, (value) => { return value === 'all' }),
        pageNo: this.pageNo,
        pageSize: 30,
        sort: this.sortId,
      }
      this.isLoading = true;
      getFilms(params)
        .then(data => {
          this.filmsList = data.data;
          this.count = data.count;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    radioChange(value) {
      this.queryAppend({ sortId: value });
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
[movie] {
  padding-bottom: 60px;
}
nav {
  width: 100%;
  background: #47464a;
  height: 60px;
  color: #999;
  ul {
    max-width: 375px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
  li {
    width: 33.3%;
    line-height: 60px;
    .on {
      color: @red-color;
    }
  }
}
.category {
  .border();
  padding: 0 20px;
  margin: 35px 20px;
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
    }
    ul {
      margin-left: 30px;
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
.movieList {
  margin: 0 20px;
  .filmList {
    text-align: center;
    margin: 40px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .item {
      width: 50%;
      overflow: hidden;
      vertical-align: top;
      box-sizing: border-box;
      padding: 0 8px;
      max-width: 175px;
      img {
        width: 100%;
      }
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .fs(16);
        text-align: center;
        margin: 5px 0 8px 0;
      }
      div {
        text-align: center;
        color: @orange-color;
        font-style: italic;
        .fs(18);
        margin-bottom: 15px;
      }
    }
  }
}
@media (min-width: @md-min) {
  .movieList {
    .filmList {
      .item {
        width: 25%;
        max-width: 220px;
      }
    }
  }
}
@media (min-width: @lg-min) {
  .movieList {
    .filmList {
      .item {
        width: 16.6%;
        padding: 0 6px;
        max-width: 220px;
      }
    }
  }
}
@media (min-width: @xl-min) {
  .category {
    width: 1200px;
    margin: 45px auto;
  }
  .movieList {
    width: 1200px;
    margin: 0 auto;
    .filmList {
      .item {
        box-sizing: border-box;
        padding: 4px 10px;
        width: 16.6%;
        img {
          width: 100%;
        }
        p {
          .fs(18);
          text-align: center;
          margin: 5px 0 8px 0;
        }
        div {
          .fs(22);
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
