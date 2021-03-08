<template>
  <div class="home">
    <div v-show="pageInit" class="page">
      <div v-if="workList.length==0&&searchContent==''&&selectValue==''" class="empty-box">
        <img src="../assets/img/empty.png" alt="" class="empty-img">
        <div class="empty-name">暂无项目</div>
        <button class="btn" @click="showNew=true">新建项目</button>
      </div>
      <div class="work-list" v-else>
        <div class="search-big-box">
          <div class="search-box">
            <span class="icon-search"></span><input type="search" placeholder="请输入项目名称" v-model="searchContent" @input="onSearchClear">
            <div class="search-btn" v-show="searchContent!=''" @click="getList('search')"><img src="../assets/img/seach-btn.png" alt=""></div>
          </div>
        </div>
        <div class="chose-box">
          <div class="chose-inner">
            <div class="chose-btn">
              <div class="chose-name" @click="select=true">{{selectName}}</div>
              <div class="chose-icon">
                <img src="../assets/img/icon-down.png" alt="">
              </div>
            </div>
            <button class="new-btn" @click="newProject">新建项目</button>
          </div>
        </div>

        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh" class="bottom-list">
          <div class="card-list-box">
            <card v-for="(item,index) in workList" :key="index" :data="item" @showErweima="erweimaShow" @editName="editCardName" @update="getList" @shareClick="weixinshare=true"></card>
          </div>
        </van-pull-refresh>

      </div>
      <showShare v-show="weixinshare" @hide="weixinhide"></showShare>
      <van-popup v-model="showNew" :close-on-click-overlay="true">
        <new-project @success="add" @close='newProjectHidden' @limitSelectShow="showLimit" ref="newP"></new-project>
      </van-popup>
      <erweima v-show="showErweima" @close="erweimaHide" :data="erweimaData" ref="erweima"></erweima>
      <van-popup v-model="showPicker" round position="bottom" class="action">
        <van-picker safe-area-inset-bottom show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" title="胜任力潜质可选数量上限" />
      </van-popup>
      <!-- 选择项目类别 -->
      <van-popup v-model="select" round position="bottom" class="action">
        <van-picker safe-area-inset-bottom show-toolbar :columns="selectColumns" @cancel="select = false" @confirm="selectInshure" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Picker, PullRefresh } from 'vant';
Vue.use(Picker).use(PullRefresh);
import html2canvas from 'html2canvas'
import newProject from '../components/common/newProject.vue'
import card from '@/components/home/projectCard.vue'
import erweima from '@/components/home/propErweima.vue'
import showShare from '@/components/common/shareWeixin.vue'
export default {
  name: 'Home',
  data() {
    return {
      val: '',
      allEmpty: false,
      searchContent: '',
      selectName: '全部项目',
      selectValue: '',
      select: false,
      showErweima: false,
      erweimaData: {},
      isLoading: false,
      workList: [],
      showNew: false,
      showPicker: false,
      selectColumns: [{ text: '全部项目', value: '' }, { text: '进行中', value: '1' }, { text: '已关闭', value: '2' }],
      columns: [
        {
          text: '6',
          children: [
            {
              text: '-',
              children: [
                { text: '7' },
                { text: '8' },
                { text: '9' },
                { text: '10' },
                { text: '11' },
                { text: '12' },
                { text: '13' },
                { text: '14' },
                { text: '15' },
                { text: '16' },

              ],
            },
          ],
        },
      ],
      pageInit: false,
      weixinshare: false,
      share_title: '',
      share_sub_title: '',
      share_jpg: '',
    }
  },
  components: {
    newProject,
    card,
    erweima,
    showShare

  },
  created() {

  },
  mounted() {
    // this.$outGet('https://open.weixin.qq.com/connect/oauth2/authorize', {
    //   appid: 'wxfab1cb0745c84b6b',
    //   redirect_uri: '',
    //   response_type: 'code',
    //   scope: 'snsapi_userinfo',
    //   state: 'A',
    // })
    this.$util.getOpenCode(() => {
      this.$util.setWXconfig(() => {
        this.getList('init');
      });
    });
    // this.getList('init');
  },
  methods: {
    add(item) {
      console.log('dddddddeeeee')
      this.showNew = false
      // this.workList.push(item)
      this.getList()
    },
    //选择项目类别
    choseType() {
      this.select = true
    },
    selectInshure(value) {
      console.log(value)
      this.selectName = value.text;
      this.selectValue = value.value
      this.select = false
      this.getList('search');
    },
    onSearchClear() {
      if (this.searchContent == '') {
        this.getList('search')
      }
    },
    newProjectHidden() {
      this.showNew = false
    },
    newProject() {
      this.showNew = true
    },
    onConfirm(value) {
      this.showPicker = false
      console.log(value.join(''))
      this.$refs.newP.changeLimit(value.join(''))
      console.log(value)
    },
    //显示二维码
    async erweimaShow(cardData) {
      this.showErweima = true
      this.erweimaData = cardData;
      // this.$refs.erweima.createImg(cardData)
      // let getImage = this.$https.get(this.$api.generaterQrImg, {
      //   pro_id: cardData.pro_id,
      //   identify: this.$util.Md5(cardData.pro_id + 'map'),
      // })
      const loading = this.$toast.loading({
        message: '生成二维码...',
        forbidClick: true,
      });
      if (!cardData.qrcode_img) {
        let result = await this.$https.get(this.$api.generaterQrImg, {
          pro_id: cardData.pro_id,
          identify: this.$util.Md5(cardData.pro_id + 'map'),
        })
        cardData.qrcode_img = result.data.qrcode_url
      }
      let qcImg = new Image();
      qcImg.src = cardData.qrcode_img
      qcImg.onload = () => {
        this.$nextTick(() => {
          // let box = document.querySelector('#erweima')
          let box = this.$refs.erweima.$refs.erweimabox
          console.log(box, 'eeeee', box.clientWidth, box.clientHeight)
          let bigBox = document.querySelector('#erweimabox')

          html2canvas(box, {
            useCORS: true,
            allowTaint: true,
            width: box.clientWidth,
            height: box.clientHeight,
            x: 0,
            y: 0

          })
            .then((canvas) => {
              let canvasUrl = canvas.toDataURL('image/png'); // 将canvas转成base64图片格式
              console.log(canvasUrl)
              this.$https.jsonPost(this.$api.downloadpic, {
                pro_id: cardData.pro_id,
                identify: this.$util.Md5(cardData.pro_id + 'map'),
                base64Image: canvasUrl
              }).then(res => {
                if (res.data.status == 0) {
                  this.$refs.erweima.showUrl(res.data.picture_download_url)
                  loading.clear()
                } else {
                  this.$notify(res.data.message)
                }
              })

            }).catch((e) => {
              console.log(e, 'error')
            });


        })
      }

      // this.$https.post(this.$api.downloadpic, {
      //   base64Image: '',
      //   pro_id: cardData.pro_id,
      //   identify: this.$util.Md5(cardData.pro_id + 'map')
      // })
    },
    //隐藏二维码
    erweimaHide() {
      this.showErweima = false
    },
    onRefresh() {

      let sendData = {
        identify: this.$util.Md5(localStorage.getItem('openId') + 'map'),
        pro_name: this.searchContent,
        pro_status: this.selectValue
      }
      this.$https.post(this.$api.showprojectList, sendData).then(res => {

        if (res.data.status == 0) {
          this.workList = res.data.result_list
        }
        this.isLoading = false
      })

    },
    //显示范围选择器
    showLimit() {
      this.showPicker = true
    },
    //编辑名称
    editCardName(id, name) {
      this.workList.forEach(item => {
        if (item.pro_id == id) {
          item.pro_name = name
        }
      })
    },
    //获取项目列表
    getList(type) {
      console.log(type)
      const loading = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let sendData = {
        identify: this.$util.Md5(localStorage.getItem('openId') + 'map'),
        pro_name: this.searchContent,
        pro_status: this.selectValue
      }
      this.$https.post(this.$api.showprojectList, sendData).then(res => {

        if (res.data.status == 0) {
          this.workList = res.data.result_list
          this.share_title = res.data.share_title
          this.share_sub_title = res.data.share_sub_title
          this.share_jpg = res.data.share_jpg
          let _this = this;

          wx.onMenuShareAppMessage({
            title: _this.share_title, // 分享标题
            desc: _this.share_sub_title, // 分享描述
            link: window.location.origin + window.location.pathname, // 分享链接
            imgUrl: _this.share_jpg, // 分享图标
            // type: 'video', // 分享类型,music、video或link，不填默认为link
            // dataUrl: getForwardUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              // weui.toast('分享成功');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              // weui.toast('取消分享');
            }
          });
        }
        if (type == "init") {
          this.pageInit = true;
        }
        console.log(this.workList.length, type, '3333')
        if (this.workList.length == 0 && type == 'search') {
          this.$notify('未查找到项目')
        }
        loading.close()
      })
    },
    //隐藏微信提示
    weixinhide() {
      this.weixinshare = false
      let _this = this;
      wx.onMenuShareAppMessage({
        title: _this.share_title, // 分享标题
        desc: _this.share_sub_title, // 分享描述
        link: window.location.origin + window.location.pathname, // 分享链接
        imgUrl: _this.share_jpg, // 分享图标
        // type: 'video', // 分享类型,music、video或link，不填默认为link
        // dataUrl: getForwardUrl, // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          // weui.toast('分享成功');
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          // weui.toast('取消分享');
        }
      });
      console.log('恢复设置')
    }

  }
}
</script>
<style lang="less" scoped>
.page {
  height: 100%;
}
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
    .flexbox;
    position: relative;
    width: 345px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    border-radius: 6px;
    background: #f7f7f7;
    align-items: center;
    overflow: hidden;
    .icon-search {
      display: block;
      width: 20px;
      height: 20px;
      background: url(../assets/img/icon-search.png) no-repeat center center;
      .backgroundSize(100%);
      margin: 0px 5px 0 12px;
    }
    input {
      border: 0;
      width: 240px;
      background: none;
      font-size: 14px;
    }
    .search-btn {
      position: absolute;
      width: 58px;
      top: 0;
      right: 0;
      img {
        display: block;
        width: 100%;
      }
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
      color: @main_color;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid @main_color;
    }
  }
}
.bottom-list {
  min-height: calc(100% - 112px);
}
.card-list-box {
  min-height: 100%;
  padding-top: 20px;
  // overflow: hidden;
}
</style>
