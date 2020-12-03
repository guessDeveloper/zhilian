<template>
  <div class="new-project-box">
    <div class="title">新建项目</div>
    <div class="input-big-box">
      <label for="">项目名称<span>*</span></label>
      <div class="input-box">
        <myInput placeholder="请输入项目名称" :value.sync="name" limit="20"></myInput>
      </div>
      <label for="">项目描述</label>
      <div class="textarea-box">
        <textarea name="" id="" class="textarea" placeholder="请输入项目描述"></textarea>
      </div>
    </div>
    <div class="btn-box">
      <button class="cancle">取消</button>
      <button class="ok">确认</button>
    </div>
  </div>
</template>
<script>
import myInput from '@/components/common/input.vue'
export default {
  data() {
    return {
      name: '',

    }
  },
  components: {
    myInput
  }
}
</script>
<style lang="less" scoped>
.new-project-box {
  width: 315px;
  background: #fff;

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
      textarea {
        border: 0;
        width: 255px;
        height: 100px;
        font-size: 16px;
        &::placeholder {
          color: @placeholder_color;
        }
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