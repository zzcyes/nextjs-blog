const fs = require("fs");
const path = require("path");
const moment = require("moment");
const matter = require("gray-matter");

const { removeAllSpaces } = require("./helper");

const getCreateTime = (date) => {
    return moment(date).valueOf();
};

const compare = (a, b) => {
    return -getCreateTime(a.date) + getCreateTime(b.date);
};

const baseContentPath = path.resolve(__dirname, "../content");
const exportContentPaths = path.resolve(__dirname, "../content.json");

const genContents = (basePath, exportPath) => {
    const contentDirs = fs.readdirSync(basePath);
    const content = contentDirs
        .map((dir) => {
            if (!/\.md$/.test(dir)) return;
            const joinPath = path.join(basePath, dir);
            const file = fs.readFileSync(joinPath, "utf-8");
            const fileData = matter(file).data;
            const stat = fs.statSync(joinPath);
            const words = removeAllSpaces(file).length;

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
    fs.writeFileSync(exportPath, JSON.stringify(content, null, 4), "utf-8");
    return content;
};

// const content = baseContentDirs
//   .filter((dir) => /\.md$/.test(dir))
//   .map((dir) => ({
//     slug: dir.slice(0, dir.length - 3),
//   }));
console.time("构建文章目录");

console.debug(
    `文章：${genContents(baseContentPath, exportContentPaths).length}篇`
);

console.timeEnd("构建文章目录");

module.exports = genContents;