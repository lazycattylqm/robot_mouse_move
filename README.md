# 浏览器自动打字程序

使用 Puppeteer 实现的浏览器自动打字工具。**完全不需要系统权限！**

## ✨ 功能特点

- ✅ **无需系统权限** - 在浏览器内操作，无需辅助功能权限
- 🎨 **美观界面** - 现代化深色主题编辑器
- 📊 **实时统计** - 显示单词数、字符数、行数
- ⌨️ **真实打字效果** - 时快时慢，偶尔打错字
- 🌍 **跨平台兼容** - Windows、macOS、Linux 都能用
- 🔄 **持续运行** - 一直输入直到手动停止
- 🎯 **智能检测** - 自动识别系统并使用对应的 Chrome 路径

## 📦 安装依赖

```bash
pnpm install
```

## 🚀 快速开始

```bash
# 启动程序（显示浏览器窗口）
pnpm start

# 或
node browser_typer.js
```

程序会自动检测你的操作系统，并使用对应的 Chrome 浏览器。

## 🎮 使用方法

### 基础使用

```bash
# 自动检测系统 Chrome（推荐）
pnpm start

# 开发模式（显示浏览器窗口）
pnpm dev
```

### 自定义选项

```bash
# 50% 概率换行
node browser_typer.js -l 0.5

# Windows 自定义 Chrome 路径
node browser_typer.js -p "C:\Program Files\Google\Chrome\Application\chrome.exe"

# macOS 自定义 Chrome 路径
node browser_typer.js -p "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 后台运行（无头模式）
node browser_typer.js --headless

# 查看所有选项
node browser_typer.js --help
```

## 🔧 默认 Chrome 路径

程序会自动检测操作系统并使用对应的 Chrome 路径：

- **macOS**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Windows**: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- **Linux**: `/usr/bin/google-chrome`

如果 Chrome 安装在其他位置，使用 `-p` 参数指定路径。

## ⚙️ 工作原理

1. **随机单词生成**：从 100+ 编程相关单词库中随机选择
2. **模拟真实打字**：
   - 字符间延迟 50-150ms
   - 单词间停顿 50-300ms
   - 偶尔思考停顿 500-1500ms
3. **打字错误模拟**：5% 概率打错字后删除重打
4. **自动换行**：30% 概率换行，或每行达到 8 个单词时换行
5. **持续运行**：无限循环直到手动停止

## 🛑 停止程序

- 按 `Ctrl+C` 停止
- 或直接关闭浏览器窗口

## 📸 界面预览

程序会打开一个美观的深色主题编辑器，包含：

- 实时单词计数
- 实时字符计数
- 实时行数统计
- 类似 VS Code 的编辑器外观

## 📝 文件说明

- `browser_typer.js` - 主程序文件
- `editor.html` - 编辑器页面
- `package.json` - 项目配置

## 💡 技术栈

- **Node.js** - 运行环境
- **Puppeteer** - 浏览器自动化框架
- **HTML/CSS/JavaScript** - 编辑器界面

## 📄 许可证

ISC
