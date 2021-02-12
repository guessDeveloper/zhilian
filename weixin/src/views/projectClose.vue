<template>
  <div class="page">
    <div class="allret">
      <img src="../assets/img/all-close.png" alt="">
      <div class="tip">{{name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    this.name = window.decodeURIComponent(this.$route.query.name)
  }
}
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #fff;
  .allret {
    width: 100%;
    height: 100%;
    padding-top: 115px;
    img {
      display: block;
      margin: 0 auto;
      width: 236px;
    }
    .tip {
      font-size: 18px;
      text-align: center;
      line-height: 80px;
      color: @cancle_color;
    }
  }
}
</style>