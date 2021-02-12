<template>
  <div class="page">
    <div>
      <div class="top" :class="{none:Mlist.length==0&&Alist.length==0&&Plist.length==0}">
        <div class="title">
          {{pro_name}}
        </div>
        <div class="step-tip">
          第2步：{{describe}}
        </div>
        <div class="action-tip">
          <span class="tip-icon"></span>可同时勾选多项胜任力潜质，点击<span class="add"></span> 按钮移至相应等级框下
        </div>
        <!-- <div class="arrow">
          <img src="../assets/img/top-arrow.png" alt="">
        </div> -->
        <div class="select-box">
          <!-- M-思维倾向 -->
          <div class="item M" v-show="Mlist.length>0">
            <div class="item-title">
              <span class="box-title">{{card_headers&&card_headers[0]['card_code']}}-{{card_headers&&card_headers[0]['card_name']}}</span>
            </div>
            <div class="item-litbox">
              <div class="item-lit" :class="{check:item.select,empty:item.empty}" v-for="(item,index) in Mlist" :key="index" @click="selectItem(item)">
                {{item.card_code}}{{item.card_name}}
              </div>
            </div>
          </div>
          <!-- A-态度和动力 -->
          <div class="item A" v-show="Alist.length>0">
            <div class="item-title">
              <span class="box-title"> {{card_headers&&card_headers[1]['card_code']}}-{{card_headers&&card_headers[1]['card_name']}}</span>
            </div>
            <div class="item-litbox">
              <div class="item-lit" :class="{check:item.select,empty:item.empty}" v-for="(item,index) in Alist" :key="index" @click="selectItem(item)">
                {{item.card_code}}{{item.card_name}}
              </div>
            </div>
          </div>
          <!-- P-人际特点 -->
          <div class="item P" v-show="Plist.length>0">
            <div class="item-title">
              <span class="box-title"> {{card_headers&&card_headers[2]['card_code']}}-{{card_headers&&card_headers[2]['card_name']}}</span>
            </div>
            <div class="item-litbox">
              <div class="item-lit" :class="{check:item.select,empty:item.empty}" v-for="(item,index) in Plist" :key="index" @click="selectItem(item)">
                {{item.card_code}}{{item.card_name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="name-box">
          <div class="name-item">
            <div class="botton-icon-box">
              <button class="add" @click="selected('A')"></button>基础
            </div>
            <img src="../assets/img/bottom-arrow.png" alt="">
          </div>
          <div class="name-item">
            <div class="botton-icon-box">
              <button class="add" @click="selected('B')"></button>进阶
            </div>
            <img src="../assets/img/bottom-arrow.png" alt="">
          </div>
          <div class="name-item">
            <div class="botton-icon-box">
              <button class="add" @click="selected('C')"></button>卓越
            </div>
            <img src="../assets/img/bottom-arrow.png" alt="">
          </div>
        </div>
        <div class="item">
          <div class="list-box">
            <div class="bottom-list-item" :class="{typeM:item.type=='M',typeA:item.type=='A',typeP:item.type=='P',chose:item.bottomSelect}" v-for="(item,index) in selectedABig" :key="index" @click="deleteBottom(item,'one')">
              {{item.card_code}}{{item.card_name}}
            </div>
            <!-- <div class="bottom-arrow">
              <img src="../assets/img/bottom-arrow.png" alt="">
            </div> -->
            <div class="bottom-tip">
              *不具备该类胜任力潜质将无法胜任目标岗位。
            </div>
          </div>
          <div class="list-box">
            <div class="bottom-list-item" :class="{typeM:item.type=='M',typeA:item.type=='A',typeP:item.type=='P',chose:item.bottomSelect}" v-for="(item,index) in selectedBBig" :key="index" @click="deleteBottom(item,'two')">
              {{item.card_code}}{{item.card_name}}
            </div>
            <!-- <div class="bottom-arrow">
              <img src="../assets/img/bottom-arrow.png" alt="">
            </div> -->
            <div class="bottom-tip">
              *该类胜任力潜质对于目标岗位是比较重要的。
            </div>
          </div>
          <div class="list-box">
            <div class="bottom-list-item" :class="{typeM:item.type=='M',typeA:item.type=='A',typeP:item.type=='P',chose:item.bottomSelect}" v-for="(item,index) in selectedCBig" :key="index" @click="deleteBottom(item,'three')">
              {{item.card_code}}{{item.card_name}}
            </div>
            <!-- <div class="bottom-arrow">
              <img src="../assets/img/bottom-arrow.png" alt="">
            </div> -->
            <div class="bottom-tip">
              *该类胜任力潜质对目标岗位不是必需的，但有助于将工作完成得更好。
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-btn-box">
        <button class="btn" @click="stepOne">上一步</button>
        <button class="btn submit" @click="submit">提交</button>
      </div>
    </div>

  </div>
</template>
<script>
import weixinTip from '@/components/common/weixinTip.vue'
export default {
  data() {
    return {
      limitLength: 2,
      Mlist: [],
      Alist: [

      ],
      Plist: [
      ],
      TopSelect: [],
      selectedA: [],
      selectedB: [],
      selectedC: [],
      selectedABig: [],
      selectedBBig: [],
      selectedCBig: [],
      bottomSelectList: [],
      pro_id: '',
      pro_name: '',
      describe: '',
      card_headers: '',
    }
  },
  components: {
    weixinTip
  },
  mounted() {
    this.pro_id = this.$route.query.pro_id
    console.log(this.$route.query)
    this.getCardList()
    if (sessionStorage.getItem('Mdata') || sessionStorage.getItem('Adata') || sessionStorage.getItem('Pdata')) {
      this.Mlist = JSON.parse(sessionStorage.getItem('Mdata'))
      this.Alist = JSON.parse(sessionStorage.getItem('Adata'))
      this.Plist = JSON.parse(sessionStorage.getItem('Pdata'))
      this.selectedABig = this.selectedChange(this.selectedA, this.selectedABig, this.limitLength)
      this.selectedBBig = this.selectedChange(this.selectedB, this.selectedBBig, this.limitLength)
      this.selectedCBig = this.selectedChange(this.selectedC, this.selectedCBig, this.limitLength)
    } else {
      this.$router.replace('/answer?id=' + this.pro_id)
    }
  },
  methods: {
    //获取项目详情
    async getCardList(callback) {
      let result = await this.$https.post(this.$api.showcardlist, {
        persion_id: localStorage.getItem('openId'),
        pro_id: this.pro_id,
        identify: this.$util.Md5(this.pro_id + 'map')
      })
      console.log(result)
      if (result.data.status == 0) {
        this.pro_name = result.data.pro_name
        this.card_headers = result.data.card_headers
        this.describe = result.data.step_describe_list[1].describe
        // this.describe = result.data['step_describe_list']
        callback && callback()
        // this.dataSwith(this.data)
      }
    },
    //选中选项
    selectItem(item) {
      item.select = !item.select
      if (item.select) {
        this.TopSelect.push(JSON.parse(JSON.stringify(item)))
      } else {
        this.TopSelect = this.TopSelect.filter(element => { return element.card_id !== item.card_id })
      }
    },
    //添加选择
    selected(type, item) {

      switch (type) {
        case 'A':
          this.selectedA = [...this.selectedA, ...this.TopSelect];
          this.TopSelect = [];
          this.deleteTop();
          this.selectedABig = this.selectedChange(this.selectedA, this.selectedABig, this.limitLength)
          this.selectedBBig = this.selectedChange(this.selectedB, this.selectedBBig, this.limitLength)
          this.selectedCBig = this.selectedChange(this.selectedC, this.selectedCBig, this.limitLength)
          break;
        case 'B':
          this.selectedB = [...this.selectedB, ...this.TopSelect];
          this.TopSelect = [];
          this.deleteTop();
          this.selectedABig = this.selectedChange(this.selectedA, this.selectedABig, this.limitLength)
          this.selectedBBig = this.selectedChange(this.selectedB, this.selectedBBig, this.limitLength)
          this.selectedCBig = this.selectedChange(this.selectedC, this.selectedCBig, this.limitLength)

          break;
        case 'C':
          this.selectedC = [...this.selectedC, ...this.TopSelect];
          this.TopSelect = [];
          this.deleteTop();
          this.selectedABig = this.selectedChange(this.selectedA, this.selectedABig, this.limitLength)
          this.selectedBBig = this.selectedChange(this.selectedB, this.selectedBBig, this.limitLength)
          this.selectedCBig = this.selectedChange(this.selectedC, this.selectedCBig, this.limitLength)
          break;
      }

    },
    //选择区域平移
    selectedChange(list, bigList, limit) {

      bigList = list
      let max = Math.max(this.selectedA.length, this.selectedB.length, this.selectedC.length, limit)
      let listLength = list.length
      let disLimit = max - listLength
      if (disLimit > 0) {
        let emptyArry = [];
        for (let i = 0; i < disLimit; i++) {
          emptyArry.push({
            empty: true,
            title: ''
          })
        }
        bigList = [...list, ...emptyArry]
      }
      return bigList
    },
    //删除顶部选择元素
    deleteTop() {
      this.Mlist = this.Mlist.filter(item => { return item.select !== true })
      this.Alist = this.Alist.filter(item => { return item.select !== true })
      this.Plist = this.Plist.filter(item => { return item.select !== true })

    },
    bottomSelect(item) {
      if (!item.empty) {
        item.bottomSelect = !item.bottomSelect
        if (item.bottomSelect) {
          this.bottomSelectList.push(item)
        } else {
          this.bottomSelectList = this.bottomSelectList.filter(element => {
            return element.card_id != item.card_id
          })

        }
        console.log(this.bottomSelectList)

      }
    },
    //删除底部选项
    deleteBottom(item, type) {
      switch (type) {
        case "one":
          this.selectedA = this.selectedA.filter(x => { return x.card_id != item.card_id })
          break;
        case "two":
          this.selectedB = this.selectedB.filter(x => { return x.card_id != item.card_id })
          break;
        case "three":
          this.selectedC = this.selectedC.filter(x => { return x.card_id != item.card_id })
          break;
      }
      this.selectedABig = this.selectedChange(this.selectedA, this.selectedABig, this.limitLength)
      this.selectedBBig = this.selectedChange(this.selectedB, this.selectedBBig, this.limitLength)
      this.selectedCBig = this.selectedChange(this.selectedC, this.selectedCBig, this.limitLength)
      this.reback(item)
    },
    //还原顶部选项
    reback(item) {
      item.select = false
      switch (item.type) {
        case 'M':
          this.Mlist.push(item)
          break;
        case 'A':
          this.Alist.push(item)
          break;
        case 'P':
          this.Plist.push(item)
          break;
      }
    },
    //上一步
    stepOne() {
      sessionStorage.setItem('step', 1)
      this.$router.replace('/answer?pro_id=' + this.pro_id)
    },
    //提交
    submit() {
      if (this.selectedA.length < 1 || this.selectedB.length < 1 || this.selectedC.length < 1) {
        this.$dialog.alert(
          {
            message: '每个等级内的胜任力潜质数量不能少于1，请调整后提交！',
            className: 'alert'
          }
        )
        return false
      } else if (this.Mlist.length !== 0 || this.Alist.length !== 0 || this.Plist.length !== 0) {
        this.$dialog.alert({
          message: '当前页面有胜任力潜质未评<br>定等级，请完成后提交!',
          className: 'alert'
        })
        return false
      }
      // this.$router.push('/submit')
      this.submitAjax()
    },
    //提交请求
    submitAjax() {
      let result_list = [{
        level_id: '1',
        card_id: this.reaturnIdArray(this.selectedA).join(',')
      }, {
        level_id: '2',
        card_id: this.reaturnIdArray(this.selectedB).join(',')
      }, {
        level_id: '3',
        card_id: this.reaturnIdArray(this.selectedC).join(',')
      },]
      this.$https.jsonPost(this.$api.submitresult, {
        pro_id: this.pro_id,
        persion_id: localStorage.getItem('openId'),
        result_list: JSON.stringify(result_list),
        identify: this.$util.Md5(this.pro_id + 'map')
      }).then(res => {
        if (res.data.status == 0) {
          this.$router.push('/submit')
        } else {
          this.$notify(res.data.message)
        }
      })
    },
    //返回id 数组
    reaturnIdArray(array) {
      let newIdarary = [];
      array.forEach(element => {
        newIdarary.push(element.card_id)
      });
      return newIdarary
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
    min-height: 275px;
    background-color: #fff;
    margin-bottom: 15px;
    border-radius: 0 0 20px 20px;
    &.none {
      border-radius: 0;
      margin-bottom: -15px;
    }
    // &::after {
    //   content: "";
    //   display: block;
    //   width: 0;
    //   height: 0;
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   bottom: -18px;
    //   margin: 0 auto;
    //   border-top: 9px solid #fff;
    //   border-bottom: 9px solid @body_color;
    //   border-left: 10px solid @body_color;
    //   border-right: 10px solid @body_color;
    // }
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
    margin: 15px auto 0;
    img {
      display: block;
      width: 100%;
    }
  }
}
.action-tip {
  .flexbox;
  width: 335px;
  height: 28px;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px auto 0;
  align-items: center;
  .tip-icon {
    display: inline-block;
    width: 11px;
    height: 11px;
    margin-right: 4px;
    background: url(../assets/img/erweima-tip.png) no-repeat center center;
    .backgroundSize(100%);
  }
  .add {
    display: inline-block;
    width: 24px;
    height: 18px;
    margin: 0 4px;
    background: url(../assets/img/icon-add.png) no-repeat center center;
    .backgroundSize(100% 100%);
  }
}
.select-box {
  // .flexbox;
  padding: 0 20px 8px;
  // justify-content: space-between;
  .item {
    line-height: 26px;
    text-align: center;
    .item-title {
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      line-height: 34px;
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
    &.M {
      color: @Mcolor;
      .item-lit {
        background: @Mcolor;
        border-color: @Mcolor;
      }
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
    &.A {
      color: @Acolor;
      .item-lit {
        background: @Acolor;
        border-color: @Acolor;
      }
      .box-title {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 6px;
          background: @Acolor;
          opacity: 0.2;
        }
      }
    }
    &.P {
      color: @Pcolor;
      .item-lit {
        background: @Pcolor;
        border-color: @Pcolor;
      }
      .box-title {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 6px;
          background: @Pcolor;
          opacity: 0.2;
        }
      }
    }
    // .item-title {
    //   font-size: 14px;
    //   font-weight: bold;
    //   text-align: left;
    //   line-height: 34px;
    // }

    .item-litbox {
      width: 100%;
      .flexbox;
      flex-wrap: wrap;
    }
    .item-lit {
      width: 105px;
      margin-right: 10px;
      color: #fff;
      // border: 1px solid #e0e6f0;
      border-radius: 6px;
      margin-bottom: 12px;
      height: 26px;
      flex-shrink: 0;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &.check {
        position: relative;
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background: url(../assets/img/icon-select.png) no-repeat center center;
          .backgroundSize(100%);
        }
      }
      &.empty {
        opacity: 1;
        background: url(../assets/img/empty-border.png) no-repeat center center;
        .backgroundSize(100%);
      }
      &.moveed {
        font-size: 0;
        border: 2px dotted #e0e6f0;
      }
    }
  }
}
.bottom {
  position: relative;
  background: #fff;
  border-radius: 20px 20px 0 0;
  .name-box {
    width: 100%;
    .flexbox;
    padding: 16px 20px 14px;
    justify-content: space-between;
    .name-item {
      width: 105px;
      text-align: center;
      font-size: 14px;
      color: #0154a8;
      line-height: 30px;
      font-weight: bold;

      .botton-icon-box {
        .flexbox;
        height: 26px;
        line-height: 26px;
        margin-bottom: 13px;
        justify-content: center;
        align-items: center;
        .add {
          width: 36px;
          height: 26px;
          margin-right: 6px;
          background: url(../assets/img/icon-add.png) center center no-repeat;
          .backgroundSize(100%);
        }
      }
      img {
        display: block;
        width: 14px;
        margin: 0 auto 0;
      }
    }
  }
  .item {
    .flexbox;
    padding: 0 20px 112px;
    justify-content: space-between;
    .list-box {
      width: 105px;
      .bottom-list-item {
        position: relative;
        width: 100%;
        height: 26px;
        border-radius: 6px;
        margin-bottom: 12px;
        text-align: center;
        line-height: 26px;
        font-size: 12px;
        color: #fff;
        // border: 1px solid #e0e6f0;
        background: url(../assets/img/empty-border.png) no-repeat center center;
        .backgroundSize(100%);

        &.typeM {
          background: @Mcolor;
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: url(../assets/img/icon-delate.png) no-repeat center
              center;
            .backgroundSize(100%);
          }
        }
        &.typeA {
          background: @Acolor;
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: url(../assets/img/icon-delate.png) no-repeat center
              center;
            .backgroundSize(100%);
          }
        }
        &.typeP {
          background: @Pcolor;
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: url(../assets/img/icon-delate.png) no-repeat center
              center;
            .backgroundSize(100%);
          }
        }
        &.chose {
          opacity: 0.5;
        }
      }
      .bottom-arrow {
        width: 14px;
        padding: 2px 0 12px;
        margin: 0 auto;
        img {
          display: block;
          width: 100%;
        }
      }
      .bottom-tip {
        font-size: 11px;
        color: #999999;
        line-height: 17px;
        text-align: justify;
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
</style>