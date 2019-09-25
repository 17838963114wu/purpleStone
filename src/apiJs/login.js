import wepy from 'wepy'
import { $post, $get } from '@/apiJs/api'

// HTTP工具类
export default class goods {
  // 登录
  static async login (data) {
    return await $post('/outer/login', data)
  }

  // 提交代理申请
  static async applyAgent (data) {
    return await $post('/application/add', data)
  }

  // 获取验证码
  static async captchaCode (data) {
    return await $post('/outer/captcha', data)
  }

  // 协议详情
  static async agreedDetail (data) {
    return await $post('/baseInfo/detail', data)
  }

  // 修改密码
  static async forgetPassword (data) {
    return await $post('/outer/forgetPassword', data)
  }
  // 验证验证码 (修改手机号时，验证原手机号)
  static async checkcaptcha (data) {
    return await $post('/outer/checkcaptcha', data)
  }

  // 申请状态
  static async status (data) {
    return await $post('/application/status', data)
  }
}
