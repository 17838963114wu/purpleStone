import wepy from 'wepy'
import { $post, $get } from '@/apiJs/api'

// HTTP工具类
export default class address {
  // 添加地址
  static async addressSave (data) {
    return await $post('/address/save', data)
  }
  // 获取省级信息列表
  static async provinceList (data) {
    return await $post('/province/list', data)
  }
  // 根据省级ID获取市级信息
  static async getCitiesById (data) {
    return await $post('/city/getCitiesById', data)
  }
  // 根据市级ID获取区县信息
  static async getAreaById (data) {
    return await $post('/area/getAreaById', data)
  }
  // 更新地址
  static async addressUpdate (data) {
    return await $post('/address/update', data)
  }
  // 删除地址
  static async delAddress (data) {
    return await $post('/address/batchRemove', data)
  }
  // 根据地址ID获取该地址详细信息
  static async getAddressById (data) {
    return await $post('/address/getAddressById', data)
  }
}
