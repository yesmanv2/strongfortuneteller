#!/bin/bash
# ===== 五行算命工具 · 支付版一键启动 =====
# 双击此文件即可同时启动前端 + 支付后端

PORT_FRONTEND=4173
PORT_BACKEND=3000
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🔮 五行算命工具 · 支付版启动中..."
echo ""

# 释放已占用端口
for PORT in $PORT_FRONTEND $PORT_BACKEND; do
  if lsof -i :$PORT > /dev/null 2>&1; then
    echo "⚠️  端口 $PORT 已被占用，正在释放..."
    kill $(lsof -t -i :$PORT) 2>/dev/null
    sleep 1
  fi
done

# 检查后端依赖
if [ ! -d "$DIR/server/node_modules" ]; then
  echo "📦 首次运行，安装支付后端依赖..."
  cd "$DIR/server"
  npm install
  cd "$DIR"
  echo ""
fi

echo "📂 项目目录：$DIR"
echo "🌐 前端地址：http://127.0.0.1:$PORT_FRONTEND"
echo "💰 支付后端：http://127.0.0.1:$PORT_BACKEND"
echo ""
echo "💡 关闭此终端窗口即可停止所有服务"
echo "————————————————————————————"

# 启动支付后端（后台）
cd "$DIR/server"
node app.js &
BACKEND_PID=$!
cd "$DIR"

# 延迟 1 秒后打开浏览器
(sleep 2 && open "http://127.0.0.1:$PORT_FRONTEND") &

# 启动前端（前台运行，关窗口自动停）
python3 -m http.server $PORT_FRONTEND

# 如果前端停了，也停掉后端
kill $BACKEND_PID 2>/dev/null
