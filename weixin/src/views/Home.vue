<template>
  <div class="home">
    <!-- <div v-show="workList.length==0" class="empty-box">
      <img src="../assets/img/empty.png" alt="" class="empty-img">
      <div class="empty-name">暂无项目</div>
      <button class="btn">新建项目</button>
    </div> -->
    <!-- <div class="work-list">

    </div> -->
    <van-popup v-model="showNew" :close-on-click-overlay="false">
      <new-project></new-project>
    </van-popup>
  </div>
</template>

<script>
import newProject from '@/components/common/newProject'
import NewProject from '../components/common/newProject.vue'
export default {
  name: 'Home',
  data() {
    return {
      val: '',
      workList: [],
      showNew: true,
    }
  },
  components: {
    newProject
  },
  mounted() {
    NewProject

  },

}
</script>
<style lang="less" scoped>
.empty-box {
  padding-top: 121px;
  .empty-img {
    display: block;
    width: 163px;
    margin: 0 auto;
  }
  .empty-name {
    text-align: center;
    font-size: 18px;
    color: @subtitle_color;
    line-height: 91px;
  }
  .btn {
    display: block;
    width: 160px;
    height: 50px;
    margin: 60px auto 0;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    background: @main_color;
  }
}
</style>
