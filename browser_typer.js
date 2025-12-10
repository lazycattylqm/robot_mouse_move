const puppeteer = require('puppeteer');
const path = require('path');

/**
 * 常用英文单词库
 */
const WORD_BANK = [
  'hello', 'world', 'code', 'function', 'variable', 'constant', 'array', 'object',
  'string', 'number', 'boolean', 'null', 'undefined', 'promise', 'async', 'await',
  'class', 'interface', 'type', 'import', 'export', 'default', 'const', 'let',
  'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
  'try', 'catch', 'finally', 'throw', 'error', 'debug', 'test', 'data', 'api',
  'server', 'client', 'request', 'response', 'method', 'params', 'result', 'success',
  'create', 'update', 'delete', 'read', 'write', 'open', 'close', 'start', 'stop',
  'run', 'execute', 'process', 'thread', 'queue', 'stack', 'heap', 'memory', 'cache',
  'database', 'query', 'insert', 'select', 'update', 'delete', 'join', 'where', 'order',
  'user', 'admin', 'login', 'logout', 'session', 'token', 'auth', 'permission', 'role',
  'config', 'settings', 'options', 'parameters', 'arguments', 'input', 'output', 'stream',
  'file', 'folder', 'path', 'directory', 'document', 'content', 'text', 'message', 'info'
];

/**
 * 从单词库中随机选择一个单词
 */
function getRandomWord () {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

/**
 * 生成随机延迟，模拟人类打字速度
 */
function getTypingDelay () {
  // 90% 的时间是正常打字速度
  if (Math.random() < 0.9) {
    return 50 + Math.random() * 200;
  }
  // 10% 的时间会停顿思考
  return 500 + Math.random() * 1000;
}

/**
 * 休眠函数
 */
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 在页面上打字
 */
async function typeInBrowser (page, options = {}) {
  const {
    lineBreakProbability = 0.3,
  } = options;

  console.log('\n🌐 开始在浏览器中打字...');
  console.log('按 Ctrl+C 停止\n');

  let totalWords = 0;
  let currentLineWords = [];

  try {
    // 聚焦编辑器
    await page.click('#editor');

    while (true) {
      // 获取随机单词
      const word = getRandomWord();

      // 逐字符输入，模拟真实打字
      for (let i = 0; i < word.length; i++) {
        const char = word[i];

        // 偶尔打错字（5% 概率）
        if (Math.random() < 0.05 && i > 0) {
          // 打错一个字符
          const wrongChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          await page.keyboard.type(wrongChar);
          await sleep(100 + Math.random() * 200);
          // 删除
          await page.keyboard.press('Backspace');
          await sleep(50 + Math.random() * 100);
        }

        await page.keyboard.type(char);
        await sleep(50 + Math.random() * 100);
      }

      totalWords++;
      currentLineWords.push(word);

      // 单词后的延迟
      await sleep(getTypingDelay());

      // 决定是否换行
      const shouldBreakLine = Math.random() < lineBreakProbability || currentLineWords.length >= 8;

      if (shouldBreakLine) {
        await page.keyboard.press('Enter');
        console.log(`第 ${Math.floor(totalWords / 8) + 1} 行完成，已输入 ${totalWords} 个单词`);
        await sleep(200 + Math.random() * 500);
        currentLineWords = [];
      } else {
        // 添加空格
        await page.keyboard.type(' ');
        await sleep(50 + Math.random() * 100);
      }

      // 偶尔有较长的思考停顿（10% 概率）
      if (Math.random() < 0.1) {
        const pauseDuration = 1000 + Math.random() * 2000;
        await sleep(pauseDuration);
      }
    }
  } catch (error) {
    if (error.message.includes('Target closed')) {
      console.log('\n浏览器已关闭');
    } else {
      console.error('\n❌ 打字过程中出错:', error.message);
    }
  }
}

/**
 * 主函数
 */
async function startBrowserTyping (options = {}) {
  const {
    headless = false,
    lineBreakProbability = 0.3,
    chromePath = null,
  } = options;

  console.log('\n⌨️  浏览器自动打字程序');
  console.log('═══════════════════════════════════════\n');

  let browser;

  try {
    // 启动浏览器
    console.log('🚀 正在启动浏览器...');

    // 自动检测系统 Chrome 路径
    let executablePath = chromePath;

    if (!executablePath) {
      const os = require('os');
      const platform = os.platform();

      if (platform === 'darwin') {
        // macOS
        executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      } else if (platform === 'win32') {
        // Windows
        executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
      } else {
        // Linux
        executablePath = '/usr/bin/google-chrome';
      }

      console.log(`检测到系统: ${platform}`);
      console.log(`使用 Chrome 路径: ${executablePath}`);
    }

    browser = await puppeteer.launch({
      headless,
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1200,800'
      ],
      defaultViewport: {
        width: 1200,
        height: 800
      }
    });

    const page = await browser.newPage();

    // 加载本地 HTML 文件
    const htmlPath = path.join(__dirname, 'editor.html');
    await page.goto(`file://${htmlPath}`);

    console.log('✅ 编辑器页面已加载');
    console.log('🎯 开始自动打字...\n');

    // 等待一下确保页面完全加载
    await sleep(1000);

    // 开始打字
    await typeInBrowser(page, { lineBreakProbability });

  } catch (error) {
    console.error('❌ 启动失败:', error.message);
    if (error.message.includes('Could not find Chrome')) {
      console.error('\n可能的解决方法:');
      console.error('1. 运行: pnpm install puppeteer');
      console.error('2. 或安装 Chrome/Chromium 浏览器');
    }
  } finally {
    // 不自动关闭浏览器，让用户手动关闭或按 Ctrl+C
  }
}

/**
 * 解析命令行参数
 */
function parseArgs () {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-l':
      case '--line-break':
        i++;
        options.lineBreakProbability = Number.parseFloat(args[i]);
        break;
      case '--chrome-path':
      case '-p':
        i++;
        options.chromePath = args[i];
        break;
      case '--headless':
        options.headless = true;
        break;
      case '--no-headless':
        options.headless = false;
        break;
      case '-h':
      case '--help':
        showHelp();
        process.exit(0);
        break;
    }
  }

  return options;
}

/**
 * 显示帮助信息
 */
function showHelp () {
  console.log(`
⌨️  浏览器自动打字程序 - 使用说明
═══════════════════════════════════════

用法:
  node browser_typer.js [选项]

说明:
  在浏览器中打开一个编辑器页面，持续自动输入文字
  无需系统权限！

选项:
  -l, --line-break <概率>      换行概率 0.0-1.0 (默认: 0.3)
  -p, --chrome-path <路径>     指定 Chrome 浏览器路径
  --headless                  使用无头模式（不显示浏览器窗口）
  --no-headless               显示浏览器窗口（默认）
  -h, --help                  显示帮助信息

示例:
  node browser_typer.js                    # 自动检测系统 Chrome
  node browser_typer.js -l 0.5             # 50% 概率换行
  node browser_typer.js --headless         # 后台运行
  
  # Windows 自定义路径
  node browser_typer.js -p "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  
  # macOS 自定义路径
  node browser_typer.js -p "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

默认 Chrome 路径:
  macOS:   /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
  Windows: C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe
  Linux:   /usr/bin/google-chrome

特点:
  ✅ 无需系统权限
  ✅ 美观的编辑器界面
  ✅ 实时统计（单词数、字符数、行数）
  ✅ 模拟真实打字（时快时慢、偶尔打错）

停止程序:
  - 按 Ctrl+C 停止
  - 或直接关闭浏览器窗口
  `);
}

// 优雅退出
process.on('SIGINT', async () => {
  console.log('\n\n👋 程序已停止');
  process.exit(0);
});

// 启动程序
if (require.main === module) {
  const options = parseArgs();
  startBrowserTyping(options).catch(error => {
    console.error('程序错误:', error);
    process.exit(1);
  });
}

module.exports = { startBrowserTyping };
