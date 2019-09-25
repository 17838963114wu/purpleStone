import wepy from 'wepy'
import { $post, $get, $upload } from '@/apiJs/api'

// HTTP工具类
export default class agent {
  // 显示代理中心信息
  static async getInfo (data) {
    return await $post('/customer/getInfo', data)
  }

  // 获取代理个人资料
  static async getPersonalInfo (data) {
    return await $post('/customer/getPersonalInfo', data)
  }

  // 上传图片
  static async uploadImg (imgArr, count) {
    return await $post('/file/upload', imgArr, count)
  }

  // 填写推荐码验证
  static async authorization (data) {
    return await $post('/customer/authorization', data)
  }

  // 修改资料
  static async updatePersonalInfo (data) {
    return await $post('/customer/updatePersonalInfo', data)
  }

  // 验证验证码 (修改手机号时，验证原手机号)
  static async checkcaptcha (data) {
    return await $post('/outer/checkcaptcha', data)
  }

  // 保存新的手机号
  static async updatePersonalMobile (data) {
    return await $post('/customer/updatePersonalMobile', data)
  }

  // 团队管理列表
  static async getTreeList (data) {
    return await $post('/customer/getTreeList', data)
  }
  // 查看详情
  static async checkDetail (data) {
    return await $post('/customer/check', data)
  }

  // 我的名片
  static async getCustomerName (data) {
    return await $post('/customer/getCustomerName', data)
  }

  // 我的二维码
  static async render (data) {
    return await $post('/customer/img/render', data)
  }

  // 我的返利
  static async getMyCashBack (data) {
    return await $post('/commissionLog/list', data)
  }
}
