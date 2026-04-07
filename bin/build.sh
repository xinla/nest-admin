#!/bin/bash
# chmod +x build.sh
# 使用示例:
# ./bin/build.sh                                    # 默认构建当前项目
# ./bin/build.sh -p ../other-project                # 指定项目路径
# ./bin/build.sh -p /path/to/project -m dev         # 指定项目和构建模式
# ./bin/build.sh --path=/path --mode=prod --skip-install  # 跳过依赖安装
# ./bin/build.sh -h                                 # 显示帮助信息

set -e

# 默认值
PROJECT_PATH=""
BUILD_MODE="prod"
SKIP_INSTALL=false
SKIP_RESTART=false
SHOW_HELP=false

# 解析参数
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--path)
            PROJECT_PATH="$2"
            shift 2
            ;;
        -m|--mode)
            BUILD_MODE="$2"
            shift 2
            ;;
        --skip-install)
            SKIP_INSTALL=true
            shift
            ;;
        --skip-restart)
            SKIP_RESTART=true
            shift
            ;;
        -h|--help)
            SHOW_HELP=true
            shift
            ;;
        *)
            # 兼容旧版本:第一个位置参数作为项目路径
            if [ -z "$PROJECT_PATH" ]; then
                PROJECT_PATH="$1"
            fi
            shift
            ;;
    esac
done

# 显示帮助信息
if [ "$SHOW_HELP" = true ]; then
    echo "用法: ./bin/build.sh [选项]"
    echo ""
    echo "选项:"
    echo "  -p, --path <路径>       指定项目路径(可选)"
    echo "  -m, --mode <模式>       构建模式: prod 或 dev (默认: prod)"
    echo "  --skip-install          跳过依赖安装"
    echo "  --skip-restart          跳过服务重启"
    echo "  -h, --help              显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  ./bin/build.sh                                    # 默认构建"
    echo "  ./bin/build.sh -p ../other-project                # 指定项目"
    echo "  ./bin/build.sh -p /path -m dev                    # 指定项目和模式"
    echo "  ./bin/build.sh --skip-install                     # 跳过依赖安装"
    exit 0
fi

echo "=========================================="
echo "开始打包生产环境"
echo "=========================================="
echo "项目路径: ${PROJECT_PATH:-当前目录}"
echo "构建模式: $BUILD_MODE"
echo "跳过安装: $SKIP_INSTALL"
echo "跳过重启: $SKIP_RESTART"
echo "=========================================="

if ! command -v git &> /dev/null; then
    echo "❌ 请安装 Git"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ 请安装 Node.js"
    exit 1
fi

cd $(dirname $0)  # 进入当前文件所在目录
cd ../

# 如果指定了项目路径,切换到该目录
if [ -n "$PROJECT_PATH" ]; then
    if [ -d "$PROJECT_PATH" ]; then
        echo "📁 切换到项目目录: $PROJECT_PATH"
        cd "$PROJECT_PATH"
    else
        echo "❌ 项目目录不存在: $PROJECT_PATH"
        exit 1
    fi
fi

echo "🔄 拉取最新代码..."
git reset --hard HEAD
git pull
echo "✅ 代码拉取完毕"

# 安装依赖
if [ "$SKIP_INSTALL" = false ]; then
    if [ -d "$(pwd)/node_modules" ]; then
        echo "删除旧的 node_modules 目录..."
        rm -rf node_modules
        echo "✅ 旧的 node_modules 已删除"
    fi
        if ! command -v cnpm &> /dev/null; then
            echo "📦 安装cnpm..."
            npm install -g cnpm --registry=https://registry.npmmirror.com
            echo "✅ cnpm已安装"
        fi
        echo "📦 安装依赖..."
        cnpm i
        echo "✅ 依赖已安装"
else
    echo "⏭️  用户指定跳过依赖安装"
fi

# 执行构建
echo "🔨 开始构建..."
npm run build
echo "✅ 打包完成"

# 重启服务
if [ "$SKIP_RESTART" = false ]; then
    if command -v pm2 &> /dev/null; then
        echo ""
        echo "📋 当前 PM2 进程列表:"
        pm2 ls

        echo ""
        echo "🛑 停止服务..."
        pm2 stop "npm run start:prod" || echo "⚠️  服务未运行"
        echo "✅ 服务已停止"

        echo ""
        echo "🚀 启动服务..."
        pm2 start "npm run start:prod"
        echo "✅ 服务已启动"

        echo ""
        echo "📋 最新 PM2 进程列表:"
        pm2 ls
    else
        echo "⚠️  PM2 未安装,跳过服务重启"
        echo "提示: 安装 PM2: npm install -g pm2"
    fi
else
    echo "⏭️  用户指定跳过服务重启"
fi

echo ""
echo "=========================================="
echo "✅ 构建流程全部完成!"
echo "=========================================="