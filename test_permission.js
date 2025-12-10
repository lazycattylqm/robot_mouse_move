const robot = require('robotjs');

console.log('🔍 测试 RobotJS 权限和功能...\n');

try {
  // 测试 1: 获取当前鼠标位置
  console.log('测试 1: 获取鼠标位置');
  const pos = robot.getMousePos();
  console.log(`✅ 当前鼠标位置: (${pos.x}, ${pos.y})\n`);

  // 测试 2: 获取屏幕尺寸
  console.log('测试 2: 获取屏幕尺寸');
  const screenSize = robot.getScreenSize();
  console.log(`✅ 屏幕尺寸: ${screenSize.width}x${screenSize.height}\n`);

  // 测试 3: 尝试移动鼠标
  console.log('测试 3: 尝试移动鼠标');
  console.log('将鼠标移动到屏幕中央...');

  const centerX = Math.floor(screenSize.width / 2);
  const centerY = Math.floor(screenSize.height / 2);

  console.log(`目标位置: (${centerX}, ${centerY})`);

  // 尝试移动
  robot.moveMouse(centerX, centerY);

  // 等待一下再检查位置
  setTimeout(() => {
    const newPos = robot.getMousePos();
    console.log(`移动后位置: (${newPos.x}, ${newPos.y})`);

    // 检查是否真的移动了
    if (Math.abs(newPos.x - centerX) < 10 && Math.abs(newPos.y - centerY) < 10) {
      console.log('✅ 鼠标移动成功！\n');

      // 测试 4: 绘制一个小正方形
      console.log('测试 4: 绘制一个小正方形（如果看到鼠标移动说明权限正常）');
      const size = 100;
      const startX = centerX - size / 2;
      const startY = centerY - size / 2;

      // 移动到起点
      robot.moveMouse(startX, startY);

      // 绘制正方形的四条边
      for (let i = 0; i <= size; i += 5) {
        robot.moveMouse(startX + i, startY);
      }
      setTimeout(() => {
        for (let i = 0; i <= size; i += 5) {
          robot.moveMouse(startX + size, startY + i);
        }
        setTimeout(() => {
          for (let i = size; i >= 0; i -= 5) {
            robot.moveMouse(startX + i, startY + size);
          }
          setTimeout(() => {
            for (let i = size; i >= 0; i -= 5) {
              robot.moveMouse(startX, startY + i);
            }
            console.log('\n✅ 测试完成！如果你看到鼠标画了一个正方形，说明一切正常。');
            console.log('\n如果鼠标完全没有移动，请按照以下步骤设置权限：');
            console.log('1. 打开"系统偏好设置" > "安全性与隐私" > "隐私"');
            console.log('2. 在左侧选择"辅助功能"');
            console.log('3. 点击锁图标解锁（需要输入密码）');
            console.log('4. 确保以下应用有权限：');
            console.log('   - Terminal（终端）');
            console.log('   - 或者你使用的终端应用（如 iTerm2、VSCode 等）');
            console.log('5. 如果列表中没有，点击"+"添加对应应用');
            console.log('6. 重启终端并重新运行此测试\n');
          }, 100);
        }, 100);
      }, 100);

    } else {
      console.log('❌ 鼠标没有移动到目标位置！');
      console.log('这可能是权限问题。\n');
      showPermissionInstructions();
    }
  }, 100);

} catch (error) {
  console.error('❌ 错误:', error.message);
  console.error('\n可能的原因:');
  console.error('1. 缺少系统权限');
  console.error('2. RobotJS 没有正确编译');
  showPermissionInstructions();
}

function showPermissionInstructions () {
  console.log('\n📋 macOS 权限设置步骤:');
  console.log('─────────────────────────────────────────');
  console.log('1. 打开"系统偏好设置"（System Preferences）');
  console.log('2. 点击"安全性与隐私"（Security & Privacy）');
  console.log('3. 选择"隐私"（Privacy）标签');
  console.log('4. 在左侧列表中找到"辅助功能"（Accessibility）');
  console.log('5. 点击左下角的锁图标🔒，输入密码解锁');
  console.log('6. 在右侧列表中找到并勾选：');
  console.log('   ✓ Terminal（或你使用的终端应用）');
  console.log('   ✓ 如果使用 VSCode，也要勾选 Visual Studio Code');
  console.log('7. 如果应用不在列表中，点击"+"按钮添加');
  console.log('8. 设置完成后，重启终端');
  console.log('9. 重新运行: node test_permission.js');
  console.log('─────────────────────────────────────────\n');
}
