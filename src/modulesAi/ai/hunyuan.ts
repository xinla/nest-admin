import { config } from 'config'

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require('tencentcloud-sdk-nodejs-hunyuan')

const HunyuanClient = tencentcloud.hunyuan.v20230901.Client

// 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
// 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305
// 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
const clientConfig = {
  credential: {
    secretId: config.hunyuan.secretId,
    secretKey: config.hunyuan.secretKey,
  },
  region: '',
  profile: {
    httpProfile: {
      endpoint: 'hunyuan.tencentcloudapi.com',
    },
  },
}

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new HunyuanClient(clientConfig)
const params = {
  Model: 'hunyuan-pro',
  Messages: [
    {
      Role: 'user',
      // Content: 'abc',
    },
  ],
  Stream: true,
}

export const send = async (data = { content: '' }) => {
  params.Messages = [Object.assign({ Content: '你好' }, { Role: 'user' })]

  return client.ChatCompletions(params)
  // .then(
  //   async (res) => {
  //     if (typeof res.on === 'function') {
  //       console.log(11)
  //       return res
  //       // return res.eventSource
  //       // 流式响应
  //       return new Promise((resolve, reject) => {
  //         res.on('message', (message) => {
  //           resolve(message)
  //         })
  //       })
  //     } else {
  //       // 非流式响应
  //       console.log(res)
  //     }
  //   },
  //   (err) => {
  //     console.error('error', err)
  //   },
  // )
}
