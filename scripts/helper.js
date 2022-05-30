const removeAllSpaces = (str) => {
    let miniStr = str;
    // console.time("removeAllSpaces");
    //替换所有的换行符
    miniStr = miniStr.replace(/\r\n/g, "");
    miniStr = miniStr.replace(/\n/g, "");
    //替换所有的空格（中文空格、英文空格都会被替换）
    miniStr = miniStr.replace(/\s/g, "");
    // console.timeEnd("removeAllSpaces");
    // console.table({
    //     Name: "removeDuplicatesString",
    //     Length: str.length,
    //     Remove: miniStr.length,
    //     Ratio: Math.ceil(str.length / miniStr.length),
    // });
    return miniStr;
};

const removeDuplicatesString = (str) => {
    // console.time("removeDuplicatesString");
    const miniStr = Array.from(new Set(str.split(""))).join("");
    // console.timeEnd("removeDuplicatesString");
    // console.table({
    //     Name: "removeDuplicatesString",
    //     Length: str.length,
    //     Deduplication: miniStr.length,
    //     Ratio: Math.ceil(str.length / miniStr.length),
    // });
    return miniStr;
};

module.exports = {
    removeAllSpaces,
    removeDuplicatesString,
};