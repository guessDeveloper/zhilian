<template>
  <div class="card">
    <div class="card-top">
      <div class="part-one">
        <div class="name">智鼎优源2020MAP建模项目智鼎优源2020MAP建模项目</div>
        <div class="time">创建时间：<span>2020-11-05</span></div>
        <div class="state running">进行中</div>
      </div>
      <div class="part-two">
        <div class="num">0</div>
        <div class="num-name">回收进度</div>
      </div>
    </div>
    <div class="card-bottom">
      <div class="item"><span class="icon icon-share"></span><span class="name">分享至微信</span></div>
      <div class="item"><span class="icon icon-link"></span><span class="name">查看项目链接</span></div>
      <div class="item"><span class="icon icon-resoult"></span><span class="name">查看结果</span></div>
    </div>
    <div class="more" @click="show=true">
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import Vue from 'vue'
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
export default {
  data() {
    return {
      show: false,
      actions: [{ name: '删除项目' }, { name: '暂停项目' }, { name: '取消', color: '#0154A8' }],
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      if (item.name == '暂停项目') {
        this.$dialog.confirm({
          title: '暂停项目',
          message: '暂停项目会导致相关人员无法评估，请确认',
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });

      } else if (item.name == '删除项目') {
        this.$dialog.confirm({
          title: '暂停项目',
          message: '暂停项目会导致相关人员无法评估，请确认',
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }


    },
  }
}
</script>
<style lang="less" scoped>
.card {
  position: relative;
  width: 345px;
  height: 163px;
  border-radius: 5px;
  background: #fff;
  margin: 0 auto 20px;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
  .more {
    position: absolute;
    top: 20px;
    right: 15px;
    width: 16px;
    height: 16px;
    background: url(../../assets/img/icon-more.png) no-repeat center center;
    .backgroundSize(100%);
  }
  .card-top {
    .flexbox;
    height: 127px;

    .part-one {
      width: 255px;
      padding: 10px 20px 0 20px;
      .name {
        font-size: 16px;
        font-weight: bold;
        line-height: 36px;
        .onelineText;
      }
      .time {
        font-size: 12px;
        line-height: 22px;
        color: @subtitle_color;
        span {
          color: #666;
        }
      }
      .state {
        width: 60px;
        height: 20px;
        margin-top: 10px;
        border-radius: 4px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        &.running {
          background: @running;
        }
        &.suspend {
          background: @suspend;
        }
      }
    }
    .part-two {
      position: relative;
      width: 89px;
      padding-top: 52px;
      &::before {
        position: absolute;
        left: 0;
        top: 28px;
        content: "";
        width: 0;
        height: 81px;
        border-right: 1px solid #f3f5f9;
      }
      .num {
        text-align: center;
        font-size: 20px;
        color: @main_color;
        font-weight: bold;
        line-height: 26px;
      }
      .num-name {
        font-size: 12px;
        line-height: 22px;
        text-align: center;
      }
    }
  }
  .card-bottom {
    .flexbox;
    color: @main_color;
    border-top: 1px solid #f3f5f9;
    font-size: 12px;
    .item {
      position: relative;
      width: 33.33%;
      line-height: 35px;
      text-align: center;
      .name {
        vertical-align: middle;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        right: 0;
        width: 0;
        height: 16px;
        border-right: 1px solid #f0f0f0;
      }
      &:nth-child(3) {
        &::after {
          display: none;
        }
      }
    }
    .icon-share,
    .icon-link,
    .icon-resoult {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 3px;
      vertical-align: middle;
      background: url(../../assets/img/icon-share.png) no-repeat center center;
      .backgroundSize(100%);
    }
    .icon-link {
      background: url(../../assets/img/icon-link.png) no-repeat center center;
      .backgroundSize(100%);
    }
    .icon-resoult {
      background: url(../../assets/img/icon-result.png) no-repeat center center;
      .backgroundSize(100%);
    }
  }
}
</style>