<template>
  <div v-if="recommandList.length > 0">
    <slider>
      <li v-for="(item, idx) in recommandList" :key="idx">
        <router-link :to="`/article/${item.id}`">
          <img :src="item.recommand_img" />
        </router-link>
      </li>
    </slider>
    <div class="main">
      <div class="left-section">
        <section class="online-films">
          <h3>正在热映（{{onlineFilmsLen}}）
            <router-link class="more" to="/movie/1">全部 ></router-link>
          </h3>
          <div class="list">
            <div class="item" v-for="(item, idx) in onlineFilms" :key="idx">
              <img :src="item.img" />
              <p class="film-info">
                <span class="grade" v-html="item.grade" v-if="item.grade!=='&#x6682;&#x65E0;&#x8BC4;&#x5206;'"></span>
                <span class="film-title">{{ item.title }}</span>
              </p>
              <span class="buy">购票</span>
            </div>
          </div>
        </section>
        <section class="pre-films">
          <h3>即将上映（{{preFilmsLen}}）
            <router-link class="more" to="/movie/2">全部 ></router-link>
          </h3>
          <div class="list">
            <div class="item" v-for="(item, idx) in preFilms" :key="idx">
              <img :src="item.img" />
              <p class="film-info">
                <span class="film-title">{{ item.title }}</span>
              </p>
              <p class="person-num">{{item.peopleNum}}人想看</p>
              <div class="pre-block">
                <span>预告片</span>
                <span>预售</span>
              </div>
              <p class="sale-time">2018-11-23</p>
            </div>
          </div>
        </section>
      </div>
      <div class="right-section">
        <aside class="aside-1 hidden-lg-down">
          <h3>今日票房</h3>
          <div class="list">
            <div class="item" v-for="(item, idx) in goodFilms" :key="idx">
              <div class="first" v-if="idx === 0">
                <img :src="item.img" />
                <span>{{item.title}}</span><br>
                <span>{{item.grade}}</span>
              </div>
              <p v-if="idx !== 0">
                <span class="seq">{{idx + 1}}.</span>
                <span class="title">{{item.title}}</span>
                <span class="grade">{{item.grade}}</span>
              </p>
            </div>
          </div>
        </aside>
        <aside class="aside-2">
          <h3>最受期待</h3>
          <div class="list">
            <div class="item" v-for="(item, idx) in hotFilms" :key="idx">
              <div class="first" v-if="idx === 0">
                <img :src="item.img" />
                <span>{{item.title}}</span>
                <span>{{item.peopleNum}}人想看</span>
              </div>
              <p v-if="idx !== 0">
                <span class="seq">{{idx + 1}}.</span>
                <span class="title">{{item.title}}</span>
                <span class="grade">{{item.peopleNum}}人想看</span>
              </p>
            </div>
          </div>
        </aside>
        <aside class="aside-3">
          <h3>top100
            <span>查看更多</span>
          </h3>
          <div class="list">
            <div class="item" v-for="(item, idx) in goodFilms" :key="idx">
              <div class="first" v-if="idx === 0">
                <img :src="item.img" />
                <span>{{item.title}}</span>
                <span>{{item.grade}}</span>
              </div>
              <p v-if="idx !== 0">
                <span class="seq">{{idx + 1}}.</span>
                <span class="title">{{item.title}}</span>
                <span class="grade">{{item.grade}}</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider.vue';
// const opt = require('@/utils/api_helper.js');
// const queryRecommand = opt.queryRecommand;
// const queryFilms = opt.queryFilms;
import {queryRecommand, queryFilms} from '@/utils/api_helper.js'
export default {
  data() {
    return {
      recommandList: [],
      onlineFilms: [],
      preFilms: [],
      onlineFilmsLen: 0,
      preFilmsLen: 0,
      goodFilms: [],
      hotFilms: [],
    }
  },

  components: { Slider },

  computed: {},

  mounted() {
    this.getRecommand();
    this.getOnlineFilms();
    this.getPreFilms();
    this.getGoodFilms();
    this.getHotFilms();
  },

  methods: {
    getRecommand() {
      queryRecommand({ isShow: true }).then((data) => {
        this.recommandList = data.data;
      })
    },
    getOnlineFilms() {
      queryFilms({ type: 1, limit: 12 }).then((data) => {
        this.onlineFilms = data.data;
        this.onlineFilmsLen = data.count;
      })
    },
    getPreFilms() {
      queryFilms({ type: 2, limit: 12 }).then((data) => {
        this.preFilms = data.data;
        this.preFilmsLen = data.count;
      })
    },
    getGoodFilms() {
      queryFilms({ type: 1, limit: 10, sort: { grade: -1 } }).then((data) => {
        this.goodFilms = data.data;
      })
    },
    getHotFilms() {
      queryFilms({ type: 2, limit: 10, sort: { peopleNum: -1 } }).then((data) => {
        this.hotFilms = data.data;
      })
    }
  }
}

</script>
<style scoped lang="less">
@import '~@/less/common.less';
.main {
  max-width: 1200px;
  margin: 30px auto 40px auto;
  overflow: hidden;
  padding: 0 20px;
  text-align: left;
  .left-section {
    float: left;
    margin-bottom: 30px;
  }
  section {
    text-align: left;
    h3 {
      color: @red-color;
      .fs(22);
      font-weight: 600;
      margin-bottom: 20px;
      .more {
        .fs(16);
        font-weight: normal;
        line-height: 26px;
        float: right;
        color: @red-color;
      }
    }
    .item {
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      text-align: center;
      img {
        width: 100%;
        vertical-align: top;
      }
      .film-info {
        position: absolute;
        right: 8px;
        left: 8px;
        bottom: 45px;
        background: url('/img/text-bg.png');
        z-index: 100;
        height: 25px;
        padding-top: 55px;
        .film-title {
          color: #fff;
          .fs(16);
          padding: 0 10px;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
        .grade {
          color: @orange-color;
          .fs(18);
          font-weight: 600;
          float: right;
          padding-right: 10px;
        }
      }
      .buy {
        color: @red-color;
        .fs(14);
        font-weight: 500;
        display: block;
        line-height: 40px;
        cursor: pointer;
        &:hover {
          background: @red-color;
          color: #fff;
        }
      }
      .person-num {
        line-height: 30px;
      }
      .pre-block {
        span {
          display: inline-block;
          box-sizing: border-box;
          width: 50%;
          border: 1px solid #f1f1f1;
          line-height: 40px;
          &:last-of-type {
            color: @blue-color;
            &:hover {
              background: @blue-color;
              color: #fff;
            }
          }
        }
      }
      .sale-time {
        line-height: 30px;
        border: 1px solid #f1f1f1;
      }
    }
  }
  section.pre-films {
    margin-top: 40px;
    h3 {
      color: @blue-color;
      .more {
        color: @blue-color;
      }
    }
    .item .film-info {
      bottom: 110px;
    }
  }
  aside {
    width: 330px;
    color: @red-color;
    margin-bottom: 100px;
    display: inline-block;
    h3 {
      text-align: left;
      .fs(20);
      font-weight: 500;
      margin-bottom: 20px;
      span {
        float: right;
        .fs(14);
      }
    }
    .list {
      text-align: left;
      line-height: 40px;
      .item > p {
        line-height: 40px;
        height: 40px;
        overflow: hidden;
        .seq {
          font-style: italic;
          .fs(18);
          margin-right: 10px;
        }
        .grade {
          float: right;
        }
        .title {
          color: #333;
        }
      }
      .item > div {
        height: 100px;
        overflow: hidden;
        border: 1px solid @red-color;
        img {
          width: 150px;
          height: 100px;
          vertical-align: middle;
          margin-right: 10px;
        }
        span {
          color: #333;
          vertical-align: middle;
        }
      }
    }
  }
  .aside-2 {
    color: @blue-color;
    .list .item > div {
      border: 1px solid @blue-color;
    }
  }
}
@media (max-width: @sm-max) {
  .main {
    section {
      .list {
        margin: 0 -2%;
      }
      .item {
        width: 50%;
        padding: 6px 8px;
      }
    }
    aside {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
  }
}
@media (min-width: @md-min) {
  .main {
    section {
      .item {
        width: 25%;
        padding: 6px 8px;
      }
    }
    aside {
      padding: 0 20px;
      width: 50%;
      box-sizing: border-box;
      margin-bottom: 40px;
    }
  }
}
@media (min-width: @lg-min) {
  .main {
    section {
      width: 670px;
      .item {
        width: 167px;
        padding: 6px 8px;
      }
    }
    aside {
      width: 270px;
      margin-bottom: 100px;
      float: right;
      position: relative;
      top: 6px;
      .list .item > div {
        height: 80px;
        img {
          width: 130px;
          height: 80px;
        }
      }
    }
  }
}
@media (min-width: @xl-min) {
  .main {
    section {
      width: 750px;
      margin-right: 50px;
      .list {
        margin: 0 -8px;
      }
      .item {
        width: 25%;
        padding: 6px 8px;
      }
    }
    aside {
      width: 330px;
      .list .item > div {
        height: 100px;
        img {
          width: 150px;
          height: 100px;
        }
      }
    }
  }
}
</style>