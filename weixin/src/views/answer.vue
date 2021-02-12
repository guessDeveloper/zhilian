<template>
  <div>
    <div v-show="isInweixin" class="answer-page">
      <div class="title">{{pro_name}}</div>
      <div class="step-tip">第1步：{{describe}}</div>
      <div class="tip"><span class="icon"></span>长按胜任力潜质卡片查看详细介绍</div>
      <div class="box M">
        <div class="title-box">
          <span class="box-title">{{card_headers&&card_headers[0]['card_code']}}-{{card_headers&&card_headers[0]['card_name']}}</span>（{{Mdata.length}}）
        </div>
        <div class="box-list">
          <div class="box-item" :class="{on:item.check == true,off:clickNum == totalLimit||item.disable==true}" v-for="(item,index) in Mdata" :key="index" @click="itemClick('Mdata',item.card_id)">
            <span v-longtap="(e)=>swiperInit('M',index,Mdata)">{{item.card_code}}{{item.card_name}}</span>
          </div>
        </div>
      </div>
      <div class="box A">
        <div class="title-box">
          <span class="box-title">{{card_headers&&card_headers[1]['card_code']}}-{{card_headers&&card_headers[1]['card_name']}}</span>（{{Adata.length}}）
        </div>
        <div class="box-list">
          <div class="box-item" :class="{on:item.check == true,off:clickNum == totalLimit||item.disable==true}" v-for="(item,index) in Adata" :key="index" @click="itemClick('Adata',item.card_id)">
            <span v-longtap="(e)=>swiperInit('A',index,Adata)">{{item.card_code}}{{item.card_name}}</span>
          </div>
        </div>
      </div>
      <div class="box P">
        <div class="title-box">
          <span class="box-title">{{card_headers&&card_headers[2]['card_code']}}-{{card_headers&&card_headers[2]['card_name']}}</span>（{{Pdata.length}}）
        </div>
        <div class="box-list">
          <div class="box-item" v-for="(item,index) in Pdata" :key="index" :class="{on:item.check == true,off:clickNum == totalLimit||item.disable==true}" @click="itemClick('Pdata',item.card_id)">
            <span v-longtap="(e)=>swiperInit('P',index,Pdata)">{{item.card_code}}{{item.card_name}}</span>
          </div>
        </div>
      </div>

      <div class="fix-bottom" @click="next" v-show="clickNum>=6">下一步</div>
      <longtapBox :type="swiperType" ref="swip" :index="swiperIndex" :data="swiperData"></longtapBox>
      <password @after="init" v-if="showPass" :id="projectId"></password>
    </div>
    <weixinTip v-if="!isInweixin"></weixinTip>
  </div>
</template>
<script>
import password from '@/components/common/passWord.vue'
import longtapBox from '@/components/answer/swiper.vue'
import weixinTip from '@/components/common/weixinTip.vue'
export default {
  data() {
    return {
      pro_name: '', //项目名称
      describe: '',
      isInweixin: true,
      showPass: false,
      data: [],
      Mdata: [

      ],
      MdataClick: 0,
      MdataLimit: 5,
      Adata: [

      ],
      AdataClick: 0,
      AdataLimit: 4,
      Pdata: [

      ],
      PdataClick: 0,
      PdataLimit: 4,
      totalLimit: 8,
      clickData: [],
      clickNum: 0,
      swiperType: 'M',
      swiperIndex: 0,
      swiperData: {},
      projectId: '44',
      card_headers: [],
      describe: '',
    }

  },
  components: {
    longtapBox,
    password,
    weixinTip
  },
  created() {

  },
  mounted() {
    this.projectId = this.$route.query.pro_id;
    console.log(this.$util.isInweixin)
    this.$util.setWXconfig();
    this.$util.getOpenCode(() => {
      if (sessionStorage.getItem('hasPass')) {
        this.showPass = false
      } else {
        this.showPass = true
      }
      if (sessionStorage.getItem('oldMdata')) {
        // console.log(localStorage.getItem('oldMdata'))
        this.Mdata = JSON.parse(sessionStorage.getItem('oldMdata'))
        this.Adata = JSON.parse(sessionStorage.getItem('oldAdata'))
        this.Pdata = JSON.parse(sessionStorage.getItem('oldPdata'))
        this.clickNum = sessionStorage.getItem('clickNum')
        this.getCardList(() => {
          // this.dataSwith(this.data, 'old')
        });
      } else {
        //   console.log(this.data)
        // this.dataSwith(this.data)
        if (sessionStorage.getItem('hasPass')) {
          if (sessionStorage.getItem('is_repeat')) {
            this.getCardList(() => {
              this.dataSwith(this.data, 'old')
            });
          } else {
            this.getCardList(() => {
              this.dataSwith(this.data, 'old')
            });
          }
        } else {
          this.getCardList(() => {
            this.dataSwith(this.data)
          });
        }

      }
    });

  },
  methods: {
    //获取卡片选择列表
    async getCardList(callback) {
      let result = await this.$https.post(this.$api.showcardlist, {
        persion_id: localStorage.getItem('openId'),
        pro_id: this.projectId,
        identify: this.$util.Md5(this.projectId + 'map')
      })
      console.log(result)
      if (result.data.status == 0) {
        this.pro_name = result.data.pro_name
        this.totalLimit = result.data.limit_num
        this.data = result.data.result_list
        this.userStep = result.data.anwserStatus
        this.card_headers = result.data.card_headers
        this.describe = result.data.step_describe_list[0].describe
        // this.describe = result.data['step_describe_list']
        callback && callback()
        // this.dataSwith(this.data)
      }
    },
    //输入密码后判断
    init(data) {

      if (this.userStep == 3) {
        this.$dialog.confirm({
          // title: '温馨提示',
          message: '您已经提交过答案，重复作答将<br>覆盖上次数据，是否继续？',
          className: 'alert'
        })
          .then(() => {
            // if(data.level_result_list)
            // sessionStorage.setItem('is_repeat', true)
            // this.getCardList(() => {
            //   this.dataSwith(this.data, 'old')
            // });
            // this.Mdata = JSON.parse(sessionStorage.getItem('oldMdata'))
            // this.Adata = JSON.parse(sessionStorage.getItem('oldAdata'))
            // this.Pdata = JSON.parse(sessionStorage.getItem('oldPdata'))
            // this.clickNum = sessionStorage.getItem('clickNum')
          })
          .catch(() => {
            window.close()
            wx.closeWindow();
            // sessionStorage.clear('oldMdata')
            // sessionStorage.clear('oldAdata')
            // sessionStorage.clear('oldPdata')
            // sessionStorage.clear('clickNum')
          });
      } else if (this.userStep == 2) {
        // this.getCardList();
        this.$dialog.confirm({
          // title: '温馨提示',
          message: '是否继续作答？',
          className: 'alert'
        })
          .then(() => {
            // if(data.level_result_list)
            sessionStorage.setItem('is_repeat', true)
            this.getCardList(() => {
              this.dataSwith(this.data, 'old')
            });
            // this.Mdata = JSON.parse(sessionStorage.getItem('oldMdata'))
            // this.Adata = JSON.parse(sessionStorage.getItem('oldAdata'))
            // this.Pdata = JSON.parse(sessionStorage.getItem('oldPdata'))
            // this.clickNum = sessionStorage.getItem('clickNum')
          })
          .catch(() => {

            // sessionStorage.clear('oldMdata')
            // sessionStorage.clear('oldAdata')
            // sessionStorage.clear('oldPdata')
            // sessionStorage.clear('clickNum')
          });
      } else {
        this.getCardList(() => {
          this.dataSwith(this.data)
        });
      }
      // let step = sessionStorage.getItem('step')
      // if (step) {
      //   if (step == 1) {

      //   } else {
      //     this.$router.push('/answerSelect')
      //   }
      // } else {
      //   sessionStorage.setItem('step', 1)
      // }
    },
    //数据处理
    dataSwith(arry, type) {
      this.Mdata = [];
      this.Adata = [];
      this.Pdata = [];
      arry.forEach((item) => {
        if (type == 'old') {
          if (item.is_selected == 1) {
            item.check = true
            this.clickNum++
          }
        } else {
          item.check = false
        }
        item.disable = false
        if (new RegExp(this.card_headers[0].card_code).test(item.card_code)) {
          this.Mdata.push(item)
        }
        if (new RegExp(this.card_headers[1].card_code).test(item.card_code)) {
          this.Adata.push(item)
        }
        if (new RegExp(this.card_headers[2].card_code).test(item.card_code)) {
          this.Pdata.push(item)
        }
      })
    },

    itemClick(arryName, id) {
      this[arryName].forEach((element, index) => {
        if (element.card_id == id) {
          if (element.disable) {
            return false
          }
          if (element.check) {

            element.check = !element.check
            this.$set(this[arryName], index, element)
            let rule = element.card_code.split('-')[0]
            this.disableCard(arryName, rule, id)
            this.clickNum--
          } else {
            if (this.clickNum < this.totalLimit) {
              element.check = !element.check
              this.$set(this[arryName], index, element)
              this.clickNum++
              let rule = element.card_code.split('-')[0]
              this.disableCard(arryName, rule, id)
            }
          }
        }
      });

    },
    //互斥卡片
    disableCard(arryName, rule, id) {
      this[arryName].forEach((element, index) => {
        let reg = new RegExp(rule)
        if (element.card_code.split('-')[0] == rule && element.card_id !== id) {
          element.disable = !element.disable
          this.$set(this[arryName], index, element)
        }
      })

    },
    swiperInit(type, s, e) {
      this.swiperIndex = s
      this.swiperType = type;
      this.swiperData = e;
      this.$refs.swip.showBox();
    },
    saveData(data, name) {
      let t = data.filter(item => {
        item.select = false
        item.bottomSelect = false
        switch (name) {
          case 'Mdata':
            item.type = "M"
            break;
          case 'Pdata':
            item.type = "P"
            break;
          case 'Adata':
            item.type = "A"
            break;
        }
        return item.check == true
      })
      sessionStorage.setItem(name, JSON.stringify(t))
      return t
    },
    next() {
      sessionStorage.setItem('step', 2)
      sessionStorage.setItem('clickNum', this.clickNum)
      sessionStorage.setItem('oldMdata', JSON.stringify(this.Mdata))
      sessionStorage.setItem('oldAdata', JSON.stringify(this.Adata))
      sessionStorage.setItem('oldPdata', JSON.stringify(this.Pdata))
      let one = [];
      this.saveData(this.Mdata, 'Mdata').forEach(element => {
        one.push(element.card_id)
      })
      this.saveData(this.Pdata, 'Pdata').forEach(element => {
        one.push(element.card_id)
      })
      this.saveData(this.Adata, 'Adata').forEach(element => {
        one.push(element.card_id)
      })
      let result_list = [{
        card_id: one.join(',')
      }]
      const loading = this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
      });
      this.$https.jsonPost(this.$api.submitresult, {
        pro_id: this.projectId,
        persion_id: localStorage.getItem('openId'),
        result_list: JSON.stringify(result_list),
        identify: this.$util.Md5(this.projectId + 'map')
      }).then(res => {
        loading.clear()
        this.$router.push('/answerSelect?pro_id=' + this.projectId)
      })

    },
  }

}
</script>
<style lang="less" scoped>
.answer-page {
  width: 100%;
  padding-top: 65px;
  min-height: 100%;
  padding-bottom: 109px;
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
    line-height: 20px;
    padding: 0 20px;
    margin-top: 11px;
  }
  .tip {
    display: -webkit-inline-flex;
    display: inline-flex;
    align-items: center;
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
    justify-content: left;
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
      margin-right: 10px;
      margin-bottom: 12px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
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