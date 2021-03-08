<template>
  <div class="card">
    <div class="card-top">
      <div class="part-one">
        <div class="name">{{data.pro_name}}</div>
        <div class="time">创建时间：<span>{{data.create_time}}</span></div>
        <div class="time">登录密码：<span>{{data.pro_password}}</span></div>
        <div class="state running" v-show="data.pro_status ==1">进行中</div>
        <div class="state suspend" v-show="data.pro_status == 2">已关闭</div>
      </div>
      <div class="part-two">
        <div class="num">{{data.finish_num}}</div>
        <div class="num-name">回收进度</div>
      </div>
    </div>
    <div class="card-bottom">
      <div class="item" @click="weixinSendAppMessage"><span class="icon icon-share"></span><span class="name">分享至微信</span></div>
      <div class="item" @click="showErweima"><span class="icon icon-link"></span><span class="name">查看项目链接</span></div>
      <div class="item" @click="goResult"><span class="icon icon-resoult"></span><span class="name">查看结果</span></div>
    </div>
    <div class="more" @click="showMore">
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <van-dialog v-model="showEdit" show-cancel-button :before-close="editOk">
      <EditName :data="data" @close="editClose" ref="deit" @sucess="editSucess">
      </EditName>
    </van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
import EditName from '@/components/home/editProduct.vue'
export default {
  data() {
    return {
      show: false,
      showEdit: false,
      actions: [{ name: '修改项目名称' }, { name: '删除项目' }, { name: '关闭项目' }, { name: '取消', color: '#0154A8' }],
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  components: {
    EditName
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      switch (item.name) {
        case '关闭项目':
          this.$dialog.confirm({
            title: '关闭项目',
            message: '关闭后项目终止，可重新开启，请确认',
            beforeClose: (action, done) => {
              if (action == 'confirm') {
                this.closeProject(done, 2)
              } else {
                done()
              }
            }
          })
          // .then(() => {
          //   console.log('关闭')
          //   this.closeProject();

          // })
          // .catch(() => {
          //   // on cancel
          // });
          break;
        case '删除项目':
          this.$dialog.confirm({
            title: '删除项目',
            message: '删除后项目终止且数据无法恢复，请确认',
            beforeClose: (action, done) => {
              if (action == 'confirm') {
                this.closeProject(done, 3)
              } else {
                done()
              }
            }
          })

          break;
        case '重启项目':
          this.$dialog.confirm({
            title: '是否重启项目？',
            // message: '是否重启项目？',
            beforeClose: (action, done) => {
              if (action == 'confirm') {
                this.closeProject(done, 1)
              } else {
                done()
              }
            }
          })

          break;
        case '修改项目名称':
          this.showEdit = true
          this.$nextTick(() => {
            this.$refs.deit.init()
          })
          break;

      }

    },
    //显示菜单
    showMore() {
      if (this.data.pro_status == 2) {
        this.actions = [{ name: '修改项目名称' }, { name: '删除项目' }, { name: '重启项目' }, { name: '取消', color: '#0154A8' }]
      } else {
        this.actions = [{ name: '修改项目名称' }, { name: '删除项目' }, { name: '关闭项目' }, { name: '取消', color: '#0154A8' }]
      }
      this.show = true
    },
    //显示二维码
    showErweima() {
      if (this.data.pro_status == 1) {
        this.$emit('showErweima', this.data)
      } else {
        this.$dialog.alert(
          {
            message: '项目已关闭',
            className: 'alert'
          }
        )
      }
    },
    //编辑名称关闭
    editClose() {

      this.showEdit = false

    },
    //查看结果
    goResult() {
      if (this.data.finish_num == 0) {
        this.$dialog.alert(
          {
            message: '暂无数据',
            className: 'alert'
          }
        )
      } else {
        if (this.data.is_generate_result == 0) {
          this.$router.push(`/projectPersion?pro_id=${this.data.pro_id}`)
        } else {
          this.$router.push(`/result?pro_id=${this.data.pro_id}`)
        }
      }
    },
    //编辑名称
    editSucess(name) {
      this.showEdit = false

      this.$emit('editName', this.data.pro_id, name)
    },
    //关闭项目
    closeProject(done, status) {
      this.$https.post(this.$api.editproject, {
        pro_id: this.data.pro_id,
        pro_name: this.data.pro_name,
        identify: this.$util.Md5(this.data.pro_id + 'map'),
        pro_status: status
      }).then(res => {
        console.log(res)
        if (res.data.status == 0) {
          done()
          this.$emit('update')
        }
      })
    },
    //分享给朋友
    weixinSendAppMessage(title, desc, link, imgUrl) {
      let _this = this;
      // console.log(WeixinJSBridge)
      // WeixinJSBridge.invoke('sendAppMessage', {
      //   "appid": 'wxfab1cb0745c84b6b',
      //   "img_url": _this.data.qrcode_img,
      //   //"img_width":"640",
      //   //"img_height":"640",
      //   "link": _this.data.qrcode_url,
      //   "desc": _this.data.qrcode_sub_title,
      //   "title": _this.data.qrcode_title
      // }, function (res) {
      //   console.log(res, '分享')
      // });
      if (this.data.pro_status == 1) {
        console.log(this.data)
        wx.onMenuShareAppMessage({
          title: _this.data.qrcode_title, // 分享标题
          desc: _this.data.qrcode_sub_title, // 分享描述
          link: _this.data.qrcode_url, // 分享链接
          imgUrl: _this.data.share_jpg, // 分享图标
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
        this.$emit('shareClick')
      } else {
        this.$dialog.alert(
          {
            message: '项目已关闭',
            className: 'alert'
          }
        )
      }

      console.log('设置分享成功', this.data)
    },
    //编辑名称
    editOk(action, done) {
      if (action == 'confirm') {
        let newName = this.$refs.deit.getNewName()
        if (newName == '') {
          this.$notify('请输入项目名称')
          done(false)
          return false
        }
        if (/"|'|<|>|\//.test(newName)) {
          this.$notify('不能输入",' + "',/,<,>特殊符号")
          done(false)
          return false
        }
        this.$https.post(this.$api.editproject, {
          pro_id: this.data.pro_id,
          pro_name: newName,
          identify: this.$util.Md5(this.data.pro_id + 'map'),
          pro_status: this.data.pro_status
        }).then(res => {
          if (res.data.status == 0) {
            this.$emit('editName', this.data.pro_id, newName)
            done()
          } else {
            this.$notify(res.data.message)
            done(false)
          }
        })
      } else {
        done()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.card {
  position: relative;
  width: 345px;
  // height: 163px;
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
    min-height: 127px;

    .part-one {
      width: 255px;
      padding: 18px 20px 0 20px;
      .name {
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        .twolineText;
        margin-bottom: 3px;
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
        margin-bottom: 12px;
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