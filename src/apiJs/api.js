/*
 * @Author: killua
 * @Date: 2019-03-05 16:04:56
 * @Last Modified by: killua
 * @Last Modified time: 2019-03-11 10:28:00
 */
import wepy from 'wepy'
import Tips from '@/utils/tips.js'
const baseUrl = 'https://zishiapi.gzdianhui.cn'
// const baseUrl = 'https://192.168.1.231:8088'
const isDebug = true
//  拦截器 请求配置 app.wpy => constructor中配置
const requestConfig = {
    // 发出请求时的回调函数
  config (p) {
    wx.showNavigationBarLoading()
    // isDebug && console.log('config request: ', p)
    p.timestamp = +new Date()
    if (p.name) { // 针对uploadFile添加请求头
      p.header = { 'accessToken': wx.getStorageSync('Token') }
    } else {   // 针对request 添加请求头
      p.header = Object.assign(p.header, { 'accessToken': wx.getStorageSync('Token') })
    }
    return p
  },
  success (p) {
      // 可以在这里对收到的响应数据对象进行加工处理
    if (typeof p.data === 'string') {
      p.data = JSON.parse(p.data)
    }
    // isDebug && console.log('request success: ', p.data)
    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    if (p.data.code === 9999) {
      wepy.showToast({
        title: p.data.message,
        icon: 'none',
        duration: 2000
      })
    }
    return p.data
  },
  fail (p) {
    // isDebug && console.log('request fail: ', p)
    return p
  },
  complete (p) {
    // isDebug && console.log('request complete: ', p)
    wx.hideNavigationBarLoading()
  }
}

const $post = (url, data, changect) => {
  return wepy.request({
    url: baseUrl + url, // 开发者服务器接口地址",
    data: data, // 请求的参数",
    method: 'POST',
    header: {
      'content-type': changect === 'changect' ? 'application/json' : 'application/x-www-form-urlencoded'
    },
    dataType: 'json' // 如果设为json，会尝试对返回的数据做一次 JSON.parse
  })
}

const $get = (url, data) => {
  return wepy.request({
    url: baseUrl + url,
    data: data,
    method: 'GET',
    dataType: 'json'
  })
}

const api = {
  /* 微信相关 */
  //  微信用户信息授权
  wxUserInfo (data) {
    return $post('/weChat/getSessionKeyOropenid', data)
  },

  /* 用户 */
  //  登录
  login (data) {
    return $get('/outer/login', data)
  },
  // 判断token过期
  verifyToken (data) {
    return $post('/outer/token', data)
  },

  // 判断是否授权
  judge () {
    if (!wx.getStorageSync('Token')) {
      wepy.getSetting().then(async (res) => {
        if (res.authSetting['scope.userInfo'] === false || !res.authSetting['scope.userInfo']) {
          // wepy.navigateTo({ url: '/pages/wxInfo' })
        } else {
          let resLoing = await wepy.login()
          if (resLoing.code) {
            var code = resLoing.code
          }
          wepy.getUserInfo().then(res => {
            console.log(res)
            const data = {
              code: code,
              iv: res.iv,
              encryptedData: res.encryptedData,
              customerId: wepy.$instance.globalData.customerId
            }
            api.wxUserInfo(data).then(res => {
              wx.setStorageSync('Token', res.data)
              wepy.reLaunch({
                url: '/pages/index'
              })
            })
          })
        }
      })
    } else {
      api.verifyToken({
        token: wx.getStorageSync('Token')
      }).then(res => {
        console.log(res)
        if (res.code !== 0) {   // token过期
          wx.setStorageSync('Token', '')
          api.judge()
        }
      })
    }
  },

  // 判断是否是代理
  judgeAgent () {
    if (!wepy.$instance.globalData.isAgent) {
      Tips.confirm('您未登录代理，快去登录使用更多功能吧~').then(res => {
        wepy.navigateTo({ url: '/pages/login' })
      })
      return false
    } else {
      return true
    }
  },

  // 判断代理是否是被禁用
  judgeAgentForbit () {
    console.log(wepy.$instance.globalData.isForbit)
    if (wepy.$instance.globalData.isForbit) {
      Tips.modal('抱歉，您已被禁用').then(res => {
        wepy.reLaunch({ url: '/pages/index' })
      })
      return false
    } else {
      return true
    }
  },
  // 未授权，先跳转授权
  toAuthor () {
    if (!wx.getStorageSync('Token')) {
      wepy.navigateTo({
        url: '/pages/wxInfo'
      })
      return false
    } else {
      return true
    }
  }

}

export {requestConfig, baseUrl, isDebug, $post, $get}
export default api
