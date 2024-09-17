#!/bin/bash
# chmod +x build.sh
set -e

echo 打包生产环境

if ! command -v git &> /dev/null; then
    echo 请安装 Git
    exit
fi

if ! command -v node &> /dev/null; then
    echo 请安装 Node.js
    exit
fi

cd $(dirname $0)  # 进入当前文件所在目录
cd ../

echo 拉取项目...
git pull
echo 拉取完毕

if [$1]; then
    cd $1 # 进入传参 项目
fi

if [ ! -d "$(pwd)/node_modules" ]; then
    # if ! command -v cnpm &> /dev/null; then
    #     echo 安装cnpm...
    #     npm install -g cnpm --registry=https://registry.npmmirror.com
    #     echo cnpm已安装
    # fi
    echo 安装依赖...
    npm i
    echo 依赖已安装
fi

npm run build
echo 打包完成

echo pm2 ls
pm2 ls

echo pm2 stop "npm run start:prod"
pm2 stop "npm run start:prod"
echo 服务已停止

echo pm2 start "npm run start:prod"
pm2 start "npm run start:prod"
echo 服务已启动