<template>
  <div class="answer-page">
    <div class="title">智鼎优源2020MAP建模项目</div>
    <div class="step-tip">Step1: 请选出6-8项胜任力潜质（尽量分布在M/A/P三个方面）</div>
    <div class="tip"><span class="icon"></span>长按胜任力卡片展示详细内容</div>
    <div class="box M">
      <div class="title-box">
        <span class="box-title">M-思维倾向</span>（8）
      </div>
      <div class="box-list">
        <div class="box-item" :class="{on:item.check == true,off:MdataClick == MdataLimit}" v-for="(item,index) in Mdata" :key="index" @click="itemClick('Mdata',item.id)">
          <span v-longtap="(e)=>swiperInit('M',item,e)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="box A">
      <div class="title-box">
        <span class="box-title">A-态度和动力</span>（8）
      </div>
      <div class="box-list">
        <div class="box-item" :class="{on:item.check == true,off:AdataClick == AdataLimit}" v-for="(item,index) in Adata" :key="index" @click="itemClick('Adata',item.id)">
          <span v-longtap="(e)=>swiperInit('A',item,e)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="box P">
      <div class="title-box">
        <span class="box-title">P-人际特点</span>（8）
      </div>
      <div class="box-list">
        <div class="box-item" v-for="(item,index) in Pdata" :key="index" :class="{on:item.check == true,off:PdataClick == PdataLimit}" @click="itemClick('Pdata',item.id)">
          <span v-longtap="(e)=>swiperInit('P',item,e)">{{item.name}}</span>
        </div>
      </div>
    </div>

    <div class="fix-bottom">下一步</div>
    <longtapBox :type="swiperType" ref="swip" :index="swiperIndex"></longtapBox>
  </div>
</template>
<script>
import longtapBox from '@/components/answer/swiper.vue'
export default {
  data() {
    return {
      Mdata: [
        { name: 'M1-1开放创新', id: 1, check: false },
        { name: 'M1-变革创新', id: 2, check: false },
        { name: 'M1-乐于思考', id: 3, check: false },
        { name: 'M1-学习研究', id: 4, check: false },
        { name: 'M1-系统研究', id: 5, check: false },
        { name: 'M1-开放思维', id: 6, check: false },
      ],
      MdataClick: 0,
      MdataLimit: 5,
      Adata: [
        { name: 'M1-1开放创新', id: 1, check: false },
        { name: 'M1-变革创新', id: 2, check: false },
        { name: 'M1-乐于思考', id: 3, check: false },
        { name: 'M1-学习研究', id: 4, check: false },
        { name: 'M1-系统研究', id: 5, check: false },
        { name: 'M1-开放思维', id: 6, check: false },
      ],
      AdataClick: 0,
      AdataLimit: 4,
      Pdata: [
        { name: 'M1-1开放创新', id: 1, check: false },
        { name: 'M1-变革创新', id: 2, check: false },
        { name: 'M1-乐于思考', id: 3, check: false },
        { name: 'M1-学习研究', id: 4, check: false },
        { name: 'M1-系统研究', id: 5, check: false },
        { name: 'M1-开放思维', id: 6, check: false },
      ],
      PdataClick: 0,
      PdataLimit: 4,
      swiperType: 'M',
      swiperIndex: 0,
    }

  },
  components: {
    longtapBox,
  },
  methods: {
    itemClick(arryName, id) {
      console.log(arryName, id)
      this[arryName].forEach(element => {
        if (element.id == id) {
          if (element.check) {
            element.check = !element.check
            this[(arryName + 'Click')]--
          } else {
            if (this[arryName + 'Click'] < this[arryName + 'Limit']) {
              element.check = !element.check
              this[arryName + 'Click']++
            }
          }
        }
      });
    },
    swiperInit(type, s, e) {
      this.swiperIndex = s.id
      this.swiperType = type;
      this.$refs.swip.showBox();
    }
  }

}
</script>
<style lang="less" scoped>
.answer-page {
  width: 100%;
  padding-top: 65px;
  min-height: 100%;
  padding-bottom: 60px;
  background: url(../assets/img/answer-bc.png) no-repeat center top;
  .nouserselect;
  .fix-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 16px;
    background: @main_color;
    z-index: 8;
  }
  .backgroundSize(100%);
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
    font-size: 12px;
    color: #fff;
    line-height: 42px;
    padding: 0 20px;
  }
  .tip {
    display: inline-block;
    color: #fff;
    background: rgba(1, 84, 168, 0.2);
    font-size: 10px;
    height: 19px;
    line-height: 19px;
    padding: 0 10px 0 6px;
    margin-left: 20px;
    margin-top: 30px;
    border-radius: 3px;
    .icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: url(../assets/img/icon-tip.png) no-repeat center center;
      .backgroundSize(100%);
      margin-right: 3px;
    }
  }
}
.box {
  padding: 0 20px;
  .box-list {
    .flexbox;
    flex-wrap: wrap;
    justify-content: space-between;
    .nouserselect;
    .box-item {
      width: 105px;
      height: 26px;
      text-align: center;
      border: 1px solid #e0e6f0;
      font-size: 12px;
      line-height: 26px;
      border-radius: 6px;
      flex-shrink: 0;
      margin-bottom: 12px;
      span {
        display: block;
        .nouserselect;
      }
      &.off {
        color: #c8c8c8;
      }
    }
  }
  &.M {
    color: @Mcolor;
    .box-item {
      &.on {
        background: @Mcolor;
        color: #fff;
        border-color: @Mcolor;
      }
    }
  }
  &.A {
    color: @Acolor;
    .box-title {
      &:after {
        background: @Acolor;
      }
    }
    .box-item {
      &.on {
        background: @Acolor;
        color: #fff;
        border-color: @Acolor;
      }
    }
  }
  &.P {
    color: @Pcolor;
    .box-title {
      &:after {
        background: @Pcolor;
      }
    }
    .box-item {
      &.on {
        background: @Pcolor;
        color: #fff;
        border-color: @Pcolor;
      }
    }
  }
  .title-box {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 0 20px 0;
    .box-title {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 6px;
        background: @Mcolor;
        opacity: 0.2;
      }
    }
  }
}
</style>