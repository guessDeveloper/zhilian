<template>
  <div class="new-project-box">
    <div class="title">修改项目名称</div>
    <div class="input-big-box">
      <div class="input-box">
        <myInput placeholder="请输入项目名称" v-model="projectName" limit="20"></myInput>
      </div>
    </div>
    <!-- <div class="btn-box">
      <button class="cancle" @click="close">取消</button>
      <button class="ok" @click="add">确认</button>
    </div> -->

  </div>
</template>
<script>

import myInput from '@/components/common/input.vue'
export default {
  data() {
    return {
      projectName: ''
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  components: {
    myInput
  },
  methods: {
    init() {
      this.projectName = this.data.pro_name
      console.log(this.name)
    },
    getNewName() {
      return this.projectName
    },
    limitSelect() {
      this.$emit('limitSelectShow')
    },

  }
}
</script>
<style lang="less" scoped>
.new-project-box {
  width: 315px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;

  .title {
    padding-top: 10px;
    text-align: center;
    font-size: 18px;
    line-height: 38px;
    font-weight: bold;
  }
  .input-big-box {
    padding: 0 20px 20px 20px;
    .input-box {
      margin-bottom: 10px;
    }
    label {
      font-size: 14px;
      font-weight: bold;
      line-height: 34px;
      span {
        color: @focus_color;
      }
    }
    .textarea-box {
      border: 1px solid @input_border_color;
      border-radius: 4px;
      padding: 14px 10px;
      margin-bottom: 10px;
      textarea {
        border: 0;
        width: 255px;
        height: 52px;
        font-size: 16px;
        &::placeholder {
          color: @placeholder_color;
        }
      }
    }
    .pick-box {
      position: relative;
      width: 100%;
      height: 44px;
      padding: 0 10px;
      line-height: 44px;
      font-size: 16px;
      border: 1px solid @input_border_color;
      border-radius: 4px;
      justify-content: space-between;
      .icon {
        position: absolute;
        right: 13px;
        top: 19px;
        width: 10px;
        height: 6px;
        background: url(../../assets/img/icon-down.png) center center no-repeat;
        .backgroundSize(100%);
      }
    }
  }
  .btn-box {
    .flexbox;
    border-top: 1px solid @btn_box_border;
    button {
      display: block;
      width: 50%;
      height: 48px;
      font-size: 16px;
      color: @main_color;
      background: #fff;
      &:nth-child(1) {
        color: @cancle_color;
        border-right: 1px solid @btn_box_border;
      }
    }
  }
}
</style>