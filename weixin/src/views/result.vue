<template>
  <div class="result-page">
    <van-dialog v-model="show" show-cancel-button @confirm="emailOk">
      <Email ref="sendEmail" />
    </van-dialog>
  </div>
</template>
<script>
import Email from '@/components/common/email'
export default {
  data() {
    return {
      show: true
    }
  },
  components: {
    Email
  },
  methods: {
    emailOk() {
      this.$refs.sendEmail.save()
    }
  }
}
</script>
<style lang="less" scoped>
.result-page {
  width: 100%;
  height: 100%;
}
</style>