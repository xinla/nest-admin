<h1 align="center">Nest Admin</h1>
<p align="center"><b>基于 Nestjs + Vue 前后端分离的 Nodejs 中后台权限管理系统快速开发框架，持续更新中... </b></p>
<p align="center"><b>你的 ⭐️ Star ⭐️，是小伙伴加油的动力！</b></p>
<p align="center">
<a href="https://gitee.com/hixinla/nest-admin" target="_blank"><img src="https://img.shields.io/badge/node-^20-blue" alt="NPM Version" /></a>
<a href="https://gitee.com/hixinla/nest-admin" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## 平台简介

- [Nest Admin](https://nestts.com/) 是一套基于 Nest + Vue 前后端分离的 Nodejs TypeScript 快速开发框架。
- 前端采用 Vue3 + Vite + Element Plus 生态，后端采用 Nest + TypeOrm + MySql 生态。
- 核心模块包括用户、角色、菜单、部门等，权限认证使用Jwt，支持加载动态权限菜单等功能。
- 可以帮您快速搭建企业级中后台 RBAC 管理平台。
- 本仓库为 Nest Admin 后端库，前端库暂未开放，敬请期待
- github地址：https://github.com/xinla/nest-admin
- 国内gitee地址：https://gitee.com/hixinla/nest-admin

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
11. 持续更新中...

## 功能演示

演示地址：https://nestts.com

账密：admin/123456

<img src="./doc/image.png" width="%" height="30%" />
<img src="./doc/image.3.png" width="%" height="30%" />
<img src="./doc/image.1.png" width="%" height="30%" />
<img src="./doc/image.2.png" width="%" height="30%" />
<img src="./doc/image.4.png" width="%" height="30%" />
<img src="./doc/image.5.png" width="%" height="30%" />

## 安装

本地需要提前安装 nodejs v20+

```bash
# clone 项目
git clone https://gitee.com/hixinla/nest-admin.git

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

## 配置

1. 在 `config/config.ts`里的 `databaseList.dev`中配置本地数据库连接信息
2. 执行 `doc/sql/nest_admin.sql` 文件，创建表到数据库中
3. 执行 `doc/sql` 文件夹下的其他sql 文件，导入对应表数据到数据库中

## 运行

```bash
# 本地开发
$ npm run dev
# 或
$ npm run start:dev

# 线上运行
$ npm run start:prod
```

在应用程序运行后, 打开浏览器并访问 http://localhost:3000/。 你应该看到 Hello world! 信息。

## 部署

1. 和本地运行类似，在服务器执行上面安装和配置步骤

2. 然后安装 [pm2](https://pm2.io/docs/plus/overview/)，目前使用 pm2 启动和管理node项目进程。有关pm2 的更多信息，请查看 [pm2 文档](https://pm2.io/docs/plus/overview/)。国内打不开的话，可以自行搜索相关中文网站。

3. 执行 `npm run build`

4. 执行 `pm2 start "npm run start:prod"` 即可启动。

## 一键自动化部署

- [`bin/build.sh`](bin/build.sh)是服务器构建运行脚本，后续更新部署可直接在服务器项目根目录下执行 `bash bin/build.sh` 即可。

- 更简单的是，当前使用自动化部署插件 [cmd-deploy](https://www.npmjs.com/package/cmd-deploy)，借助插件，直接在本地执行 `deploy prod` 即可。有关 `cmd-deploy` 的使用，可参考 [cmd-deploy 文档](https://www.npmjs.com/package/cmd-deploy)。

- 以下是 cmd-deploy 配置文件 deploy.config.mjs 的远程命令配置  
  `remoteCommand: ['cd /usr/local/nest/admin', './bin/build.sh'], // 线上环境打包脚本`

## 支持

欢迎学习交流，不喜勿喷

## 协议

Nest Admin 使用 [MIT](LICENSE) 开源许可协议.
