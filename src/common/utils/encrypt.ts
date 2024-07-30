// 加密
const { subtle, getRandomValues } = globalThis.crypto
const ec = new TextEncoder()
// const iv = ec.encode('nestAdmin')
const iv = Uint8Array.from([40, 157, 36, 126, 11, 144, 3, 41, 39, 8, 79, 210, 230, 222, 167, 91])
// const rawKey = Uint8Array.from('nestAdmin')
// const rawKey = globalThis.crypto.getRandomValues(new Uint8Array(256))
// const rawKey = await generateAesKey()
const rawKey = Uint8Array.from([
  194, 181, 53, 234, 250, 85, 168, 205, 114, 199, 141, 228, 115, 99, 93, 17, 234, 15, 185, 94, 247, 13, 104, 251, 146,
  183, 87, 41, 29, 153, 44, 32,
])

async function generateAesKey(mode = 'AES-GCM', length = 256) {
  let key = await subtle.generateKey({ name: mode, length }, true, ['encrypt', 'decrypt'])
  // 导出
  const exportedKeyBuffer = await subtle.exportKey('raw', key)
  return new Uint8Array(exportedKeyBuffer)
}

async function importKey(rawKey, mode = 'AES-GCM') {
  return await subtle.importKey('raw', rawKey, mode, true, ['encrypt', 'decrypt'])
}

//加密
export async function encrypt(str, mode = 'AES-GCM') {
  // 解密时也需要使用 iv
  let res = await subtle.encrypt({ name: mode, iv: iv }, await importKey(rawKey), ec.encode(str))
  // return globalThis.btoa(new TextDecoder().decode(new Uint8Array(res).buffer))
  return globalThis.btoa(String.fromCharCode.apply(null, new Uint8Array(res)))
}

//解密
export async function decrypt(str, mode = 'AES-GCM') {
  let res = await subtle.decrypt({ name: mode, iv: iv }, await importKey(rawKey), str2ab(globalThis.atob(str)))
  return String.fromCharCode.apply(null, new Uint8Array(res))
  // return new TextDecoder().decode(res)
}

function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

/**
 * 递归解密对象数据
 * @param {*} data
 * @param {*} decryptFun
 * @returns
 */
export function decryptObj(data, decryptFun) {
  let res = {}
  Object.keys(data).forEach((key) => {
    const value = data[key]
    if (typeof value === 'string') {
      res[key] = decryptFun(value)
    } else if (Object.prototype.toString.apply(value) === '[object Object]') {
      res[key] = decryptObj(value, decryptFun)
    }
  })
  return res
}
