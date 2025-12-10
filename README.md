# 鼠标随机移动程序

使用 RobotJS 实现的模拟人类鼠标移动习惯的自动化程序。

## 功能特点

- 🎯 **智能路径规划**：使用贝塞尔曲线生成自然的鼠标移动轨迹
- ⚡ **时快时慢**：模拟人类移动速度的不均匀性
- 🎲 **随机停留**：在不同位置停留不同时间
- 🤔 **偶尔犹豫**：随机添加短暂停顿，更真实
- 🔄 **持续运行**：程序会一直运行直到手动停止

## 安装依赖

```bash
pnpm install
```

## 运行程序

```bash
pnpm start
```

或者直接运行：

```bash
node index.js
```

## 停止程序

按 `Ctrl+C` 停止程序运行。

## 工作原理

1. **贝塞尔曲线路径**：使用三次贝塞尔曲线生成从当前位置到目标位置的平滑路径
2. **随机控制点**：每次移动的控制点都是随机生成的，使每次移动轨迹都不同
3. **变速移动**：每个路径点之间的延迟时间是随机的（5-15ms 基础延迟 + 偶尔的额外延迟）
4. **自然停顿**：到达目标后会随机停留 1-4 秒
5. **偶尔犹豫**：移动过程中有 5% 的概率会短暂停顿

## 注意事项

### 通用注意事项

- ⚠️ 程序需要系统权限来控制鼠标
- ⚠️ 程序运行时会持续移动鼠标，请确保不会影响其他工作

### macOS 特别注意

- 需要在"系统偏好设置 > 安全性与隐私 > 辅助功能"中授予终端或 Node.js 权限
- 首次运行时系统会弹出权限请求对话框

### Windows 特别注意

1. **编译环境要求**

   - 需要安装 Visual Studio Build Tools 或完整版 Visual Studio
   - 需要 Python 2.7 或 3.x
   - 安装命令（管理员权限）：`npm install --global windows-build-tools`

2. **权限和安全**

   - 建议以管理员权限运行终端
   - 某些防病毒软件可能会拦截，需要添加到白名单
   - 一般不需要额外授予系统权限

3. **高 DPI 缩放问题**

   - 如果启用了显示缩放（125%、150% 等），坐标可能不准确
   - 解决方法：在程序属性中设置"禁用高 DPI 缩放"或调整系统缩放为 100%

4. **多显示器支持**

   - 坐标系统以主显示器为准
   - 使用多显示器时可能需要手动调整坐标范围

5. **性能**
   - Windows 上性能可能略低于 macOS
   - 如移动不流畅，可在代码中适当增加延迟时间

## 自定义参数

你可以在 `index.js` 中修改以下参数：

- `margin`: 屏幕边缘边距（默认 100 像素）
- `points`: 贝塞尔曲线路径点数量（默认 50）
- `baseDelay`: 基础延迟时间范围（默认 5-15ms）
- `waitTime`: 到达目标后的停留时间（默认 1-4 秒）

## Windows 安装故障排除

如果在 Windows 上安装 RobotJS 遇到问题：

### 方法 1：安装完整的 Visual Studio

1. 下载 [Visual Studio Community](https://visualstudio.microsoft.com/downloads/)
2. 安装时勾选"使用 C++ 的桌面开发"工作负载
3. 重新运行 `pnpm install`

### 方法 2：使用 windows-build-tools

```bash
# 以管理员权限运行 PowerShell
npm install --global windows-build-tools

# 然后重新安装依赖
pnpm install
```

### 方法 3：手动指定 Python 路径

```bash
# 如果系统已安装 Python
npm config set python "C:\Python27\python.exe"
pnpm install
```

### 常见错误解决

**错误：MSBuild.exe failed**

- 确保已安装 Visual Studio Build Tools
- 检查 Windows SDK 是否已安装

**错误：node-gyp 编译失败**

- 确保 Python 版本正确（2.7 或 3.x）
- 以管理员权限运行终端

**错误：权限被拒绝**

- 关闭防病毒软件后重试
- 以管理员权限运行

## 键盘自动输入功能

### 方式一：RobotJS 键盘输入（需要权限）

模拟键盘在当前焦点窗口中持续输入文字。

#### 运行

```bash
pnpm type
# 或
node keyboard_typer.js
```

#### 自定义选项

```bash
node keyboard_typer.js -c 5          # 倒计时 5 秒
node keyboard_typer.js -l 0.5        # 50% 概率换行
node keyboard_typer.js --help        # 查看帮助
```

#### 特点

- ✅ 持续输入，直到按 Ctrl+C 停止
- ✅ 模拟真实打字速度（时快时慢）
- ✅ 偶尔打错字后删除重打（5% 概率）
- ✅ 随机停顿思考（10% 概率）
- ✅ 自动换行（可调概率）
- ⚠️ 需要系统辅助功能权限

### 方式二：Puppeteer 浏览器输入（无需权限）⭐ 推荐

在浏览器中打开编辑器页面，自动输入文字。**完全不需要系统权限！**

#### 安装依赖

```bash
pnpm add puppeteer
```

#### 运行

```bash
pnpm type:browser
# 或
node browser_typer.js
```

#### 自定义选项

```bash
# 自动检测系统 Chrome（推荐）
node browser_typer.js

# 50% 概率换行
node browser_typer.js -l 0.5

# Windows 自定义 Chrome 路径
node browser_typer.js -p "C:\Program Files\Google\Chrome\Application\chrome.exe"

# macOS 自定义 Chrome 路径
node browser_typer.js -p "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 后台运行（无头模式）
node browser_typer.js --headless

# 查看帮助
node browser_typer.js --help
```

#### 默认 Chrome 路径

程序会自动检测操作系统并使用对应的 Chrome 路径：

- **macOS**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Windows**: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- **Linux**: `/usr/bin/google-chrome`

如果 Chrome 安装在其他位置，使用 `-p` 参数指定路径。

#### 特点

- ✅ **无需系统权限** - 在浏览器内操作
- ✅ **美观界面** - 现代化深色主题编辑器
- ✅ **实时统计** - 显示单词数、字符数、行数
- ✅ **真实打字效果** - 时快时慢，偶尔打错
- ✅ **跨平台兼容** - Windows、macOS、Linux 都能用
- ✅ **自动检测系统** - 智能选择 Chrome 路径
- ✅ **持续输入** - 直到关闭浏览器或按 Ctrl+C

#### 对比

| 特性       | Puppeteer 方案 | RobotJS 方案  |
| ---------- | -------------- | ------------- |
| 系统权限   | ❌ 不需要      | ✅ 需要       |
| 可视化界面 | ✅ 美观网页    | ❌ 需切换窗口 |
| 跨平台兼容 | ✅ 完美支持    | ⚠️ 编译复杂   |
| 实时统计   | ✅ 有          | ❌ 无         |
| 控制范围   | 🌐 浏览器内    | 💻 全局控制   |

## 技术栈

- Node.js
- RobotJS（鼠标控制和键盘输入）
- Puppeteer（浏览器自动化）
