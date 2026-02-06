<h1 align="center">Nestjs Admin</h1>
<p align="center"><b>基于 Nestjs + Vue 前后端分离的 Nodejs 中后台权限管理系统全栈快速开发框架</b></p>
<p align="center"><b>本仓库为 Nestjs Admin 后端库，对应前端仓库为 <a href="https://gitee.com/nestts/nestjs-admin-vue" target="_blank">nestjs-admin-vue</a>，查看<a href="https://nestts.com/doc/" target="_blank">文档</a> </b></p>
<p align="center"><b>你的 ⭐️ Star ⭐️ 就是最美的支持</b></p>
<p align="center">
<a href="https://gitee.com/nestts/nestjs-admin" target="_blank"><img src="https://img.shields.io/badge/node-^v20-blue" alt="node version" /></a>
<a href="https://gitee.com/nestts/nestjs-admin" target="_blank"><img src="https://img.shields.io/github/license/xinla/nest-admin" alt="Package License" /></a>
<a href="https://gitee.com/nestts/nestjs-admin" target="_blank"><img src="https://img.shields.io/badge/gitee-support star-yellow" alt="gitee" /></a>
<!-- <a href="https://github.com/xinla/nest-admin" target="_blank"><img src="https://img.shields.io/badge/github-support star-yellow" alt="github" /></a> -->
</p>

## 平台简介

- [Nestjs Admin](https://nestts.com/) 是一套基于 Nestjs + Vue 前后端分离的 Nodejs 中后台权限管理系统全栈快速开发框架。
- 前端采用 Vue3 + Vite + Element Plus 生态，后端采用 Nestjs + TypeOrm + MySql + Redis 生态。
- 核心模块包括用户、角色、菜单、部门等，权限认证使用Jwt，支持加载动态权限菜单等功能。
- 可以帮您快速搭建Nodejs企业级中后台 RBAC 管理平台。
- github地址：https://github.com/xinla/nest-admin
- 国内gitee地址：https://gitee.com/nestts/nestjs-admin

另外，Nestjs Admin 使用 [cmd-deploy](https://www.npmjs.com/package/cmd-deploy) npm插件进行前后端的自动化部署，也欢迎大家Star。谢谢~

## 内置功能

1. 用户管理：配置系统操作用户，角色等。
2. 部门管理：配置系统组织机构（公司、部门），树结构展现支持数据权限。
3. 菜单管理：配置系统菜单，操作权限等
4. 角色管理：配置系统角色，角色可分配权限。
5. 通知管理：发布系统通知，公告等。
6. 配置管理：配置系统相关信息。
7. 在线用户：查看在线用户信息。
8. 登录日志：配置系统角色，角色可分配权限。
9. 服务监控：监控服务信息状态。
10. 文章管理：发布管理文章。

## 未来计划

- [x] 接入腾讯混元AI
- [x] 开放前端库
- [ ] 构建文档站点
- [ ] 海报生成器
- [ ] 丰富前端主题
- [ ] 表单生成器
- [ ] 数据大屏
- [ ] 数字孪生 3D  
       ...

如果觉得 [Nestjs Admin](https://gitee.com/nestts/nestjs-admin) 有帮助到您，点下免费的 ⭐️ Star ⭐️ 给于最美的支持

## 功能演示

演示地址：https://nestts.com

账密： NestAdmin/123456

<img src="./doc/image.png" width="%" height="30%" />
<img src="./doc/image.3.png" width="%" height="30%" />
<img src="./doc/image.1.png" width="%" height="30%" />
<img src="./doc/image.2.png" width="%" height="30%" />
<img src="./doc/image.4.png" width="%" height="30%" />
<img src="./doc/image.5.png" width="%" height="30%" />

# 安装与运行

**关于 Node，推荐 v20+ 及以上版本**

## 前端快速开始

### 目录结构

```
├── public                     # 静态资源
│   │── static                 # 用于绝对路径的非打包资源，公用基础css等
│   │── favicon.ico            # favicon图标
├── src                        # 源代码
│   ├── assets                 # 主题 字体 svg icons 等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── layout                 # 全局基础布局结构组件
│   ├── router                 # 路由 权限管理等
│   ├── stores                 # 全局 pinia store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # 业务功能所有页面
│   ├── App.vue                # 入口页面
│   ├── config.js              # 全局配置文件
│   ├── main.js                # 入口文件 加载组件 初始化等
├── babel.config.js            # babel-loader 配置
├── sys.config.js              # 环境变量配置
├── index.html                 # html模板
├── jsconfig.json              # jsconfig 配置 快捷路径等
├── package.json               # package.json
├── vite.config.js             # vite 配置
```

## 系统配置

```js
import { useDark } from '@vueuse/core'

// 环境变量
const envs = {
  development: {
    DOMAIN: 'http://localhost:3000', // 站点域名，会根据此处域名判断应用环境
    BASE_URL: '/', // 页面路由基础路径 /*/*/，eg：/a/，不支持 ’./‘形式的路径
    BASE_API: 'http://localhost:3000/api', // 接口基础路径
  },
  production: {
    DOMAIN: 'https://nestts.com',
    BASE_URL: '/',
    BASE_API: 'https://nestts.com/api',
  },
  test: {
    DOMAIN: 'https://47.98.205.145',
    BASE_URL: '/',
    BASE_API: 'https://47.98.205.145/api',
  },
}

const packMode = globalThis.MODE || import.meta.env.MODE
const runMode =
  process.env.NODE_ENV == 'development' || !globalThis.document
    ? packMode // 本地开发和vite中使用
    : Object.keys(envs).find((e) => envs[e].DOMAIN === window?.location.origin) || 'diy' // 打包后，根据访问域名动态判断环境

const BASE_URL = envs[packMode].BASE_URL
const env = envs[runMode] || {}

useDark().value
// 配置项
export let config = {
  ...env,
  SYSTEM_NAME: 'Nestjs Admin', // 系统简称
  SYSTEM_SLOGAN: '基于 Nestjs + Vue3 的前后端分离快速开发框架', // 系统标语
  SYSTEM_NAME_ALL: 'Nestjs Admin -- 基于 Nestjs + Vue3 的前后端分离快速开发框架', // 系统全称，浏览器标题
  COPYRIGHT: 'Copyright © 2024 Nestjs Admin All Rights Reserved.', // 版权信息
  // LOGO_DARK: BASE_URL + 'static/logo.svg', // 深色logo
  // LOGO_LIGHT: BASE_URL + 'static/logo.svg', // 淡色logo
  LOGO: `${BASE_URL}static/logo.svg`,
  BASE_URL,
  RUN_ENV: runMode,
}
```

### 启动运行

```sh
# 克隆项目
git clone https://gitee.com/nestts/nestjs-admin-vue.git

# 进入项目目录
cd nestjs-admin-vue

# 安装依赖
npm i --registry=https://registry.npmmirror.com

# 启动开发服务
npm run dev
# 前端访问地址
http://localhost:1024
# 启动测试服务 npm run test (后端接口为测试环境接口)

# 构建生产环境
npm run build
# 构建测试环境 npm run build:test
```

## 后端快速开始

### 目录结构

```
├── bin                        # 脚本
│   │── build.sh               # 部署构建脚本
├── config                     # 项目配置
│   │── index.ts               # 配置文件
│   │── secret.ts              # 密钥配置
├── deploy                     # cmd-deploy 自动化部署
│   │── deploy.config.mjs      # 自动化部署配置
├── doc                        # 项目文档
│   │── sql                    # sql 脚本
│── dist                       # 构建目录
├── src                        # 源代码
│   ├── common                 # 公共文件
│   ├── modules                # 系统模块
│   ├── modulesBusi            # 业务模块
│   ├── app.controller.spec.ts # 测试用例
│   ├── app.controller.ts      # 根路由
│   ├── app.module.ts          # 根模块
│   ├── app.service.ts         # 根服务
│   ├── main.ts                # 入口文件 加载组件 初始化等
├── test                       # 测试脚本
├── upload                     # 文件上传存储目录
├── LICENSE                    # LICENSE文件
├── .prettierrc                # prettier格式化配置
├── package.json               # package.json
├── README.md                  # README
├── RELEASE.md                 # 发布日志
├── tsconfig.json              # tsconfig 配置
```

## 安装

本地需要提前安装 nodejs v20+

```bash
# clone 项目
git clone https://gitee.com/nestts/nestjs-admin.git

# 进入项目根目录
cd nest-admin

# 安装依赖
# 方式一： npm 指定淘宝镜像
npm i --registry=https://registry.npmmirror.com

# 方式二： 使用 cnpm 安装
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm i

# 方式三： npm i 原始安装 国内推荐上述两种方式 DDDD(懂的都懂)
npm i
```

## 配置与准备

1. 系统使用mysql数据库，在 `config/index.ts`里的 `env.dev.database`中配置本地mysql数据库连接信息，在`env.prod.database`中配置生产数据库连接信息。  
   如果需要自定义其他环境配置，可以在 `config/index.ts` 文件中添加对应环境配置，例如：`env.test.database`，同时在`package.json`的`scripts`中配置对应的命令脚本环境变量模式，如`npm run start:test`。
2. 创建`nest_admin`数据库，执行 `doc/sql/nest_admin.sql` 文件，创建表到该数据库中
3. 执行 `doc/sql` 文件夹下的其他sql 文件，导入对应表、系统基础数据到数据库中
4. 安装Redis，并启动，具体可参考[官方文档](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)

## 运行

```bash
# 本地开发
$ npm run dev
# 或
$ npm run start:dev

# 线上运行
$ npm run start:prod
```

在应用程序运行后, 打开浏览器并访问 http://localhost:3000/。 你应该看到 Hello world! 信息。可以配合前端项目看到整体运行效果。

## 部署

1. 和本地运行类似，在服务器执行上面安装和配置步骤

2. 执行 `npm install -g pm2` 安装 [pm2](https://pm2.io/docs/plus/overview/)，目前使用 pm2 启动和管理node项目进程。有关pm2 的更多信息，请查看 [pm2 文档](https://pm2.io/docs/plus/overview/)。国内打不开的话，可以自行搜索相关中文网站。

3. 执行 `npm run build`

4. 执行 `pm2 start "npm run start:prod"` 即可启动。

## 一键自动化部署

- [`bin/build.sh`](bin/build.sh)是服务器构建运行脚本，后续更新部署可直接在服务器项目根目录下执行 `bash bin/build.sh` 即可。

- 更简单的是，当前使用自动化部署插件 [cmd-deploy](https://www.npmjs.com/package/cmd-deploy)，借助插件，直接在本地执行 `deploy prod` 即可完成线上部署。有关 `cmd-deploy` 的使用，可参考 [cmd-deploy 文档](https://www.npmjs.com/package/cmd-deploy)。

- 以下是 cmd-deploy 配置文件 deploy.config.mjs 的远程命令配置  
  `remoteCommand: ['cd /usr/local/nest/admin', './bin/build.sh'], // 线上环境打包脚本`

## 支持

点下免费的 ⭐️ Star ⭐️ 给于最美的支持

如果有什么问题或建议，欢迎提 issue，欢迎 PR。

## 协议

Nestjs Admin 使用 [MIT](LICENSE) 开源许可协议.
