const fs = require("fs");
const path = require("path");
const Fontmin = require("fontmin");
const { removeAllSpaces, removeDuplicatesString } = require("./helper");

const getExtractTexts = () => {
    const contentDirs = fs.readdirSync(path.resolve(__dirname, "../content"));
    const extractTexts = [];
    contentDirs.forEach((dir) => {
        if (!/\.md$/.test(dir)) return;
        const fileContent = fs.readFileSync(
            path.resolve(__dirname, `../content/${dir}`),
            "utf-8"
        );
        const miniFileContent = removeAllSpaces(fileContent);
        extractTexts.push(miniFileContent);
    });
    const miniExtractTexts = removeDuplicatesString(extractTexts.join("")) || "";
    return miniExtractTexts;
};

const UppercaseLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowercaseLtters = UppercaseLetter.toLocaleLowerCase();
const Numbers = "0123456789";
const BlogName = "我不是橙子啊";
const Others = "使用讨论在编辑";

const Commonfonts = [
    UppercaseLetter,
    LowercaseLtters,
    Numbers,
    BlogName,
    Others,
];

const runFontmin = ({ extractText, fontName, filePath, exportPath }) => {
    const fontmin = new Fontmin()
        .src(filePath)
        .use(
            Fontmin.glyph({
                text: extractText,
                hinting: false, // keep ttf hint info (fpgm, prep, cvt). default = true
            })
        )
        // // .use(Fontmin.ttf2eot())
        // // .use(Fontmin.ttf2svg())
        // // .use(
        // //     Fontmin.ttf2woff({
        // //         deflate: true, // deflate woff. default = false
        // //     })
        // // )
        // .use(
        //     Fontmin.css({
        //         fontFamily: fontName,
        //         base64: true,
        //     })
        // )
        .dest(exportPath);
    fontmin.run();
};

console.time("拆分字体");

const getArticleTitles = () => {
    const titles = removeDuplicatesString(
        require("./../content.json")
        .map((a) => a.title)
        .join("")
    );
    return titles;
};

// 字母
runFontmin({
    extractText: Commonfonts.slice(0, 3),
    filePath: path.resolve(__dirname, "../public/font/CuteAlphabet.woff2"),
    exportPath: path.resolve(__dirname, "../public/font-split"),
});

// 普惠体
runFontmin({
    extractText: getExtractTexts() + Commonfonts.join(""),
    filePath: path.resolve(__dirname, "../public/font/Alibaba-PuHuiTi-*.ttf"),
    exportPath: path.resolve(__dirname, "../public/font-split"),
});

// 手写体
runFontmin({
    extractText: getArticleTitles() + BlogName,
    filePath: path.resolve(__dirname, "../public/font/Handdrawn.ttf"),
    exportPath: path.resolve(__dirname, "../public/font-split"),
});

console.timeEnd("拆分字体");