const robot = require('robotjs');

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
 * 快速打字者：50-150ms
 * 正常打字者：100-300ms
 * 偶尔思考停顿：500-1500ms
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
 * 模拟人类打字一个字符
 */
async function typeCharacter (char) {
  try {
    robot.keyTap(char);
  } catch (error) {
    // 如果是特殊字符，尝试直接输入
    robot.typeString(char);
  }
}

/**
 * 模拟人类打字一个单词
 */
async function typeWord (word) {
  console.log(`正在输入: ${word}`);

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    await typeCharacter(char);

    // 字符之间的延迟
    const delay = 50 + Math.random() * 100; // 50-150ms
    await sleep(delay);

    // 偶尔打字错误后删除（5% 概率）
    if (Math.random() < 0.05 && i > 0) {
      await sleep(100 + Math.random() * 200);
      robot.keyTap('backspace');
      await sleep(50 + Math.random() * 100);
      robot.keyTap(char);
    }
  }
}

/**
 * 模拟按下回车键
 */
async function pressEnter () {
  console.log('换行');
  robot.keyTap('enter');
}

/**
 * 模拟按下空格键
 */
async function pressSpace () {
  robot.keyTap('space');
}

/**
 * 休眠函数
 */
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 主函数：模拟打字
 */
async function startTyping (options = {}) {
  const {
    continuous = false, // 是否持续输入
    lineBreakProbability = 0.3, // 30% 概率换行
    countdown = 3 // 倒计时秒数
  } = options;

  console.log('\n⌨️  键盘自动输入程序');
  console.log('═══════════════════════════════════════\n');

  if (continuous) {
    console.log('模式: 持续输入（按 Ctrl+C 停止）');
  }

  // 倒计时，让用户有时间切换到编辑器
  console.log(`将在 ${countdown} 秒后开始输入...`);
  console.log('请切换到你想要输入的编辑器窗口！\n');

  for (let i = countdown; i > 0; i--) {
    console.log(`${i}...`);
    await sleep(1000);
  }

  console.log('\n开始输入!\n');
  await sleep(500);

  try {
    let totalTypedWords = 0;
    let currentLine = [];

    // 持续输入模式：无限循环
    while (true) {
      // 输入一个随机单词
      const word = getRandomWord();
      await typeWord(word);
      totalTypedWords++;
      currentLine.push(word);

      // 单词后的延迟
      await sleep(getTypingDelay());

      // 决定是否换行
      const shouldBreakLine = Math.random() < lineBreakProbability || currentLine.length >= 8;

      if (shouldBreakLine) {
        // 换行
        await pressEnter();
        await sleep(200 + Math.random() * 500);
        console.log(`已输入 ${totalTypedWords} 个单词`);
        currentLine = [];
      } else {
        // 添加空格
        await pressSpace();
        await sleep(50 + Math.random() * 100);
      }

      // 偶尔有较长的思考停顿（10% 概率）
      if (Math.random() < 0.1) {
        const pauseDuration = 1000 + Math.random() * 2000;
        console.log(`思考中... (${Math.round(pauseDuration)}ms)`);
        await sleep(pauseDuration);
      }
    }

  } catch (error) {
    console.error('\n❌ 输入过程中出错:', error.message);
    console.error('\n可能的原因:');
    console.error('1. 没有授予辅助功能权限');
    console.error('2. 焦点不在可编辑的区域');
    console.error('3. 编辑器不支持某些键盘输入\n');
  }
}

// 解析命令行参数
function parseArgs () {
  const args = process.argv.slice(2);
  const options = {};

  // 默认启用持续输入模式
  options.continuous = true;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-c':
      case '--countdown':
        i++;
        options.countdown = Number.parseInt(args[i]);
        break;
      case '-l':
      case '--line-break':
        i++;
        options.lineBreakProbability = Number.parseFloat(args[i]);
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

function showHelp () {
  console.log(`
⌨️  键盘自动输入程序 - 使用说明
═══════════════════════════════════════

用法:
  node keyboard_typer.js [选项]

说明:
  程序会持续不断地输入随机单词，直到按 Ctrl+C 停止

选项:
  -c, --countdown <秒数>    开始前的倒计时秒数 (默认: 3)
  -l, --line-break <概率>   换行概率 0.0-1.0 (默认: 0.3)
  -h, --help               显示帮助信息

示例:
  node keyboard_typer.js                      # 使用默认设置持续输入
  node keyboard_typer.js -c 5                 # 倒计时 5 秒后持续输入
  node keyboard_typer.js -l 0.5               # 50% 概率换行，持续输入

注意事项:
  1. 确保已在"系统设置 > 隐私与安全性 > 辅助功能"中授予权限
  2. 倒计时结束前请切换到目标编辑器窗口
  3. 确保光标在可编辑的位置
  4. 按 Ctrl+C 可随时停止程序
  `);
}

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n\n👋 程序已停止');
  process.exit(0);
});

// 启动程序
if (require.main === module) {
  const options = parseArgs();
  startTyping(options).catch(error => {
    console.error('程序错误:', error);
    process.exit(1);
  });
}

module.exports = { startTyping, typeWord, getRandomWord };
