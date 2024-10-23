// 1. sudo npm i cmd-deploy -g  全局安装依赖
// 2. deploy init  生成配置文件模板
// 3. deploy dev  dev打包部署
export default {
  privateKey: '', // 本地私钥地址，位置一般在C:/Users/xxx/.ssh/id_rsa，非必填，有私钥则配置
  passphrase: '', // 本地私钥密码，非必填，有私钥则配置
  projectName: 'cmd-deploy', // 项目名称
  // 根据需要进行配置，如只需部署prod线上环境，可删除dev测试环境配置，反之亦然，支持多环境部署，再有多余的环境按照下面格式写即可
  // 以下为示例配置，请在实际使用时根据实际情况进行配置
  dev: {
    // 测试环境相关配置/完整配置示例
    name: '测试环境',
    host: '139.224.22.228', // 服务器地址
    port: 22, // ssh 端口，一般默认22
    username: 'root', // 登录服务器用户名
    password: '123456', // 登录服务器密码
    script: 'npm run build:dev', // 本地打包脚本
    distPath: 'dist', // 本地打包dist目录
    webDir: '/usr/local/nginx/html/prod/pc', // 服务器文件部署地址示例： /usr/local/nginx/html/prod/pc
    remoteCommand: ['cd /usr/local/nest/admin', './bin/build.sh'], // 远程服务器执行的命令
  },
  prod: {
    // 线上环境相关配置/按需配置示例
    name: '线上环境',
    host: '139.224.22.228', // 服务器地址
    port: 22, // ssh 端口，一般默认22
    username: 'root', // 登录服务器用户名
    password: '123456', // 登录服务器密码
    script: '', // 本地打包脚本
    distPath: '', // 本地打包dist目录
    webDir: '', // 服务器文件部署地址示例： /usr/local/nginx/html/prod/pc
    remoteCommand: ['cd /usr/local/nest/admin', './bin/build.sh'], // 线上环境打包脚本
  },
}
