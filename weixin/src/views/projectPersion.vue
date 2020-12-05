<template>
  <div class="page-box">
    <div class="btn-box">
      <button class="btn-result">生成结果</button>
    </div>
    <div class="chose-all-box">
      <van-checkbox v-model="checkeALL" shape="square">全选</van-checkbox>
      <div class="date-name">提交日期</div>
    </div>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <div class="chose-line">
        <div class="persion-box">
          <van-checkbox name="a" shape="square"></van-checkbox>
          <div class="persion-img">

          </div>
          <div class="name-box">
            <div class="name">大上海滩</div>
            <div class="sex">男</div>
          </div>
        </div>
        <div class="date">
          2020-12-01 13:22
        </div>
      </div>
    </van-checkbox-group>

  </div>
</template>
<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  data() {
    return {
      checkeALL: false,
      result: []
    }
  }
}
</script>
<style lang="less" scoped>
.page-box {
  width: 100%;
  min-height: 100%;
  background: #fff;
  .btn-box {
    border-top: 8px solid @body_color;
    overflow: hidden;
  }
  .btn-result {
    display: block;
    margin: 15px auto 0;
    width: 345px;
    height: 46px;
    border: 1px solid #a0cbf6;
    border-radius: 6px;
    color: #a0cbf6;
    font-size: 14px;
  }
}
.chose-all-box {
  .flexbox;
  padding-left: 15px;
  line-height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid #f3f5f9;
  .date-name {
    width: 132px;
    font-size: 16px;
    text-align: center;
  }
}
.chose-line {
  .flexbox;
  justify-content: space-between;
  height: 78px;
  border-bottom: 1px solid #f3f5f9;
  .persion-box {
    .flexbox;
    padding-left: 15px;
    align-items: center;
    .persion-img {
      width: 48px;
      height: 48px;
      border-radius: 48px;
      background: #ccc;
      margin-left: 15px;
    }
    .name-box {
      margin-left: 16px;
      .name {
        width: 120px;
        .onelineText;
        font-size: 14px;
        line-height: 20px;
      }
      .sex {
        font-size: 14px;
        line-height: 18px;
        color: @subtitle_color;
      }
    }
  }
  .date {
    width: 132px;
    font-size: 12px;
    text-align: center;
    color: #666666;
    line-height: 78px;
  }
}
</style>