<template>
  <div class="page">
    <div class="allret">
      <img src="../assets/img/submit-all.png" alt="">
      <div class="tip">您的结果已顺利提交</div>
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
.page {
  width: 100%;
  height: 100%;
  .allret {
    width: 100%;
    height: 100%;
    padding-top: 115px;
    img {
      display: block;
      margin: 0 auto;
      width: 155px;
    }
    .tip {
      font-size: 16px;
      text-align: center;
      line-height: 80px;
      color: @cancle_color;
    }
  }
}
</style>