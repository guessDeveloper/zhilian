<template>
  <div class="erweima-box" @mousescroll.prevent @touchmove.prevent>
    <div class="cover">
    </div>
    <div class="erweima">
      <div class="outer-box">
        <div class="img-box">
          <img src="../../assets/img/erweim.png" alt="">
        </div>
        <div class="btn-box">
          <button class="btn"><span class="icon-link"></span><span class="btn-name">复制项目链接</span></button>
          <button class="btn"><span class="icon-erweima"></span><span class="btn-name">下载项目二维码</span></button>
        </div>
      </div>
      <div class="close"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

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
      width: 315px;
      height: 465px;
      background: #007fff;
      border-radius: 15px;
      .img-box {
        height: 320px;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
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
</style>