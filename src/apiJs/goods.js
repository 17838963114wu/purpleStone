import wepy from 'wepy'
import { $post, $get } from '@/apiJs/api'

// HTTP工具类
export default class goods {
  // 获取商品详情
  static async getGoodsInfo (data) {
    return await $post('/goods/getGoodsInfo', data)
  }

  // 获取用户购物车商品的数量
  static async getcount (data) {
    return await $post('/cart/selectCartCount', data)
  }
  // 获取购物车数量
  static async selectCartCount () {
    $post('/cart/selectCartCount').then(res => {
      let count = res.data
      if (count > 99) {
        wx.setTabBarBadge({
          index: 1,
          text: '99+'
        })
      } else if (count > 0 && count < 99) {
        wx.setTabBarBadge({
          index: 1,
          text: count.toString()
        })
      } else if (count === 0) {
        wx.removeTabBarBadge({
          index: 1
        })
      }
    })
  }

  // 加入购物车
  static async addCart (data) {
    return await $post('/cart/addCart', data)
  }

  // 购物车列表
  static async cartList (data) {
    return await $post('/cart/list', data)
  }

  // 购物车更改数量
  static async cartUpdata (data) {
    return await $post('/cart/update', data)
  }

  // 购物车删除
  static async batchRemove (data) {
    return await $post('/cart/batchRemove', data)
  }
}
