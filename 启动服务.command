#!/bin/bash
# ===== 五行算命工具 · 一键启动 =====
# 双击此文件即可启动本地服务并打开浏览器

PORT=4173
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🔮 五行算命工具 · 启动中..."
echo ""

# 如果端口已被占用，先释放
if lsof -i :$PORT > /dev/null 2>&1; then
  echo "⚠️  端口 $PORT 已被占用，正在释放..."
  kill $(lsof -t -i :$PORT) 2>/dev/null
  sleep 1
fi

echo "📂 项目目录：$DIR"
echo "🌐 访问地址：http://127.0.0.1:$PORT"
echo ""
echo "💡 关闭此终端窗口即可停止服务"
echo "————————————————————————————"

# 延迟 1 秒后打开浏览器
(sleep 1 && open "http://127.0.0.1:$PORT") &

# 启动服务（前台运行，关窗口自动停）
cd "$DIR"
python3 -m http.server $PORT
