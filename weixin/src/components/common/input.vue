<template>
  <div class="input-box">
    <input type="text" v-model="value" :placeholder="placeholder" @input="onInput"><span v-if="limit" class="limit">{{value.length}}/{{limit}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    value: {

    },
    placeholder: {

    },
    limit: {

    }
  },
  methods: {
    onInput() {
      if (this.limit) {
        console.log(this.value.length)
        this.value.length > this.limit ? this.value = this.value.slice(0, this.limit) : ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.input-box {
  .flexbox;
  width: 100%;
  height: 44px;
  padding: 0 10px;
  line-height: 44px;
  border: 1px solid @input_border_color;
  border-radius: 4px;
  justify-content: space-between;
  input {
    display: block;
    width: 208px;
    border: 0;
    font-size: 16px;
  }
  .limit {
    // padding-left: 10px;
    font-size: 16px;
    color: @placeholder_color;
  }
}
</style>