<template>
  <div class="page">
    <div class="top">
      <div class="title">
        智鼎优源2020MAP建模项目
      </div>
      <div class="step-tip">
        Step2：等级评定，将选中的胜任力按重要程度拖拽到下方三个等级卡中，三个等级均需有胜任力分布（每个等级最多4~6个，最少1个）。
      </div>
      <div class="arrow">
        <img src="../assets/img/top-arrow.png" alt="">
      </div>
      <div class="select-box">
        <!-- M-思维倾向 -->
        <div class="item M">
          <div class="item-title">
            M-思维倾向
          </div>
          <div class="item-lit" v-for="(item,index) in Mlist" :key="index">
            {{item.title}}
          </div>
        </div>
        <!-- A-态度和动力 -->
        <div class="item A">
          <div class="item-title">
            A-态度和动力
          </div>
          <div class="item-lit" v-for="(item,index) in Alist" :key="index">
            {{item.title}}
          </div>
        </div>
        <!-- P-人际特点 -->
        <div class="item P">
          <div class="item-title">
            P-人际特点
          </div>
          <div class="item-lit" v-for="(item,index) in Plist" :key="index">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Mlist: [{
        id: 1,
        title: '变革创新',
        type: 'M'
      }, {
        id: 2,
        title: '严谨细致',
        type: 'M'
      }, {
        id: 3,
        title: '推进执行',
        type: 'M'
      }],
      Alist: [
        {
          id: 1,
          title: '变革创新',
          type: 'A'
        }, {
          id: 2,
          title: '严谨细致',
          type: 'A'
        }, {
          id: 3,
          title: '推进执行',
          type: 'A'
        }
      ],
      Plist: [
        {
          id: 1,
          title: '变革创新',
          type: 'A'
        }, {
          id: 2,
          title: '严谨细致',
          type: 'A'
        }, {
          id: 3,
          title: '推进执行',
          type: 'A'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  .top {
    position: relative;
    padding-top: 64px;
    background: url(../assets/img/answer-bc2.png) no-repeat center top;
    .backgroundSize(100%);
    min-height: 320px;
    background-color: #fff;
    border-radius: 0 0 20px 20px;
    &::after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -18px;
      margin: 0 auto;
      border-top: 9px solid #fff;
      border-bottom: 9px solid @body_color;
      border-left: 10px solid @body_color;
      border-right: 10px solid @body_color;
    }
    .title {
      position: relative;
      font-size: 22px;
      color: #fff;
      line-height: 50px;
      padding: 0 20px;
      &::before {
        content: "";
        position: absolute;
        left: 20px;
        bottom: 0;
        display: block;
        width: 45px;
        height: 1px;
        background: #fff;
        border-radius: 1px;
      }
    }
    .step-tip {
      margin-top: 12px;
      font-size: 12px;
      color: #fff;
      line-height: 20px;
      padding: 0 20px;
    }
  }
  .arrow {
    width: 18px;
    margin: 22px auto 0;
    img {
      display: block;
      width: 100%;
    }
  }
}
.select-box {
  .flexbox;
  padding: 0 20px 8px;
  justify-content: space-between;
  .item {
    width: 105px;
    line-height: 26px;
    text-align: center;
    &.M {
      color: @Mcolor;
      .item-lit {
        background: @Mcolor;
        border-color: @Mcolor;
      }
    }
    &.A {
      color: @Acolor;
      .item-lit {
        background: @Acolor;
        border-color: @Acolor;
      }
    }
    &.P {
      color: @Pcolor;
      .item-lit {
        background: @Pcolor;
        border-color: @Pcolor;
      }
    }
    .item-title {
      font-size: 14px;
      font-weight: bold;
      line-height: 52px;
    }
    .item-lit {
      color: #fff;
      border: 1px solid #e0e6f0;
      border-radius: 6px;
      margin-bottom: 12px;
      &.moveed {
        font-size: 0;
        border: 2px dotted #e0e6f0;
      }
    }
  }
}
</style>