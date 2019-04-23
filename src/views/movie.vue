<template>
  <div movie>
    <nav>
      <ul>
        <li>
          <router-link to="/movie/1"
                       :class="{on: this.curType === 1}">正在热映</router-link>
        </li>
        <li>
          <router-link to="/movie/2"
                       :class="{on: this.curType === 2}">即将上映</router-link>
        </li>
        <li>
          <router-link to="/movie/3"
                       :class="{on: this.curType === 3}">经典影片</router-link>
        </li>
      </ul>
    </nav>
    <div class="category"
         @click="categoryClick">
      <div class="list">
        <span class="name">类型:</span>
        <ul>
          <li v-for="(item, idx) in catList"
              :key="idx"
              :class="{on: idx === dataParams.catIndex}"
              data-parent="1"
              :data-child="idx">{{ item.text }}</li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">区域:</span>
        <ul>
          <li v-for="(item, idx) in sourceList"
              :key="idx"
              :class="{on: idx === dataParams.sourceIndex}"
              data-parent="2"
              :data-child="idx">{{ item.text }}</li>
        </ul>
      </div>
      <hr>
      <div class="list">
        <span class="name">年代:</span>
        <ul>
          <li v-for="(item, idx) in sourceList"
              :key="idx"
              :class="{on: idx === dataParams.timeIndex}"
              data-parent="3"
              :data-child="idx">{{ item.text }}</li>
        </ul>
      </div>
    </div>
    <div class="movieList">
      <div class="sortList">
        <my-radio :myRadioList="myRadioList"
                  name="type"
                  @radioType="radioType"
                  :value="dataParams.radioValue"></my-radio>
      </div>
      <div class="filmList"
           v-if="!isLoading">
        <div class="item"
             v-for="(film, idx) in filmsList"
             :key="idx">
          <img :src="film.img" />
          <p>{{film.title}}</p>
          <div v-html="film.grade ? film.grade : 暂无评分"></div>
        </div>
      </div>
    </div>
    <pagination :count="count"
                v-if="count > 0"
                @page="getPage"
                :page="dataParams.curPage"></pagination>
  </div>
</template>

<script>
import myRadio from '@/components/myRadio.vue';
import pagination from '@/components/pagination.vue';

const category = require('@/data/category.json');
const { queryFilms } = require('@/utils/api_helper');

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
      dataListener: [],
      dataParams: {
        catIndex: 0,
        sourceIndex: 0,
        timeIndex: 0,
        radioValue: 1,
        curPage: 1,
      },
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
    curType() {
      return parseInt(this.$route.params.type, 10);
    },
  },

  mounted() {

  },

  methods: {
    categoryClick(e) {
      switch (parseInt(e.target.dataset.parent, 10)) {
        case 2:
          this.$set(this.dataParams, 'sourceIndex', parseInt(e.target.dataset.child, 10));
          break;
        case 3:
          this.$set(this.dataParams, 'timeIndex', parseInt(e.target.dataset.child, 10));
          break;
        default:
          this.$set(this.dataParams, 'catIndex', parseInt(e.target.dataset.child, 10));
      }
      this.count = 0;
      this.$set(this.dataParams, 'radioValue', 1);
      this.$set(this.dataParams, 'curPage', 1);
    },
    getData(params) {
      this.isLoading = true;
      queryFilms(params).then((data) => {
        if (data.count || data.count === 0) {
          this.filmsList = data.data;
          this.count = data.count;
        }
        this.isLoading = false;
        this.emitDataListener();
      }).catch(() => {
        this.isLoading = false;
        this.emitDataListener();
      });
    },
    addDataListener() {
      const params = {
        type: this.curType,
      };
      if (this.dataParams.catIndex !== 0) {
        params.catId = this.catList[this.dataParams.catIndex].catId;
      }
      if (this.dataParams.sourceIndex !== 0) {
        params.sourceId = this.sourceList[this.dataParams.sourceIndex].sourceId;
      }
      if (this.dataParams.timeIndex !== 0) {
        params.timeId = this.timeList[this.dataParams.timeIndex].timeId;
      }
      if (this.dataParams.radioValue === 2) {
        params.sort = { time: -1 };
      }
      if (this.dataParams.radioValue === 3) {
        params.sort = { grade: -1 };
      }
      params.limit = 30;
      params.skip = (this.dataParams.curPage - 1) * 30;
      this.dataListener.push(params);
    },
    emitDataListener() {
      if (this.dataListener.length > 0 && this.isLoading === false) {
        this.getData(this.dataListener.pop());
        this.dataListener = [];
      }
    },
    radioType(value) {
      this.$set(this.dataParams, 'radioValue', value);
      this.count = 0;
      this.$set(this.dataParams, 'curPage', 1);
    },
    getPage(value) {
      this.$set(this.dataParams, 'curPage', value);
    },
  },
  watch: {
    dataParams: {
      deep: true,
      immediate: true,
      handler() {
        this.addDataListener();
        this.emitDataListener();
      },
    },
    $route() {
      this.count = 0;
      this.dataParams = {
        catIndex: 0,
        sourceIndex: 0,
        timeIndex: 0,
        radioValue: 1,
        curPage: 1,
      };
      this.emitDataListener();
    },
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
  }
  li {
    display: inline-block;
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
    .item {
      display: inline-block;
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
@media(min-width: @md-min) {
  .movieList {
    .filmList {
      .item {
        width: 25%;
        max-width: 220px;
      }
    }
  }
}
@media(min-width: @lg-min) {
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
