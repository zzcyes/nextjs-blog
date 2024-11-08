const path = require("path");
const runScript = require("./runScripts");

const splitFontPath = path.resolve(__dirname, "splitFont.js");
const genContentsPath = path.resolve(__dirname, "genContents.js");

runScript(splitFontPath);
runScript(genContentsPath);

// 使用统一的美化格式
console.log(
  "\x1b[32m✓\x1b[0m", // 绿色对勾
  "Font operations completed:",
  "\n  •\x1b[90m Split font completed\x1b[0m",
  "\n  •\x1b[90m Generated contents file\x1b[0m"
);
