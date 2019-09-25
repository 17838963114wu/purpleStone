import wepy from 'wepy'
import { $post, $get } from '@/apiJs/api'

// HTTP工具类
export default class order {
  // 获取地址列表
  static async addressList (data) {
    return await $post('/address/list', data)
  }
  // 获取订单列表
  static async orderList (data) {
    return await $post('/order/list', data)
  }
  // 根据订单ID获取订单详细信息
  static async getOrderById (data) {
    return await $post('/order/getOrderById', data)
  }
  // 商品详情提交订单
  static async addOrder (data) {
    return await $post('/order/addOrder', data)
  }

  // 购物车提交订单
  static async addCartOrder (data) {
    // return await $post('/cart/addCartOrder', data)
    return await $post('/cart/addCartOrder', data, 'changect')
  }

  // 获取支付参数
  static async unifiedOrder (data) {
    return await $post('/weChat/unifiedOrder', data)
  }
}
