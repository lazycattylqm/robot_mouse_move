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

## 技术栈

- Node.js
- RobotJS
