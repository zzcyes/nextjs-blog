const { spawnSync } = require("child_process");

const runScript = (scriptPath) => {
  const result = spawnSync("node", [scriptPath], { stdio: "inherit" });
  if (result.error) {
    console.error(`Error running ${scriptPath}:`, result.error);
    process.exit(1); // 退出并显示错误
  }
};

module.exports = runScript;
