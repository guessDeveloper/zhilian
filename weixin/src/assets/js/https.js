import Axios from 'axios'
import qs from 'qs'
// const baseUrl = process.env.NODE_ENV === 'production' ? 'http://1.119.40.66:8888' : '/Sev'
const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/Sev'
// 设置拦截
const instance = Axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  }
})
// instance.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           store.commit('isLogin', false)

//         // location.reload()
//       }
//     }
//     return Promise.reject(error.response.data) // 返回接口返回的错误信息
//   })
export default {
  get(url, parame) {
    let baseData = {
      person_id: localStorage.getItem('openId')
    };
    let data = JSON.parse(JSON.stringify(baseData))
    data = Object.assign(data, parame)
    Object.keys(data).forEach(item => {
      if (!data[item]) delete data[item]
    })
    return instance.get(baseUrl + url, {
      params: data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }
    })
  },
  post(url, parame) {
    let baseData = {
      person_id: localStorage.getItem('openId')
    };
    let data = JSON.parse(JSON.stringify(baseData))
    data = Object.assign(data, parame)
    Object.keys(data).forEach(item => {
      if (!data[item]) delete data[item]
    })
    return instance({
      url: baseUrl + url,
      method: 'post',
      data: qs.stringify(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }
    })
  },
  jsonPost(url, parame) {
    let baseData = {
      person_id: localStorage.getItem('openId')
    };
    let data = JSON.parse(JSON.stringify(baseData))
    data = Object.assign(data, parame)
    Object.keys(data).forEach(item => {
      if (!data[item]) delete data[item]
    })
    return instance({
      url: baseUrl + url,
      method: 'post',
      data: data,
      headers: {
        'content-type': 'application/json',
        // 'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }
    })
  },
  outGet(url, parame) {
    let data = JSON.parse(JSON.stringify(baseData))
    data = Object.assign(data, parame).map(item => item !== null)
    return instance.get(url, {
      params: data,
      // headers: {
      //   'content-type': 'application/x-www-form-urlencoded',
      //   // 'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
      // }
    })
  }
}