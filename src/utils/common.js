// 封装方法
module.exports = {
  trim: trim   // 去除首尾空格
}
// 去除首尾空格
function trim (str) {
  if (!str) return ''
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
