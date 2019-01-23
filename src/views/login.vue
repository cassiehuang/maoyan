<template>
  <div login>
    <div class="container">
      <img class="logo" src="/public/img/logo.png" />
      <img class="pic" src="/public/img/image1.png" />
      <div class="input-banner" :class="{error: errorHint}">
        <input type="text" v-model="username" placeholder="输入用户名" />
        <input type="password" v-model="password" placeholder="输入密码" />
        <input type="button" value="登录" @click="submit"/>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/utils/api_helper.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      errorHint: false,
    }
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    submit() {
      if (this.username === '') return this.errorHint = true;
      if (this.password === '') return this.errorHint = true;
      login({username: this.username, password: this.password}).then((data) => {
        if(!data.username) {
          this.errorHint = true;
        } else {
          this.$store.commit('CHANGE_LOADING', data);
          this.$router.push('/home');
        }
      })
    }
  },
  watch: {
    username() {
      this.errorHint = false;
    },
    password() {
      this.errorHint = false;
    }
  }
}

</script>
<style scoped lang="less">
@import '~@/less/common.less';
[login] {
  position: absolute;
  top: 0;
  bottom: 100px;
  width: 100%;
  text-align: center;
  display: flex;
  //align-items: center;
  .logo {
   display: block;
   margin: 30px auto;
   width: 150px;
   padding-right: 400px;
  }
  .input-banner {
    width: 400px;
    height: 200px;
    display: inline-block;
    vertical-align: top;
    padding-top: 100px;
    &.error {
      input {
        border:1px solid @red-color;
      }
    }
    input {
      margin: 10px 0px;
      height: 34px;
      .fs(13);
      width: 270px;
      box-sizing: border-box;
      &[type="button"] {
        background: @red-color;
        color: #fff;
        border: none;
        .fs(13);
      }
    }
  }
  .container {
    width: 100%;
    text-align: center;
    .pic {
      display: inline-block;
      margin-right: 50px;
    }
  }
}
@media (max-width: @md-max) {
  [login] {
    align-items: center;
    .logo {
      padding: 0;
    }
    .container {
      .pic {
        padding-right: 30px;
        display: block;
        margin: 0 auto;
        width: 300px;
      }
      .input-banner {
        width: 350px;
        padding-top: 20px;
      }
    }
  }
}
</style>
