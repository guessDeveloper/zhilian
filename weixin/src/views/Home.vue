<template>
  <div class="home">
    <div v-show="workList.length==0" class="empty-box">
      <img src="../assets/img/empty.png" alt="" class="empty-img">
      <div class="empty-name">暂无项目</div>
      <button class="btn" @click="showNew=true">新建项目</button>
    </div>
    <div class="work-list" v-show="workList.length!=0">
      <div class="search-big-box">
        <div class="search-box">
          <span class=""></span><input type="text" placeholder="请输入搜索内容">
        </div>
      </div>
      <div class="chose-box">
        <div class="chose-inner">
          <div class="chose-btn">
            <div class="chose-name">全部项目</div>
            <div class="chose-icon">
              <img src="../assets/img/icon-down.png" alt="">
            </div>
          </div>
          <button class="new-btn">新建项目</button>
        </div>
      </div>
      <div class="card-list-box">
        <card v-for="(item,index) in workList" :key="index"></card>
      </div>
    </div>
    <van-popup v-model="showNew" :close-on-click-overlay="true">
      <new-project @add="add"></new-project>
    </van-popup>
    <!-- <erweima></erweima> -->
  </div>
</template>

<script>
import newProject from '../components/common/newProject.vue'
import card from '@/components/home/projectCard.vue'
import erweima from '@/components/home/propErweima.vue'
export default {
  name: 'Home',
  data() {
    return {
      val: '',
      workList: [1, 2, 3, 4, 5, 6, 7, 8, 9,],
      showNew: false,

    }
  },
  components: {
    newProject,
    card,
    erweima
  },
  mounted() {

  },
  methods: {
    add(item) {
      this.showNew = false
      this.workList.push(item)
    }
  }
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
.search-big-box {
  padding: 10px 0;
  background: #fff;
  .search-box {
    width: 345px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    border-radius: 6px;
    background: #f7f7f7;
    input {
      border: 0;
      background: none;
      font-size: 14px;
    }
  }
}

.home {
  height: 100%;
}
.work-list {
  height: 100%;
  background: #f3f5f9;
}
.chose-box {
  background: #fff;
  padding-top: 5px;
  padding-bottom: 15px;
  .chose-inner {
    .flexbox;
    width: 345px;
    margin: 0 auto;
    justify-content: space-between;
    .chose-btn {
      .flexbox;
      width: 100px;
      height: 36px;
      padding: 0 13px 0 15px;
      border: 1px solid @placeholder_color;
      border-radius: 6px;
      justify-content: space-between;
      .chose-name {
        line-height: 36px;
        font-size: 14px;
      }
      .chose-icon {
        width: 8px;
        img {
          display: block;
          width: 100%;
          margin-top: 13px;
        }
      }
    }
    .new-btn {
      width: 230px;
      height: 36px;
      color: #a0cbf6;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid #a0cbf6;
    }
  }
}
.card-list-box {
  padding-top: 20px;
  overflow: hidden;
}
</style>
