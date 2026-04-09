#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// 默认值
let projectPath = ''
let buildMode = 'prod'
let skipInstall = false
let skipRestart = false
let showHelp = false

// 解析参数
const args = process.argv.slice(2)
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  switch (arg) {
    case '-p':
    case '--path':
      projectPath = args[i + 1]
      i++
      break
    case '-m':
    case '--mode':
      buildMode = args[i + 1]
      i++
      break
    case '--skip-install':
      skipInstall = true
      break
    case '--skip-restart':
      skipRestart = true
      break
    case '-h':
    case '--help':
      showHelp = true
      break
    default:
      // 兼容旧版本:第一个位置参数作为项目路径
      if (!projectPath) {
        projectPath = arg
      }
      break
  }
}

// 显示帮助信息
if (showHelp) {
  console.log('用法: node bin/build.js [选项]')
  console.log('')
  console.log('选项:')
  console.log('  -p, --path <路径>       指定项目路径(可选)')
  console.log('  -m, --mode <模式>       构建模式: prod 或 dev (默认: prod)')
  console.log('  --skip-install          跳过依赖安装')
  console.log('  --skip-restart          跳过服务重启')
  console.log('  -h, --help              显示此帮助信息')
  console.log('')
  console.log('示例:')
  console.log('  node bin/build.js                                    # 默认构建')
  console.log('  node bin/build.js -p ../other-project                # 指定项目')
  console.log('  node bin/build.js -p /path -m dev                    # 指定项目和模式')
  console.log('  node bin/build.js --skip-install                     # 跳过依赖安装')
  process.exit(0)
}

console.log('==========================================')
console.log('开始打包生产环境')
console.log('==========================================')
console.log(`项目路径: ${projectPath || '当前目录'}`)
console.log(`构建模式: ${buildMode}`)
console.log(`跳过安装: ${skipInstall}`)
console.log(`跳过重启: ${skipRestart}`)
console.log('==========================================')

// 检查 git 和 node 是否安装
try {
  execSync('git --version', { stdio: 'ignore' })
} catch (error) {
  console.error('❌ 请安装 Git')
  process.exit(1)
}

try {
  execSync('node --version', { stdio: 'ignore' })
} catch (error) {
  console.error('❌ 请安装 Node.js')
  process.exit(1)
}

// 切换到脚本所在目录的上级目录
let currentDir = path.dirname(import.meta.url.replace('file://', ''))
currentDir = path.resolve(currentDir, '..')

// 如果指定了项目路径,切换到该目录
if (projectPath) {
  const fullProjectPath = path.resolve(currentDir, projectPath)
  if (fs.existsSync(fullProjectPath) && fs.statSync(fullProjectPath).isDirectory()) {
    console.log(`📁 切换到项目目录: ${fullProjectPath}`)
    currentDir = fullProjectPath
  } else {
    console.error(`❌ 项目目录不存在: ${fullProjectPath}`)
    process.exit(1)
  }
}

process.chdir(currentDir)

console.log('🔄 拉取最新代码...')
execSync('git reset --hard HEAD', { stdio: 'inherit' })
execSync('git pull', { stdio: 'inherit' })
console.log('✅ 代码拉取完毕')

// 安装依赖
if (!skipInstall) {
  const nodeModulesPath = path.join(currentDir, 'node_modules')
  if (fs.existsSync(nodeModulesPath)) {
    console.log('删除旧的 node_modules 目录...')
    fs.rmSync(nodeModulesPath, { recursive: true, force: true })
    console.log('✅ 旧的 node_modules 已删除')
  }

  try {
    execSync('cnpm --version', { stdio: 'ignore' })
  } catch (error) {
    console.log('📦 安装cnpm...')
    execSync('npm install -g cnpm --registry=https://registry.npmmirror.com', { stdio: 'inherit' })
    console.log('✅ cnpm已安装')
  }

  console.log('📦 安装依赖...')
  execSync('cnpm i', { stdio: 'inherit' })
  console.log('✅ 依赖已安装')
} else {
  console.log('⏭️  用户指定跳过依赖安装')
}

// 执行构建
console.log('🔨 开始构建...')
execSync('npm run build', { stdio: 'inherit' })
console.log('✅ 打包完成')

// 重启服务
if (!skipRestart) {
  try {
    execSync('pm2 --version', { stdio: 'ignore' })
    console.log('')
    console.log('📋 当前 PM2 进程列表:')
    execSync('pm2 ls', { stdio: 'inherit' })

    console.log('')
    console.log('🛑 停止服务...')
    try {
      execSync('pm2 stop "npm run start:prod"', { stdio: 'inherit' })
    } catch (error) {
      console.log('⚠️  服务未运行')
    }
    console.log('✅ 服务已停止')

    console.log('')
    console.log('🚀 启动服务...')
    execSync('pm2 start "npm run start:prod"', { stdio: 'inherit' })
    console.log('✅ 服务已启动')

    console.log('')
    console.log('📋 最新 PM2 进程列表:')
    execSync('pm2 ls', { stdio: 'inherit' })
  } catch (error) {
    console.log('⚠️  PM2 未安装,跳过服务重启')
    console.log('提示: 安装 PM2: npm install -g pm2')
  }
} else {
  console.log('⏭️  用户指定跳过服务重启')
}

console.log('')
console.log('==========================================')
console.log('✅ 构建流程全部完成!')
console.log('==========================================')
