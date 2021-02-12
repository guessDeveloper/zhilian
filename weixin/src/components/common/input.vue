<template>
  <div class="input-box" :class="{focus:isFocus}">
    <input type="text" :value="value" :placeholder="placeholder" @input="onInput($event.target.value)" @focus="isFocus=true" @blur="isFocus=false"><span v-if="limit" class="limit">{{val.length}}/{{limit}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: '',
      isFocus: false
    }
  },
  props: {
    value: {},
    placeholder: {

    },
    limit: {

    }
  },
  methods: {
    onInput(value) {
      if (this.limit) {
        this.val = value
        this.val.length > this.limit ? this.val = this.val.slice(0, this.limit) : ''
        this.$emit('input', this.val)
      } else {
        this.$emit('input', value)
      }
    },
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
  -webkit-transtion: all 0.3s ease;
  transition: all 0.3s ease;
  &.focus {
    border-color: @main_color;
  }
  &.error {
    border-color: #ff0001;
  }
  & + input:focus {
    border-color: @main_color;
  }
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