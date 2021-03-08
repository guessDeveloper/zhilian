import https from './https'
import $api from './api'
import md5 from 'js-md5'
export default {
  isInweixin: /MicroMessenger/i.test(navigator.userAgent.toLowerCase()),
  getWeixinScope() {

  },
  //获取url 参数
  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let url = window.location.href.split('#')[0]
    let search = url.split('?')[1]
    if (search) {
      var r = search.substr(0).match(reg)
      if (r !== null)
        return unescape(r[2])
      return null
    } else
      return null
  },
  //判断当前是否有code
  async getOpenCode(callback) {
    let code = this.getUrlParam('code')
    if (localStorage.getItem('openId')) {
      callback && callback()
    } else {
      if (code == null || code === '') {
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfab1cb0745c84b6b&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
      } else {
        let resoult = await https.post($api.wxlogin, { code: code })
        console.log(resoult, 'ddddd')
        console.log(resoult.data.status, 'fffff')
        if (resoult.data.status == 0) {
          localStorage.setItem('openId', resoult.data.openid)
          callback && callback()
        }
        console.log(localStorage.getItem('openId'), 'eeee')
      }
    }
  },
  //微信jsSdk 注册
  setWXconfig(callback) {
    https.post($api.getJsAuthParams, {
      signUrl: window.location.href.split('#')[0]
    }).then(res => {

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxfab1cb0745c84b6b', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            console.log(res, 'success')
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        });
        wx.hideMenuItems({
          menuList: [
            // 'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook',
            'menuItem:share:QZone'
          ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
        callback && callback()
      })
    })
  },
  //公参加密
  Md5(income) {
    return md5(md5(income).toUpperCase()).toUpperCase()
  }
}