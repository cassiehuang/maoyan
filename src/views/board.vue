<template>
  <div board>
    <nav>
      <ul>
        <li>
          <router-link to="/board/1" :class="{on: this.curType === 1}">热映口碑榜</router-link>
        </li>
        <li>
          <router-link to="/board/2" :class="{on: this.curType === 2}">最受期待榜</router-link>
        </li>
        <li>
          <router-link to="/board/3" :class="{on: this.curType === 3}">TOP100榜</router-link>
        </li>
      </ul>
    </nav>
    <p class="hint">{{text}}</p>
    <div class="list" v-show="!isLoading">
      <div class="item" v-for="(item, idx) in list" :key="idx">
        <div class="seq">{{idx + 1}}</div>
        <img :src="item.img" :alt="item.title">
        <div class="detail">
          <h3>{{item.title}}</h3>
          <p>{{item.title}}</p>
          <div v-if="curSize === 'sm'">
            {{ curType === 2 ? '想看人数'+item.peopleNum
            : item.grade }}
          </div>
        </div>
        <div class="grade" v-if="curType !== 2 && curSize !=='sm'">{{ item.grade }}</div>
        <div class="peopleNum" v-if="curType === 2 && curSize !=='sm'">{{'想看人数'+item.peopleNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFilms } from '@/utils/api_helper';

export default {
  data() {
    return {
      list: [],
      isLoading: false,
    };
  },

  components: {},

  computed: {
    text() {
      switch (this.curType) {
        case 2:
          return '榜单规则：将即将上映的影片，按照想看人数从高到低排列取前10名';

        case 3:
          return '榜单规则：将所有的影片，按照评分从高到低排列取前10名';

        default:
          return '榜单规则：将正在热映的影片，按照评分从高到低排列取前10名';
      }
    },
    curType() {
      return parseInt(this.$route.params.type, 10);
    },
    curSize() {
      return this.$store.state.screen.size;
    },
  },

  mounted() {},

  methods: {
    getData() {
      let sort = 2;
      switch (this.curType) {
        case 2:
          sort = 1;
          break;
        case 3:
          sort = 3;
          break;
        default:
          sort = 3;
      }
      getFilms({
        params: {
          type: this.curType,
        },
        pageSize: 10,
        sort,
      })
        .then(data => {
          this.list = data.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getData();
      },
    },
  },
};
</script>
<style scoped lang="less">
@import '~@/less/common.less';
[board] {
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
  .hint {
    line-height: 130px;
    .fs(12);
    color: #666;
  }
  .list {
    max-width: 1000px;
    padding: 0 20px;
    margin: 0 auto;
    .item {
      &:nth-child(1) {
        .seq {
          background: @red-color;
          color: #fff;
        }
      }
      &:nth-child(2),
      &:nth-child(3) {
        .seq {
          background: @orange-color;
          color: #fff;
        }
      }
      border-bottom: 2px solid #efefef;
      display: flex;
      flex-direction: row;
      margin-bottom: 30px;
      padding-bottom: 30px;
      height: 210px;
      align-items: center;
      .seq {
        width: 60px;
        height: 60px;
        line-height: 60px;
        .fs(27);
        margin-right: 30px;
        font-style: italic;
        font-weight: 600;
        flex-shrink: 0;
        color: #666;
      }
      img {
        height: 100%;
        margin-right: 30px;
        flex-shrink: 0;
      }
      .detail {
        flex-basis: 800px;
        text-align: left;
        h3 {
          .fs(22);
          margin-bottom: 10px;
        }
        p {
          .fs(14);
          color: #999;
        }
      }
      .grade {
        color: @orange-color;
        .fs(40);
        font-weight: 500;
      }
      .peopleNum {
        .fs(24);
        color: @orange-color;
        width: 150px;
        flex-shrink: 0;
      }
    }
  }
}
@media (max-width: @sm-max) {
  [board] {
    .list .item {
      height: 150px;
      .seq {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-right: 15px;
        .fs(22);
      }
      img {
        height: 100%;
        margin-right: 15px;
        width: auto;
      }
      .detail {
        h3 {
          .fs(18);
        }
        p {
          .fs(12);
          margin-bottom: 5px;
        }
        div {
          .fs(14);
          color: @orange-color;
        }
      }
      .grade {
        .fs(30);
      }
      .peopleNum {
        .fs(20);
        width: 100px;
      }
    }
  }
}
</style>
