const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const dirs = fs.readdirSync(path.resolve(__dirname));
const moment = require("moment");

const formatContent = (str) => {
  //替换所有的换行符
  str = str.replace(/\r\n/g, "");
  str = str.replace(/\n/g, "");
  //替换所有的空格（中文空格、英文空格都会被替换）
  str = str.replace(/\s/g, "");
  return str;
};

const getCreateTime = (date) => {
  return moment(date).valueOf();
};

const compare = (a, b) => {
  return -getCreateTime(a.date) + getCreateTime(b.date);
};

const content = dirs
  .map((dir) => {
    if (!/\.md$/.test(dir)) return;
    const joinPath = path.resolve(__dirname, dir);
    const file = fs.readFileSync(joinPath, "utf-8");
    const fileData = matter(file).data;
    const stat = fs.statSync(joinPath);
    const words = formatContent(file).length;

    return {
      ...fileData,
      slug: dir.slice(0, dir.length - 3),
      atimeMs: stat.atimeMs, // 获取文件最后一次访问的时间；
      mtimeMs: stat.mtimeMs, //  文件最后一次修改时间；
      ctimeMs: stat.ctimeMs, // 状态发生变化的时间
      birthtimeMs: stat.birthtimeMs, //   文件创建的时间；
      words: words,
    };
  })
  .filter((x) => x && !x.private)
  .sort(compare);

// const content = dirs
//   .filter((dir) => /\.md$/.test(dir))
//   .map((dir) => ({
//     slug: dir.slice(0, dir.length - 3),
//   }));

fs.writeFileSync(
  path.resolve(__dirname, "content.json"),
  JSON.stringify(content, null, 4),
  "utf-8"
);

console.debug(`成功构建${content.length}篇文章！`);
