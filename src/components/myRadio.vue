<template>
  <div radio-group>
    <div class="input-wrap" v-for="item in myRadioList" :key="item.value">
      <input type="radio" :value="item.value" :name="name" v-model="radioValue"/>
      <label>{{item.label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioValue: this.value,
    };
  },
  props: ['myRadioList', 'name', 'value'],
  components: {},

  computed: {},

  mounted() { },

  methods: {},
  watch: {
    radioValue(newValue) {
      this.$emit('radioType', newValue);
    },
    value(newValue) {
      this.radioValue = newValue;
    },
  },
};

</script>
<style scoped lang="less">
@import '~@/less/common.less';
[radio-group] {
  text-align: left;
  .input-wrap {
    display: inline-block;
    margin-right: 30px;
    .fs(14);
    input {
      margin-right: 25px;
      width: 1px;
      position: relative;
      padding: 0 7px;
      &::before {
        content:'';
        position: absolute;
        top:0;
        left: 0;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 50%;
        .border();
      }
      &:checked {
        &::before {
          border: 5px solid @red-color;
        }
      }
    }
  }
}
@media (max-width: @sm-max) {
  [radio-group] {
    text-align: center;
    .input-wrap {
      margin-right: 10px;
      input {
        margin-right: 20px;
      }
    }
  }
}
</style>
