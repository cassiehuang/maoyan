<template>
  <div header>
    <sticky type="fixed">
      <top-nav>
        <router-link to="/" class="navbar-brand">
          <img src="/img/logo.png" />
        </router-link>
        <select-bar type="city-select" class="hidden-md-down">
          <div class="select-label" slot="label">
            <span>{{ currentCity }}</span>
            <span class="arrow"></span>
          </div>
          <div slot="list" class="select-list">
            <div class="city-div">定位城市：{{ currentCity }}</div>
            <ul class="city-ul" @click="cityClick">
              <li v-for="(item, idx) in cityList" :key="idx">
                <div>{{ item.title }}</div>
                <span>
                  <a v-for="(city, index) in item.lists" :key="`${idx}-${index}`" :data-city="city">{{ city }}</a>
                </span>
              </li>
            </ul>
          </div>
        </select-bar>
        <div class="navbar-collapse">
          <ul class="navbar-nav">
            <li v-for="(nav, idx) in navList" :key="idx">
              <router-link :to="nav.path">{{ nav.name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="item-shrink"></div>
        <div class="input-group search hidden-md-down">
          <input type="search" maxlength="32" placeholder="找影视剧、影人、影院" />
          <span></span>
        </div>
        <div class="item-shrink-1"></div>
        <select-bar type="user-select" class="hidden-lg-down">
          <div class="select-label" slot="label">
            <span class="user" :style="{'background-image': `url(${user.isLogin ? '/img/user-1.png' : '/img/user.png'})`}"></span>
            <span class="arrow"></span>
          </div>
          <div slot="list" class="select-list">
            <div v-if="!user.isLogin"><router-link to="/login">登录</router-link></div>
            <div v-if="user.isLogin"><router-link to="/">{{user.username}}</router-link></div>
          </div>
        </select-bar>
      </top-nav>
    </sticky>
  </div>
</template>

<script>
import Sticky from '../sticky.vue'
import TopNav from '../topNav.vue'
import SelectBar from '../select.vue'

const cityList = require('@/data/city.json');

export default {
  data() {
    return {
      navList: [
        {
          path: '/home',
          name: '首页',
        },
        {
          path: '/movie',
          name: '电影',
        },
        {
          path: '/cinema',
          name: '影院',
        },
        {
          path: '/board',
          name: '榜单',
        }
      ],
    }
  },

  components: { Sticky, TopNav, SelectBar },

  computed: {
    cityList() {
      return cityList.city;
    },
    user() {
      return this.$store.state.user;
    },
    currentCity() {
      return this.$store.state.city;
    }
  },

  mounted() { },

  methods: {
    cityClick(e) {
      if (e.target.dataset.city) {
        this.$store.commit('CHANGE_CITY', e.target.dataset.city);
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import '~@/less/common.less';
.fixed {
  height: 80px;
  margin: 0 auto;
  .border(bottom);
  nav {
    height: 80px;
    .fs(18);
  }
}
.item-shrink {
  width: 200px;
  flex-shrink: 1;
}
.search {
  height: 40px;
  border-radius: 20px;
  .border();
  .fs(14);
  input {
    border: none;
    border-radius: 20px;
    width: 260px;
    box-sizing: border-box;
    background: #faf8fa;
  }
  span {
    background: @red-color;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &::before {
      content: '';
      background: url('/img/search.png');
      width: 40px;
      height: 40px;
      display: block;
      cursor: pointer;
    }
  }
}
nav {
    .navbar-nav {
      background: #f5f5f5;
      box-shadow: 2px 2px 5px  #ccc;
      .border(bottom);
      a {
        &.router-link-active {
          color: @red-color !important;
        }
      }
    }
  }
@media (min-width: @lg-min) {
  nav {
    padding: 0 20px;
    .navbar-nav {
      background: none;
      box-shadow: none;
      a {
        width: 80px;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        &.router-link-active {
          background: @red-color;
          color: #ffffff !important;
        }
      }
      a:hover {
        color: @red-color;
      }
    }
  }
  .city-div {
    .border(bottom);
    line-height: 60px;
    text-align: left;
    padding: 0 20px;
  }
  .city-ul {
    text-align: left;
    padding: 12px 0px 20px 16px;
    div {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #dcdcdc;
      .tc();
      line-height: 20px;
      margin-right: 5px;
      margin-top: 5px;
    }
    span {
      display: inline-block;
      width: 410px;
      vertical-align: top;
    }
    a {
      .fs(14);
      cursor: pointer;
      display: inline-block;
      padding: 5px 8px;
      &:hover {
        background: @red-color;
          color: #ffffff;
      }
    }
  }
  #user-select {
    .select-label {
      .user {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('/img/user.png');
        background-size: 100% 100%;
        vertical-align: middle;
      }
    }
  }
}
@media (min-width: @xl-min) {
  nav {
    width: 1200px;
    margin: 0 auto;
  }
}
@media (min-width: @lg-min) and (max-width: @lg-max) {
  .search {
    input {
      width: 220px;
    }
  }
  nav {
    .navbar-nav {
      a {
        width: 65px;
      }
    }
    #city-select {
      margin-right: 35px;
    }
  }
}
@media (max-width: @md-max) {
  nav {
    padding: 0 30px;
    .item-shrink {
      width: 0px;
      flex-shrink: 1;
    }
    .item-shrink-1 {
      width: 500px;
      flex-shrink: 1;
    }
    #city-select {
      margin-right: 25px;
    }
  }
  .search {
    input {
      width: 220px;
    }
  }
}
</style>
<style lang="less">
[sticky] .holder {
  background: #fff;
}
</style>
