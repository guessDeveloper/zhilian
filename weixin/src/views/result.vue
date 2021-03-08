<template>
  <div class="result-page">
    <div class="top">
      <div class="title">{{pro_name}}</div>
      <div class="canvas">
        <img :src="canvasUrl" alt="" class="img">
        <div ref="canvas" class="canvas-inner">
          <img src="../assets/img/result-top-title.png" alt="" class="canvas-title">
          <img src="../assets/img/result-border.png" alt="" class="canvas-border">
          <div class="canvas-content">
            <img src="../assets/img/result-canvas.png" alt="" class="bc">
            <div class="M-box" :class="{show:threeList.length>0}">
              <div class="item" v-for="(item,index) in threeList" :key="index">{{item.card_name}}</div>
            </div>
            <div class="middle-box">
              <div class="A-box" :class="{show:twoList.length>0}">
                <div class="item" v-for="(item,index) in twoList" :key="index">{{item.card_name}}</div>
              </div>
            </div>
            <div class="P-box" :class="{show:oneList.length>0}">
              <div class="item" v-for="(item,index) in oneList" :key="index">{{item.card_name}}</div>
            </div>
          </div>
        </div>
        <div class="canvas-bottom">
          <div class="step-tip"><span class="icon"></span>长按图片可保存或分享</div>
          <div class="step-box">
            <div class="name">基础(等级3)</div>
            <div class="arrow"></div>
            <div class="name W">进阶(等级2)</div>
            <div class="arrow"></div>
            <div class="name T">卓越(等级1)</div>
          </div>
        </div>

      </div>
    </div>
    <div class="bottom">
      <div class="tip">
        <div class="icon"></div>
        <div class="arrow" :class="{rotate:showTip}" @click="arrowClick"></div>
        <div>温馨提示： </div>
        <div :class="{all:showTip,part:!showTip}">1、为了方便统计分析，我们按照重要程度对胜任力潜质的三个等级进行了赋值：基础=3，进阶=2，卓越=1。<br>
          2、下表是根据所选{{person_sum}}名人员的数据统计得到的胜任力指标，其中：<br>
          * 选中频率：指胜任力潜质被选中的次数占总人数的比率<br>
          * 等级众数：指胜任力潜质出现次数最多的等级<br>
          * 等级平均分：指胜任力潜质的等级平均数<br>
          3、如需调整胜任力模型，建议最终模型不超过10项胜任力潜质，且在等级1（卓越）、等级2（进阶）、等级3（基础）中均有分布。</div>
      </div>
      <div class="table">
        <div class="table-title">
          <div class="table-title-item">
            胜任力潜质
          </div>
          <div class="table-title-item">
            选中频率
          </div>
          <div class="table-title-item">
            等级众数
          </div>
          <div class="table-title-item">
            等级平均分
          </div>
          <div class="table-title-item">
            推荐等级
          </div>
        </div>
        <div class="table-content" v-for="(item,index) in resultData" :key="index" :class="{moreItem:index>9,showMore:more}">
          <div class="table-content-item">
            <van-checkbox v-model="item.checked" shape="square" class="table-checkbox" @click="checkboxClick(item)"></van-checkbox>
            <span class="name">{{item.card_name}}</span>
          </div>
          <div class="table-content-item">
            {{item.choose_rate}}%
          </div>
          <div class="table-content-item">
            {{item.level_sum}}
          </div>
          <div class="table-content-item">
            {{item.level_avg}}
          </div>
          <div class="table-content-item">
            <div class="level" @click="levelSelect(item)">{{item.recommended_level}} <img src="../assets/img/level-arrow.png" alt=""></div>
          </div>
        </div>
      </div>

    </div>
    <div class="bottom-padding">
      <div class="btn" @click="more=!more" :class="{close:more}">
        <div class="btn-name">{{more?'收起':'查看更多'}}</div>
        <div class="arrow">
          <img src="../assets/img/result-arrow.png" alt="">
        </div>
      </div>
    </div>
    <div class="bottom-btn-box">
      <button class="btn" @click="reback">重新选择人员</button>
      <button class="btn submit" @click="submit">发送数据至邮箱</button>
    </div>
    <van-dialog v-model="show" show-cancel-button :before-close="emailOk" confirm-button-text="发送">
      <Email ref="sendEmail" />
    </van-dialog>
    <van-dialog v-model="successSend" confirm-button-text="确定">
      <img src="../assets/img/successSend.png" alt="" class="success-img">
      <div class="success-tip">邮件已发送，请注意查收</div>
    </van-dialog>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="levelOk" title="推荐等级" :default-index="pickerIndex" />
    </van-popup>
  </div>
</template>
<script>
// import Vue from 'vue'
// import ECharts from "vue-echarts";
// import "echarts/lib/chart/pie";
import html2canvas from 'html2canvas'
import Email from '@/components/common/email'
import Vue from 'vue';
import { Checkbox, Picker, Notify } from 'vant';
Vue.use(Checkbox).use(Picker).use(Notify);
export default {
  data() {
    return {
      show: false,
      successSend: false,
      showTip: false,
      showPicker: false,
      pickerItem: {},
      pickerIndex: 0,
      oneList: [],
      twoList: [],
      threeList: [],
      columns: ['0', '1', '2', '3'],
      more: false,
      limit: 16,
      hasCheck: 0,
      resultData: [],
      pro_id: '',
      canvasUrl: '',
      pro_name: '',
      person_sum: '',
    }
  },
  mounted() {
    this.pro_id = this.$route.query.pro_id
    this.getData();

    console.log(this.oneList)
  },
  components: {
    Email,
  },
  methods: {
    //获取数据
    getData() {
      let perList = sessionStorage.getItem('persion');
      sessionStorage.clear('persion')
      this.$https.post(this.$api.showresult, {
        pro_id: this.pro_id,
        identify: this.$util.Md5(this.pro_id + 'map'),
        person_id: perList

      }).then(res => {
        if (res.data.status == 0) {
          this.resultData = res.data.result_list
          this.pro_name = res.data.pro_name
          this.person_sum = res.data.person_sum
          for (let i = 0; i < 10; i++) {
            if (this.resultData[i].recommended_level != 0) {
              this.resultData[i].checked = true
            }
          }
          console.log('eeeee', this.resultData)
          this.$nextTick(() => {
            this.typeList();
          })
        }
      })
    },
    emailOk(action, done) {
      if (action == 'confirm') {
        let ss = this.$refs.sendEmail.save()
        console.log(ss, typeof (ss))
        if (ss == '') {
          this.show = true
          this.$notify('请输入邮箱')
          done(false)
        } else if (typeof (ss) == 'object') {
          this.$notify('请输入正确的邮箱')
          done(false)
        } else {

          this.$https.post(this.$api.sendemail, {
            email: ss,
            pro_id: this.pro_id,
            identify: this.$util.Md5(this.pro_id + 'map'),
          }).then(res => {
            if (res.data.status == 0) {
              this.successSend = true
              done()
            } else {
              this.$Notify(res.data.message)
              done(false)
            }

          })
          // done(true)
        }
      } else {
        done(true)
      }


    },
    // 生成base64
    toBase64() {
      let _this = this;
      let timer;
      clearTimeout(timer)
      let box = this.$refs.canvas
      timer = setTimeout(() => {
        html2canvas(box, {
          useCORS: true,
          allowTaint: true,
          width: box.clientWidth,
          height: box.clientHeight,
          x: 0,
          y: 70
        })
          .then((canvas) => {
            _this.canvasUrl = canvas.toDataURL('image/png'); // 将canvas转成base64图片格式
            // console.log(imageUrl)
          });
        // console.log(box.clientWidth)
      }, 2000)

    },
    arrowClick() {
      this.showTip = !this.showTip
    },
    checkboxClick(item) {
      if (item.recommended_level == '0') {
        item.checked = false
        this.$notify('推荐等级为0时不可勾选，请先调整等级');

      } else {
        console.log(this.hasCheck)
        if (item.checked == true) {
          if (this.hasCheck == this.limit) {
            item.checked = false
            this.$notify('已超过上限，最多可选择16个胜任潜质');
          } else {
            this.typeList();
          }
        } else {
          this.deleteChose(item)
          this.toBase64();
          this.hasCheck--
        }
      }
    },
    //分配图形类别
    typeList() {
      this.oneList = [];
      this.twoList = [];
      this.threeList = [];
      let choseNum = 0;
      console.log(this.resultData)
      this.resultData.forEach(item => {
        if (item.checked) {
          switch (item.recommended_level) {
            case '3':
              this.oneList.push(item)
              break;
            case '2':
              this.twoList.push(item)
              break;
            case '1':
              this.threeList.push(item)
              break;
            case 3:
              this.oneList.push(item)
              break;
            case 2:
              this.twoList.push(item)
              break;
            case 1:
              this.threeList.push(item)
              break;
          }
          choseNum++
        }
      })
      this.hasCheck = choseNum
      console.log(this.hasCheck)
      this.toBase64();
    },
    //取消选择
    deleteChose(item) {
      this.oneList = this.oneList.filter(x => { return x.card_id != item.card_id })
      this.twoList = this.twoList.filter(x => { return x.card_id != item.card_id })
      this.threeList = this.threeList.filter(x => { return x.card_id != item.card_id })
    },
    levelSelect(item) {
      this.showPicker = true
      this.pickerItem = item
      this.pickerIndex = item.recommended_level

    },
    levelOk(value) {
      console.log(this.pickerItem.card_id)
      this.resultData.forEach((item, index) => {
        if (item.card_id == this.pickerItem.card_id) {
          this.resultData[index].recommended_level = value
          if (value == '0') {
            // console.log(value, '4444')
            this.resultData[index].checked = false
          }
          // console.log(value, this.resultData, '4444')
        }
      })

      this.typeList();
      this.showPicker = false
    },
    submit() {
      this.show = true
    },
    //重新生成结果
    reback() {
      this.$router.replace('/projectPersion?pro_id=' + this.pro_id)
    }
  }
}
</script>
<style lang="less" scoped>
.result-page {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 300px;
}
.success-img {
  display: block;
  width: 178px;
  padding-top: 40px;
  margin: 0 auto;
}
.success-tip {
  font-size: 16px;
  line-height: 68px;
  margin-bottom: 13px;
  text-align: center;
}
.top {
  width: 100%;
  padding-top: 19px;
  height: 510px;
  background: url(../assets/img/result-bc.png) no-repeat center top;
  .backgroundSize(100%);
  .title {
    width: 291px;
    margin: 0 auto;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    line-height: 28px;
    margin-bottom: 20px;
  }
  .canvas {
    position: relative;

    height: 417px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    .img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 90;
    }
    .canvas-inner {
      overflow: hidden;
      // height: 100%;
    }
    .canvas-title {
      display: block;
      width: 190px;
      margin: 30px auto 20px;
    }
    .canvas-border {
      display: block;
      width: 298px;
      margin: 0 auto;
    }
    .canvas-content {
      position: relative;
      width: 100%;
      height: 220px;
      margin-top: 19px;
      z-index: 20;
      // background: url(../assets/img/result-canvas.png) no-repeat center center;
      // .backgroundSize(100%);
      .bc {
        width: 100%;
        pointer-events: none;
      }
      .M-box {
        position: absolute;
        bottom: 136px;
        right: 16px;
        width: 210px;
        padding: 4px 8px;
        border: 1px solid #0154a8;
        color: #0154a8;
        font-size: 9px;
        line-height: 10px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0;
        transition: opacity 0.5s ease;
        &.show {
          opacity: 1;
        }
      }
      .middle-box {
        .flexbox;
        align-items: center;
        position: absolute;
        right: 6px;
        top: 94px;
        width: 220px;
        height: 60px;
      }
      .A-box {
        // position: absolute;
        // top: 94px;
        // right: 16px;
        width: 210px;
        padding: 4px 8px;
        border: 1px solid #0154a8;
        color: #0154a8;
        font-size: 9px;
        line-height: 10px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0;
        transition: opacity 0.5s ease;
        &.show {
          opacity: 1;
        }
      }
      .P-box {
        position: absolute;
        top: 164px;
        right: 16px;
        width: 210px;
        padding: 4px 8px;
        border: 1px solid #0154a8;
        color: #0154a8;
        font-size: 9px;
        line-height: 10px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0;
        transition: opacity 0.5s ease;
        &.show {
          opacity: 1;
        }
      }
      .item {
        display: inline-block;
        margin: 0 2px;
      }
    }
    .canvas-bottom {
      padding: 0 15px;
      .step-tip {
        .flexbox;
        margin: 6px auto 10px;
        font-size: 12px;
        color: #999;
        height: 34px;
        align-items: center;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url(../assets/img/pass-tip.png) no-repeat center center;
          .backgroundSize(100%);
          margin-right: 4px;
        }
      }
      .step-box {
        .flexbox;
        align-items: center;
        height: 34px;
        line-height: 34px;
        .name {
          position: relative;
          font-size: 11px;
          color: #333333;
          padding-left: 14px;
          &::after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 9px;
            width: 8px;
            height: 14px;
            border-radius: 8px;
            background: #0154a8;
          }
          &.W {
            &::after {
              background: #4d87c2;
            }
          }
          &.T {
            &::after {
              background: #80a9d3;
            }
          }
        }
        .arrow {
          width: 42px;
          height: 9px;
          background: url(../assets/img/canvas-arrow.png) no-repeat center
            center;
          .backgroundSize(100%);
          margin: 0 8px 0 6px;
        }
      }
    }
  }
}
.bottom {
  margin-top: 10px;
  overflow: hidden;
  background: #fff;
  border-radius: 20px 20px 0 0;
  .tip {
    position: relative;
    margin: 0 15px;
    padding-left: 20px;
    padding-right: 33px;
    padding-bottom: 15px;
    // height: 40px;
    // overflow: hidden;

    margin-top: 15px;
    font-size: 12px;
    line-height: 20px;
    color: #999999;
    .icon {
      position: absolute;
      left: 0;
      top: 4px;
      width: 14px;
      height: 14px;
      background: url(../assets/img/result-infos.png) no-repeat center center;
      .backgroundSize(100%);
    }
    .arrow {
      position: absolute;
      top: 9px;
      right: 0;
      width: 17px;
      height: 17px;
      background: url(../assets/img/result-arrow.png) no-repeat center center;
      .backgroundSize(100%);
      .transform(rotate(0deg));
      -webkit-transition: transform 0.5s ease;
      transition: transform 0.5s ease;
      &.rotate {
        .transform(rotate(180deg));
      }
    }
    .all {
      height: auto;
    }
    .part {
      height: 20px;
      overflow: hidden;
    }
  }
}
.table {
  border-top: 1px solid #f3f5f9;
  .table-title {
    .flexbox;
    padding: 0 15px;
    height: 48px;
    color: #fff;
    line-height: 48px;
    font-size: 11px;
    background: #a7cef6;
    .table-title-item {
      &:nth-child(1) {
        width: 109px;
      }
      &:nth-child(2) {
        width: 52px;
        text-align: left;
      }
      &:nth-child(3) {
        width: 60px;
        text-align: center;
      }
      &:nth-child(4) {
        width: 71px;
        text-align: center;
      }
      &:nth-child(5) {
        width: 52px;
        // margin-left: 8px;
        text-align: right;
      }
    }
  }
  .table-content {
    .flexbox;
    padding: 0 15px;
    min-height: 48px;
    line-height: 48px;
    font-size: 12px;
    font-weight: bold;
    align-items: center;
    &:nth-of-type(2n) {
      background: #f3f5f9;
    }
    &.moreItem {
      display: none;
      &.showMore {
        .flexbox;
      }
    }

    .table-content-item {
      &:nth-child(1) {
        .flexbox;
        width: 109px;
        align-items: center;
        .table-checkbox {
          display: inline-block;
          margin-right: 8px;
          flex-shrink: 0;
        }
        .name {
          display: inline-block;
          line-height: 14px;
        }
      }
      &:nth-child(2) {
        width: 44px;
        margin-right: 8px;
        text-align: center;
      }
      &:nth-child(3) {
        width: 60px;
        text-align: center;
      }
      &:nth-child(4) {
        width: 71px;
        text-align: center;
      }
      &:nth-child(5) {
        width: 44px;
        margin-left: 8px;
        text-align: center;
      }
      .level {
        .flexbox;
        width: 43px;
        height: 24px;
        border: 1px solid #c8c8c8;
        border-radius: 6px;
        line-height: 24px;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 8px;
          height: 4px;
          margin-left: 6px;
        }
      }
    }
  }
}
.bottom-btn-box {
  .flexbox;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  .btn {
    display: block;
    width: 50%;
    height: 100%;
    font-size: 16px;
    color: #999999;
    background: #fff;
    border-top: 1px solid #c8c8c8;
    &.submit {
      background: @main_color;
      color: #fff;
      border-color: @main_color;
    }
  }
}
.bottom-padding {
  height: 143px;
  text-align: center;
  .btn {
    display: inline-block;
    margin-top: 20px;
    .btn-name {
      font-size: 12px;
      color: #0154a8;
    }
    &.close {
      .arrow {
        .transform(rotate(180deg));
      }
    }
    .arrow {
      width: 8px;
      margin: 10px auto 0;
      .transform(rotate(0deg));
      -webkit-transition: transform 0.5s ease;
      transition: transform 0.5s ease;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>