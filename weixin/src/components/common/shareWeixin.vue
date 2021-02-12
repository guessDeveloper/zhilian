<template>
  <div class="share-weixin" @mousescroll.prevent @touchmove.prevent>
    <div class="box" @click="hide">
      <div class="arrow">

      </div>
      <div class="tip">
        点击右上角<div class="share-menu"></div> 分享给好友<div class="share-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>
<style lang="less" scoped>
.share-weixin {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .box {
    position: relative;
    width: 100%;
    height: 100%;
    .arrow {
      position: absolute;
      top: 5px;
      right: 38px;
      width: 82px;
      height: 98px;
      background: url(../../assets/img/share-arrow.png) no-repeat center center;
      .backgroundSize(100%);
    }
    .tip {
      position: absolute;
      top: 108px;
      width: 100%;
      .flexbox;
      font-size: 16px;
      color: #fff;
      align-items: center;
      justify-content: center;
      .share-btn {
        width: 36px;
        height: 36px;
        margin: 0 8px;
        background: url(../../assets/img/share-btn.png) no-repeat center center;
        .backgroundSize(100%);
      }
      .share-menu {
        width: 36px;
        height: 36px;
        margin: 0 8px;
        background: url(../../assets/img/share-menu.png) no-repeat center center;
        .backgroundSize(100%);
      }
    }
  }
}
</style>