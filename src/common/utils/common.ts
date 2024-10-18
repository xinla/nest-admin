/**
 * 通用js方法封装处理
 */

/**
 * url参数转对象
 * @param {string} url
 * @returns {Object}
 */
export function query2Obj(url) {
  url = url || window.location.href
  let search = url.substring(url.indexOf('?') + 1)
  let obj = {}
  let reg = /([^?&#=]+)=([^?&#=]*)/g
  search?.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 对象转url参数
 * @param {Object} obj
 * @returns {Array}
 */
export function obj2query(obj) {
  if (!obj) return ''
  return Object.keys(obj)
    .map((key) => {
      if (obj[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    })
    .join('&')
}

/**
 * 获取url参数中name对应的值
 * @param {string} name
 */
export function getQueryValue(name) {
  let reg = new RegExp('(^|&|\\?)' + name + '=([^&#]*)(&|#|$)')
  let r = window.location.href.match(reg)
  return r ? decodeURIComponent(r[2]) : ''
}

/**
 * 获取字节长度
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 下划转驼峰
export function _a2A(str) {
  return str.replace(/_[a-z]/g, (str1) => str1.substr(-1).toUpperCase())
}

// 驼峰转下划
export function A2_a(str) {
  return str.replace(/[A-Z]/g, (str1) => '_' + str1.substr(-1).toLowerCase())
}

/**
 * 生成指定长度的随机字符串
 * @param {number} length 字符串长度
 * @param {string} before 前缀
 * @param {string} after 后缀
 * @returns {string}
 */
export function uuid(length, before = '', after = '') {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charsLen = chars.length
  let uuid = []
  for (let i = 0; i < length; i++) {
    uuid[i] = chars.charAt(0 | (Math.random() * charsLen))
  }
  return before + uuid.join('') + after
}

// 判断是否为移动端
export function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  )
  return flag
}

/**
 * 递归删除树形对象中的某些字段
 * @param {Object} obj
 * @param {Array} keyArray
 */
export function delTreeKeys(obj, keyArray) {
  for (const key in obj) {
    const element = obj[key]
    if (element && typeof element == 'object') {
      delTreeKeys(element, keyArray)
    }
    keyArray.includes(key) && delete obj[key]
  }
  return obj
}

/**
 * 数组构造树型结构数据
 * @param {Array} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function arrayToTree(data, id?, parentId?, children?) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  let result = []
  data = JSON.parse(JSON.stringify(data))
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach((item) => {
    delete item[children]
  })
  let map = {}
  data.forEach((item) => {
    map[item[id]] = item
  })
  data.forEach((item) => {
    let parent = map[item[parentId]]
    if (parent) {
      parent[children] || (parent[children] = [])
      parent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 树转数组
 * @param {Array} tree
 * @param {String} children 孩子节点字段 默认 'children'
 * @param {Function} callback 回调函数
 * @returns {Array}
 */
export function treeToArray(tree = [], children = 'children', callback) {
  let result = []
  let level = 0
  function dg(obj) {
    callback && callback(obj, result, level)
    ++level
    if (obj[children]) {
      result.push(...obj[children])
      obj[children].forEach((e) => {
        dg(e)
      })
      // delete obj.children
    }
    --level
  }
  if (Array.isArray(tree)) {
    result.push(...tree)
    tree.forEach((e) => dg(e))
  } else {
    result.push(tree)
    dg(tree)
  }
  return result
}
/**
 * @returns {String} 当前浏览器名称
 */
export const getBrowser = (userAgent) => {
  const isExplorer = (exp) => {
    return userAgent.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
  else return '其他'
}

/**
 * 判断当前系统类型
 */
export function getSystem(userAgent) {
  if (/MicroMessenger/i.test(userAgent)) {
    return 'weChat'
  } else if (/win/i.test(userAgent)) {
    return 'Windows'
  } else if (/linux/i.test(userAgent)) {
    return 'Linux'
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    return 'Mac OS'
  } else if (/android/i.test(userAgent)) {
    return 'Android'
  } else if (/iphone/gi.test(userAgent)) {
    return 'IOS iPhone'
  } else if (/ipad|iPod/gi.test(userAgent)) {
    return 'IOS ipad'
  } else {
    return '其他'
  }
}
