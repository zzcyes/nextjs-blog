const { execSync } = require("child_process");

// 设置 encoding 为 'utf-8' 来获取命令执行的输出结果
execSync("rm -rf build && cp -r .next build");

// 美化输出结果
console.log(
  "\x1b[32m✓\x1b[0m", // 绿色对勾
  "Build folder operations completed:",
  "\n  •\x1b[90m Removed old build folder\x1b[0m",
  "\n  •\x1b[90m Copied .next to build folder\x1b[0m"
);
