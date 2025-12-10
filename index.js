const robot = require('robotjs');

/**
 * 获取屏幕尺寸
 */
function getScreenSize () {
  return robot.getScreenSize();
}

/**
 * 生成贝塞尔曲线路径点
 * 用于模拟人类鼠标移动的自然曲线
 */
function generateBezierPath (startX, startY, endX, endY, points = 50) {
  const path = [];

  // 生成两个控制点，使路径更自然
  const ctrl1X = startX + (endX - startX) * (0.25 + Math.random() * 0.25);
  const ctrl1Y = startY + (endY - startY) * (0.25 + Math.random() * 0.25);
  const ctrl2X = startX + (endX - startX) * (0.5 + Math.random() * 0.25);
  const ctrl2Y = startY + (endY - startY) * (0.5 + Math.random() * 0.25);

  // 使用三次贝塞尔曲线公式生成路径点
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    const x = mt3 * startX +
      3 * mt2 * t * ctrl1X +
      3 * mt * t2 * ctrl2X +
      t3 * endX;

    const y = mt3 * startY +
      3 * mt2 * t * ctrl1Y +
      3 * mt * t2 * ctrl2Y +
      t3 * endY;

    path.push({ x: Math.round(x), y: Math.round(y) });
  }

  return path;
}

/**
 * 生成符合人类习惯的延迟时间
 * 使用正态分布，让速度有变化
 */
function getHumanlikeDelay () {
  // 基础延迟：5-15ms
  const baseDelay = 5 + Math.random() * 10;

  // 随机添加额外延迟，模拟人类的不均匀移动
  const extraDelay = Math.random() < 0.3 ? Math.random() * 20 : 0;

  return Math.round(baseDelay + extraDelay);
}

/**
 * 模拟人类鼠标移动
 */
async function moveMouseHumanlike (targetX, targetY) {
  const currentPos = robot.getMousePos();
  const path = generateBezierPath(currentPos.x, currentPos.y, targetX, targetY);

  // 沿路径移动鼠标
  for (let i = 0; i < path.length; i++) {
    const point = path[i];
    robot.moveMouse(point.x, point.y);

    // 随机延迟，模拟时快时慢
    const delay = getHumanlikeDelay();
    await sleep(delay);

    // 偶尔暂停一下，模拟人类的犹豫
    if (Math.random() < 0.05) {
      await sleep(50 + Math.random() * 100);
    }
  }
}

/**
 * 生成随机目标位置
 * 避免太靠近边缘
 */
function getRandomTarget (screenSize) {
  const margin = 100; // 边缘边距

  return {
    x: margin + Math.floor(Math.random() * (screenSize.width - 2 * margin)),
    y: margin + Math.floor(Math.random() * (screenSize.height - 2 * margin))
  };
}

/**
 * 休眠函数
 */
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 主循环
 */
async function startRandomMovement () {
  console.log('🖱️  鼠标随机移动程序已启动...');
  console.log('按 Ctrl+C 停止程序');

  const screenSize = getScreenSize();
  console.log(`屏幕尺寸: ${screenSize.width}x${screenSize.height}`);

  let moveCount = 0;

  while (true) {
    try {
      moveCount++;

      // 生成随机目标位置
      const target = getRandomTarget(screenSize);

      console.log(`\n第 ${moveCount} 次移动: 移动到 (${target.x}, ${target.y})`);

      // 模拟人类移动
      await moveMouseHumanlike(target.x, target.y);

      // 到达目标后，随机等待一段时间
      // 模拟人类在不同位置停留的时间不同
      const waitTime = 1000 + Math.random() * 3000;
      console.log(`停留 ${Math.round(waitTime)}ms`);
      await sleep(waitTime);

    } catch (error) {
      console.error('移动出错:', error.message);
      await sleep(1000);
    }
  }
}

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n\n👋 程序已停止');
  process.exit(0);
});

// 启动程序
startRandomMovement().catch(error => {
  console.error('程序错误:', error);
  process.exit(1);
});
