<template>
  <div class="email-box">
    <div class="title">发送数据至邮箱</div>
    <div class="email">
      <div class="tip">请输入收件人邮箱<span>*</span></div>
      <div class="input-list">
        <div class="input-box" v-for="(item,index) in inputList" :key="index">
          <input type="text" v-model="item.value"> <span class="cancle" v-show="inputList.length!==1" @click="remove(index)"></span><span class="add" v-show="inputList.length-1==index" @click="add"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputList: [{ value: '' }]
    }
  },
  methods: {
    add() {
      this.inputList.push({ value: '' })
    },
    remove(myindex) {
      this.inputList = this.inputList.filter(
        (currentValue, index) => index != myindex
      )
    },
    save() {
      var result = this.inputList.map(item => item.value);
      result = result
        .filter(function (item) {
          return item;
        })
        .join(",");
      console.log(result)
    }
  }
}
</script>
<style lang="less" scoped>
.email-box {
  height: 243px;
  padding-top: 10px;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 38px;
  }
  .email {
    padding: 0 20px;
    border-bottom: 1px solid #e6e6e6;
    .tip {
      font-size: 14px;
      line-height: 34px;
      font-weight: bold;
      span {
        color: #ed2121;
      }
    }
    .input-list {
      height: 161px;

      overflow-y: scroll;
    }
    .input-box {
      .flexbox;
      margin-bottom: 12px;
      input {
        display: block;
        width: 190px;
        height: 34px;
        font-size: 14px;
        padding: 0 10px;
        border: 1px solid #e8eef4;
        border-radius: 4px;
        margin-right: 10px;
      }
      .cancle {
        display: block;
        width: 34px;
        height: 34px;
        background: url(../../assets/img/input-cancle.png) no-repeat center
          center;
        .backgroundSize(100%);
        margin-right: 7px;
      }
      .add {
        display: block;
        width: 34px;
        height: 34px;
        background: url(../../assets/img/input-add.png) no-repeat center center;
        .backgroundSize(100%);
      }
    }
  }
}
</style>