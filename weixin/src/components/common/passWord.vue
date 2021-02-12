<template>
  <div class="pw-box" @mousescroll.prevent @touchmove.prevent v-if="show">
    <div class="cover"></div>
    <div class="pw">
      <div class="outer-box">
        <img src="../../assets/img/pw-bc.png" alt="" class="icon">
        <div class="pw-title">登录</div>
        <div class="input-box">
          <myInput placeholder="请输入项目密码" v-model="pw"></myInput>
        </div>
        <button class="pw-btn" @click="ok">确认</button>
        <div class="tip">
          如不知道密码，请联系项目负责人
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import myInput from '@/components/common/input.vue'
export default {
  data() {
    return {
      pw: '',
      show: true
    }
  },
  props: {
    id: {

    }
  },
  components: {
    myInput
  },
  mounted() {
    this.$util.getOpenCode();
  },
  methods: {
    ok() {
      if (this.pw == '') {
        this.$notify('请输入密码')
        return false
      }
      this.$https.post(this.$api.checklogin, {
        pro_id: this.id,
        pro_password: this.pw,
        identify: this.$util.Md5(this.id + 'map')
      }).then(res => {
        if (res.data.status == 0) {
          this.show = false
          sessionStorage.setItem('hasPass', true)
          this.$emit('after', res.data)
        } else if (res.data.status == -2) {
          this.$router.replace(`/projectClose?name=${window.encodeURIComponent(res.data.message)}`)
        } else {
          this.$notify(res.data.message)
        }
      })
      // this.show = false
      // sessionStorage.setItem('hasPass', true)
      // this.$emit('after')
    }
  }
}
</script>
<style lang="less" scoped>
.pw-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/answer-cover.png) no-repeat top center;
    .backgroundSize(cover);
    z-index: 10;
  }
  .pw {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    width: 300px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 40;
    .outer-box {
      width: 300px;
      height: 388px;
      padding-top: 31px;
      background: #fff;
      border-radius: 15px;
      .icon {
        display: block;
        width: 111px;
        margin: 0 auto;
      }
      .pw-title {
        font-size: 18px;
        color: #262626;
        text-align: center;
        line-height: 28px;
        font-weight: bold;
      }
      .input-box {
        width: 260px;
        height: 44px;
        margin: 25px auto 0;
      }
      .pw-btn {
        display: block;
        width: 200px;
        height: 50px;
        background: @main_color;
        margin: 52px auto 0;
        color: #fff;
        font-size: 16px;
        border-radius: 8px;
      }
      .tip {
        text-align: center;
        font-size: 14px;
        color: #c8c8c8;
        line-height: 74px;
      }
    }
  }
}
</style>