import wepy from 'wepy'
import {  $post, $get } from '@/apiJs/api';

// HTTP工具类
export default class index {
  // 轮播
  static async banner() {
    return await $post('/banner/list');
  }
  // 轮播下方
  static async below() {
    return await $post('/banner/below');
  }
  // 分类
  static async category() {
    return await $post('/category/list');
  }
  // 获取商品列表
  static async getListBySelect(data){
    return await $post('/goods/getListBySelect',data);
  }
}
