
const util = {
    // 页面跳转
  goPath: (url, method = 'ng') => {
    console.log(0)
    switch (method) {
      case 'ng':
        wx.navigateTo({ url: url })
        break
      case 'rl':
        wx.reLaunch({ url: url })
        break
      case 'rd':
        wx.redirectTo({ url: url })
        break
      case 'st':
        wx.switchTab({ url: url })
        break
      default:
        wx.navigateTo({ url: url })
        break
    }
  },

    // 获取容器高度
  getContainerHeight: (selector) => {
        // 创建节点选择器
    return new Promise((resolve, reject) => {
      let query = wx.createSelectorQuery()
      query.select(selector).boundingClientRect().exec((res) => {
        resolve(res[0].height) // 获取容器高度
      })
    })
  }
}
export default util
