import wepy from 'wepy'
import { $post, $get } from '@/apiJs/api'

// HTTP工具类
export default class search {
  // 获取热搜词
  static async hotsearchdata (data) {
    return await $post('/goods/hotsearchdata', data)
  }
}
