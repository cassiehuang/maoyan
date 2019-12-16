<template>
  <section class="search">
    <div class="bg-grey">
      <div class="search-box">
        <input type="text" placeholder="找影视剧、影人、影院" v-model="searchKey" @keydown.enter="search"/>
        <span @click="search" class="searchIcon"></span>
      </div>
      <ul class="search-group">
        <li :class="{ on: curTab === 0 }" @click="curTab = 0">影视剧（{{ films.length }}）</li>
        <li :class="{ on: curTab === 1 }" @click="curTab = 1">影人（{{ people.length }}）</li>
        <li :class="{ on: curTab === 2 }" @click="curTab = 2">影院（{{ cinemas.length }}）</li>
      </ul>
    </div>
    <div class="empty" v-if="noContent">
      <h3>很抱歉，没有搜到相关词条</h3>
      <p>小喵建以您：<br/>1. 请检查输入的关键词是否有误<br/>2.请缩短关键词</p>
    </div>
    <div class="content" v-if="curTab === 0 && !noContent">
      <div class="item" v-for="(item, idx) in films" :key="idx">
        <img class="pic" :src="item.img"/>
        <div class="context">
          <h2 class="name">{{ item.title }}</h2>
          <h3 class="info">{{item.grade ? item.grade : item.people + '关注'}}</h3>
          <p class="desc">代表作：《中国合伙人》 《疯狂的赛车》 《决战刹马镇》</p>
        </div>
      </div>
    </div>
    <div class="content" v-if="curTab === 1 && !noContent">
    </div>
    <div class="content" v-if="curTab === 2 && !noContent">
      <div class="cinemaItem" v-for="(item, idx) in cinemas" :key="idx">
        <h3 class="cinemaName">{{ item.name }}</h3>
        <p class="cinemaAddress">{{ item.address }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { search } from '@/utils/api_helper.js';

export default {
  data () {
    return {
      films: [],
      people: [],
      cinemas: [],
      searchKey: this.$route.query.keyword,
      curTab: 0,
    }
  },

  computed: {
    noContent() {
      switch (this.curTab) {
        case 0:
          return this.films.length === 0;
        case 1:
          return this.people.length === 0;
        case 2:
          return this.cinemas.length === 0;
        default:
          return false;
      }
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      search({ keyword: this.searchKey }).then((data) => {
        this.films = data.films;
        this.people = data.people;
        this.cinemas = data.cinemas;
      })
    },
    search() {
      this.getData();
    }
  }
}

</script>
<style scoped lang="less">
.bg-grey {
  background: #47464a;
  padding-top: 40px;
  .search-box {
    display: inline-block;
    position: relative;
    input {
      border: 1px solid #fff;
      background: #fff;
      height: 40px;
      width: 700px;
      border-radius: 20px;
    }
    .searchIcon {
      background: #ef4238;
      background-image: url('/public/img/search.png');
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: block;
      cursor: pointer;
      right: 1px;
      top: 1px;
      position: absolute;
    }
  }
  .search-group {
    margin: 40px auto 0 ;
    display: flex;
    color: #fff;
    width: 700px;
    li {
      width: 33.3%;
      height: 40px;
      cursor: pointer;
      color: #ccc;
      &:hover {
        color: #fff;
      }
      &.on {
        color: #ef4238;
      }
    }
  }
}
.content {
  display: flex;
  width: 980px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding-bottom: 60px;
  .item {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-items: stretch;
    margin-top: 40px;
    .pic {
      flex-shrink: 0;
      width: 160px;
    }
    .context {
      margin: 0 30px 0 20px;
      text-align: left;
      border-bottom: 1px solid #ccc;
      .name {
        font-size: 24px;
        margin-top: 50px;
        overflow: hidden;
        word-wrap: none;
      }
      .info {
        font-size: 26px;
        color: #ffb400;
        padding: 20px 0;
      }
      .desc {
        font-size: 14px;
        line-height: 1.5;
      }

    }
  }
  .cinemaItem {
    width: 100%;
    padding: 30px 0;
    text-align: left;
    border-bottom: 1px solid #ccc;
    .cinemaName {
      font-size: 24px;
    }
    .cinemaAddress {
      color: #aaa;
      margin-top: 10px;
    }
  }
}
.empty {
  text-align: left;
  width: 500px;
  margin: 80px auto 337px;
  h3 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  p {
    line-height: 1.6;
  }
}
</style>
