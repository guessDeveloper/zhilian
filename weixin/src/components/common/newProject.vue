<template>
  <div class="new-project-box">
    <div class="title">新建项目</div>
    <div class="input-big-box">
      <label for="">项目名称<span>*</span></label>
      <div class="input-out-box">
        <myInput placeholder="请输入项目名称" v-model="name" limit="20"></myInput>
      </div>
      <label for="">项目描述</label>
      <div class="textarea-box" :class="{focus:textFocus}">
        <textarea name="" id="" class="textarea" placeholder="请输入项目描述" v-model="description" @focus="textFocus=true" @blur="textareaBlur" maxlength="200"></textarea>
        <div class="limit">{{description.length}}/200</div>
      </div>
      <label for="">设置项目登录密码<span>*</span></label>
      <div class="input-out-box">
        <myInput placeholder="请输入项目密码" v-model="pwd" :class="{error:pwdError}" @input="passChange"></myInput>
        <div class="tip">
          <span class="icon"></span><span>请输入由6-15位英文字母、数字组成的密码</span>
        </div>
      </div>

      <label for="">设置胜任力潜质选择数量上限<span>*</span></label>
      <div class="input-out-box">
        <div class="pick-box" @click="limitSelect">
          {{limit}}
          <div class="icon"></div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <button class="cancle" @click="close">取消</button>
      <button class="ok" @click="add">确认</button>
    </div>

  </div>
</template>
<script>

import myInput from '@/components/common/input.vue'
export default {
  data() {
    return {
      name: '',
      description: '',
      pwd: '',
      pwdError: false,
      limit: '6-7',
      textFocus: false,
      lock: false
    }
  },
  components: {
    myInput
  },
  methods: {
    add() {

      if (this.name == '') {
        this.$notify('请输入项目名称')
        return false
      }
      if (/"|'|<|>|\//.test(this.name) || /"|'|<|>|\//.test(this.description)) {
        this.$notify('不能输入",' + "',/,<,>特殊符号")
        return false
      }
      if (this.pwd == '') {
        this.$notify('请输入项目登录密码')
        return false
      }
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.pwd)) {
        this.$notify('请输入由6-15位英文字母、数字组成的密码')
        this.pwdError = true;
        return false
      }
      if (this.lock == true) {
        return false
      }
      this.lock = true
      //调用新建接口
      console.log(this.limit.split('-'))
      this.$https.post(this.$api.addproject, {
        pro_name: this.name,
        pro_note: this.description,
        limit_num: this.limit.split('-')[1],
        pro_password: this.pwd,
        identify: this.$util.Md5(localStorage.getItem('openId') + 'map')
      }).then(res => {
        if (res.data.status == 0) {
          this.name = '';
          this.description = ''
          this.pwdError = false;
          this.pwd = ''
          this.$emit('success')
        } else {
          this.$notify(res.data.message)
        }
        this.lock = false
      }).catch(() => {
        this.lock = false
        this.$notify('系统异常，请稍后重试')
      })
      // this.$emit('add', { list: '' })
    },
    close() {
      this.name = '';
      this.description = ''
      this.pwd = ''
      this.$emit('close')
    },
    limitSelect() {
      this.$emit('limitSelectShow')
    },
    changeLimit(value) {
      this.limit = value
    },
    passChange() {
      this.pwdError = false
    },
    textareaBlur() {
      this.textFocus = false
      const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    }

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
    .input-out-box {
      margin-bottom: 10px;
      .tip {
        font-size: 12px;
        color: #999999;
        line-height: 30px;
        span {
          vertical-align: middle;
        }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: middle;
          margin-right: 4px;
          background: url(../../assets/img/pass-tip.png) no-repeat center center;
          .backgroundSize(100%);
        }
      }
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
      position: relative;
      border: 1px solid @input_border_color;
      border-radius: 4px;
      padding: 14px 10px 20px 10px;
      margin-bottom: 10px;
      -webkit-transtion: all 0.3s ease;
      transition: all 0.3s ease;
      .limit {
        position: absolute;
        right: 10px;
        bottom: 5px;
        font-size: 16px;
        line-height: 20px;
        color: @placeholder_color;
      }
      &.focus {
        border-color: @main_color;
      }
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