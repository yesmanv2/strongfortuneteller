#!/bin/bash
# 一键构建混淆 + 部署到 GitHub Pages
# 用法: bash deploy.sh

set -e
cd "$(dirname "$0")"

echo "🔨 开始混淆构建..."

# 清理
rm -rf dist
mkdir -p dist

# 混淆 JS（变量名替换 + 压缩 + 去注释）
# 注意：不能用 -m toplevel，因为两个 JS 文件共享全局变量
# 先合并两个 JS 文件，再一起混淆，保证变量名一致
cat bazi-core.js script.js > dist/_combined.js
npx uglifyjs dist/_combined.js -o dist/_combined.min.js \
  -c drop_console=false,passes=2 \
  -m reserved=['$','jQuery']

# HTML 中 bazi-core.js 先加载，所以合并后的代码放到 bazi-core.js
cp dist/_combined.min.js dist/bazi-core.js
echo "/* merged into bazi-core.js */" > dist/script.js
rm -f dist/_combined.js dist/_combined.min.js
echo "  ✅ JS 已合并混淆（bazi-core.js + script.js → script.js）"

# 压缩 CSS
npx cleancss -o dist/styles.css styles.css
echo "  ✅ styles.css 已压缩"

# 压缩 HTML
npx html-minifier-terser index.html \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  -o dist/index.html
echo "  ✅ index.html 已压缩"

# 复制其他需要的文件
cp -f pay-success.html dist/ 2>/dev/null || true

# 显示文件大小对比
echo ""
echo "📊 文件大小对比:"
echo "  源码                    混淆后"
for f in script.js bazi-core.js styles.css index.html; do
  if [ -f "$f" ] && [ -f "dist/$f" ]; then
    src_size=$(wc -c < "$f" | tr -d ' ')
    dst_size=$(wc -c < "dist/$f" | tr -d ' ')
    pct=$((dst_size * 100 / src_size))
    printf "  %-22s %6s → %6s (%d%%)\n" "$f" "${src_size}B" "${dst_size}B" "$pct"
  fi
done

# 部署到 gh-pages 分支
echo ""
echo "🚀 部署到 gh-pages 分支..."
cd dist
git init
git checkout -b gh-pages
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M') 混淆构建"
git push -f "https://github.com/zimyin/strongfortuneteller.git" gh-pages
cd ..

# 清理
rm -rf dist

echo ""
echo "✅ 部署完成！"
echo "🌐 网址: https://zimyin.github.io/strongfortuneteller/"
echo "   (首次部署需等待 1-2 分钟生效)"
