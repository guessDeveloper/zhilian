<template>
  <div class="email-box">
    <div class="title">发送数据至邮箱</div>
    <div class="email">
      <div class="tip">请输入收件人邮箱<span>*</span></div>
      <div class="input-list">
        <div class="input-box" v-for="(item,index) in inputList" :key="index" :class="{error:item.error}">
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
      inputList: [{ value: '', error: false }]
    }
  },
  methods: {
    add() {
      this.inputList.push({ value: '', error: false })
    },
    remove(myindex) {
      this.inputList = this.inputList.filter(
        (currentValue, index) => index != myindex
      )
    },
    //校验
    emailValite() {
      this.inputList.forEach(Element => {
        if (!/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(Element.value)) {
          Element.error = true;
        } else {
          Element.error = false
        }
      })
    },
    save() {
      this.emailValite();
      let s = this.inputList.some(item => item.error == true)
      if (s) {
        return this.inputList
      } else {
        var result = this.inputList.map(item => item.value);
        result = result
          .filter(function (item) {
            return item;
          })
          .join(",");
        return result
      }

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
    // border-bottom: 1px solid #e6e6e6;
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
      &.error {
        input {
          border-color: #ff0001;
        }
      }
      input {
        display: block;
        width: 190px;
        height: 34px;
        font-size: 14px;
        padding: 0 10px;
        border: 1px solid #e8eef4;
        border-radius: 4px;
        margin-right: 10px;
        -webkit-transtion: all 0.3s ease;
        transition: all 0.3s ease;
        &:focus {
          border-color: @main_color;
        }
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