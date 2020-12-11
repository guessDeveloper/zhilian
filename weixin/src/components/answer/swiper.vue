<template>
  <div class="swiper-box" @mousescroll.prevent @touchmove.prevent v-show="show">
    <div class="cover">
    </div>
    <div class="middle-box">
      <div class="box" :class="type">
        <van-swipe class="my-swipe" indicator-color="#0154A8" v-show="show" ref="mySwiper" :initial-swipe="index">
          <van-swipe-item>
            <div class="item">
              <div class="title">M1-1开放创新</div>
              <div class="tip">定义：敢于打破常规，尝试新鲜事物，愿意为工作争取突破性进展。</div>
              <div class="top">
                <div class="part-title">
                  正向行为
                </div>
                <div class="content">
                  常常打破常规，采用新颖的方法解决问题。<br>
                  愿意尝试新事物，在工作中常常提出新观点。<br>
                  愿意接受有挑战性的任务，希望在工作中取得新突破。<br>
                </div>
              </div>
              <div class="bottom">
                <div class="part-title">
                  负向行为
                </div>
                <div class="content">
                  严格拘泥于规则，处理问题不够灵活。<br>
                  对新事物开放接受度不够，固着于旧的思维方式。<br>
                  满足于工作现状，不愿意寻求新变化。<br>
                </div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="item">
              <div class="title">M1-1开放创新</div>
              <div class="tip">定义：敢于打破常规，尝试新鲜事物，愿意为工作争取突破性进展。</div>
              <div class="top">
                <div class="part-title">
                  正向行为
                </div>
                <div class="content">
                  常常打破常规，采用新颖的方法解决问题。<br>
                  愿意尝试新事物，在工作中常常提出新观点。<br>
                  愿意接受有挑战性的任务，希望在工作中取得新突破。<br>
                </div>
              </div>
              <div class="bottom">
                <div class="part-title">
                  负向行为
                </div>
                <div class="content">
                  严格拘泥于规则，处理问题不够灵活。<br>
                  对新事物开放接受度不够，固着于旧的思维方式。<br>
                  满足于工作现状，不愿意寻求新变化。<br>
                </div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="item">
              <div class="title">M1-1开放创新</div>
              <div class="tip">定义：敢于打破常规，尝试新鲜事物，愿意为工作争取突破性进展。</div>
              <div class="top">
                <div class="part-title">
                  正向行为
                </div>
                <div class="content">
                  常常打破常规，采用新颖的方法解决问题。<br>
                  愿意尝试新事物，在工作中常常提出新观点。<br>
                  愿意接受有挑战性的任务，希望在工作中取得新突破。<br>
                </div>
              </div>
              <div class="bottom">
                <div class="part-title">
                  负向行为
                </div>
                <div class="content">
                  严格拘泥于规则，处理问题不够灵活。<br>
                  对新事物开放接受度不够，固着于旧的思维方式。<br>
                  满足于工作现状，不愿意寻求新变化。<br>
                </div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="item">
              <div class="title">M1-1开放创新</div>
              <div class="tip">定义：敢于打破常规，尝试新鲜事物，愿意为工作争取突破性进展。</div>
              <div class="top">
                <div class="part-title">
                  正向行为
                </div>
                <div class="content">
                  常常打破常规，采用新颖的方法解决问题。<br>
                  愿意尝试新事物，在工作中常常提出新观点。<br>
                  愿意接受有挑战性的任务，希望在工作中取得新突破。<br>
                </div>
              </div>
              <div class="bottom">
                <div class="part-title">
                  负向行为
                </div>
                <div class="content">
                  严格拘泥于规则，处理问题不够灵活。<br>
                  对新事物开放接受度不够，固着于旧的思维方式。<br>
                  满足于工作现状，不愿意寻求新变化。<br>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="close-btn" @click="close"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem)
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'M'
    },
    index: {
      default: 0
    }
  },
  methods: {
    showBox() {
      this.show = true
      this.$nextTick(() => {
        this.$refs.mySwiper.resize();
      })

    },
    close() {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.swiper-box {
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
  .middle-box {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    width: 315px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 40;
    .close-btn {
      display: block;
      width: 35px;
      height: 35px;
      margin: 20px auto 0;
      background: url(../../assets/img/icon-close.png) no-repeat center center;
      .backgroundSize(100%);
    }
  }
  .box {
    width: 315px;
    height: 400px;
    background-color: #fff;
    background-image: url(../../assets/img/Mswiper.png);
    .backgroundSize(100%);
    background-position: center top;
    background-repeat: no-repeat;
    border-radius: 15px;
    &.M {
      background-image: url(../../assets/img/Mswiper.png);
    }
    &.P {
      background-image: url(../../assets/img/Pswiper.png);
    }
    &.A {
      background-image: url(../../assets/img/Aswiper.png);
    }
    .item {
      width: 315px;
      padding: 10px 20px 0 20px;
      height: 400px;
      .title {
        position: relative;
        font-size: 20px;
        line-height: 70px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        &::after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0 auto;
          width: 58px;
          height: 2px;
          border-radius: 2px;
          background: #fff;
        }
      }
      .tip {
        margin-top: 15px;
        font-size: 12px;
        color: #fff;
        line-height: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e6e6e6;
      }
    }
    .top {
      overflow: hidden;
      padding-bottom: 10px;
      border-bottom: 1px solid #e6e6e6;
      .part-title {
        position: relative;
        font-size: 14px;
        margin-top: 8px;
        line-height: 28px;
        color: @main_color;
        font-weight: bold;
        padding-left: 10px;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 7px;
          width: 3px;
          height: 12px;
          border-radius: 3px;
          background: @main_color;
        }
      }
      .content {
        font-size: 10px;
        line-height: 18px;
      }
    }
    .bottom {
      .part-title {
        position: relative;
        font-size: 14px;
        margin-top: 8px;
        line-height: 28px;
        color: #ff7b30;
        font-weight: bold;
        padding-left: 10px;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 7px;
          width: 3px;
          height: 12px;
          border-radius: 3px;
          background: #ff7b30;
        }
      }
    }
  }
}
</style>