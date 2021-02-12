<template>
  <div class="erweima-box" @mousescroll.prevent @touchmove.prevent>
    <div class="cover">
    </div>
    <div class="erweima" id="erweimaBox">
      <div class="outer-box">
        <img :src="coverUrl" alt="" class="cover-img">
        <div class="img-box" id="erweima">
          <div class="title">
            {{data.pro_name}}邀请函
          </div>
          <div class="er-box">
            <img :src="data.qrcode_img" alt="">
          </div>
          <img src="../../assets/img/erweim.png" alt="">
        </div>
        <div class="tip"><span class="icon"></span>长按图片可保存或分享</div>
        <div class="btn-box">
          <button class="btn" v-clipboard:copy="'欢迎您参与MAP胜任力卡片建模，请通过微信浏览器访问：'+data.qrcode_url+' 进行建模'" v-clipboard:success="onCopy"><span class="icon-link"></span><span class="btn-name">复制项目链接</span></button>
        </div>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  data() {
    return {
      coverUrl: ''
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onCopy() {
      this.$notify('已将内容粘贴至剪贴板')
    },
    //生成图片
    showUrl(img) {
      this.coverUrl = img
    }

  }
}
</script>
<style lang="less" scoped>
.erweima-box {
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
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
  .erweima {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    width: 315px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 40;
    .outer-box {
      position: relative;
      width: 315px;
      height: 434px;
      background: #007fff;
      border-radius: 15px;
      .cover-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        z-index: 200;
      }
      .img-box {
        position: relative;
        height: 320px;
        overflow: hidden;
        .title {
          .flexbox;
          position: absolute;
          top: 21px;
          width: 265px;
          height: 52px;
          align-items: center;
          justify-content: center;
          left: 0;
          right: 0;
          text-align: center;
          margin: 0 auto;
          font-size: 22px;
          line-height: 26px;
          font-weight: bold;
          color: #fff;
          // font-style: italic;
          font-family: YouSheBiaoTiHei;
        }
        .er-box {
          position: absolute;
          top: 140px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 120px;
          height: 120px;
          z-index: 100;
        }
        img {
          display: block;
          width: 100%;
          pointer-events: none;
        }
      }
      .btn-box {
        text-align: center;
        .btn {
          width: 255px;
          height: 50px;
          background: @main_color;
          border-radius: 6px;
          color: #fff;
          font-size: 14px;
          margin-bottom: 15px;
          .btn-name {
            vertical-align: middle;
          }
        }

        .icon-link {
          display: inline-block;
          width: 21px;
          height: 21px;
          vertical-align: middle;
          margin-right: 4px;
          background: url(../../assets/img/btn-link.png) no-repeat center center;
          .backgroundSize(100%);
        }
        .icon-erweima {
          display: inline-block;
          width: 21px;
          height: 21px;
          vertical-align: middle;
          margin-right: 4px;
          background: url(../../assets/img/btn-erweima.png) no-repeat center
            center;
          .backgroundSize(100%);
        }
      }
    }
    .close {
      width: 35px;
      height: 35px;
      margin: 20px auto 0;
      background: url(../../assets/img/icon-close.png) no-repeat center center;
      .backgroundSize(100%);
    }
  }
}
.tip {
  text-align: center;
  font-size: 12px;
  color: #fff;
  margin-bottom: 20px;
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../../assets/img/erweima-tip.png) no-repeat center center;
    .backgroundSize(100%);
    margin-right: 4px;
  }
}
</style>