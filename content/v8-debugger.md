---
title: "V8源码调试"
date: "2022-05-28 11:44:27"
private: "true"
---

## jsvu

### 安装 jsvu

```
npm install --global jsvu
```

### 使用 jsvu

```
jsvu
```

选择 v8 和 v8-debug

因为本机安装过 jsvu，所以再次输入命令会显示已经安装的信息

![image-20220527111703948](D:\zhongzichen\markdown\docs\images\V8源码调试\image-20220527111703948.png)

### 配置环境变量

首先添加用户变量`V8_HOME` , 变量值为 `.jsvu` 的目录 

![image-20220527111749128](D:\zhongzichen\markdown\docs\images\V8源码调试\image-20220527111749128.png)

在用户变量 path 中 添加 `%V8_HOME%`

![image-20220527111815308](D:\zhongzichen\markdown\docs\images\V8源码调试\image-20220527111815308.png)

打开命令行运行工具，在非 `c:/%HOMEPATH%/.jsvu` 目录中输入 `v8 -v`，能看到 v8 的版本信息则说明环境配置成功，我们可以在任何一个目录下能都够进行 v8 调试了。

![image-20220527112030770](D:\zhongzichen\markdown\docs\images\V8源码调试\image-20220527112030770.png)

### 内部方法

通过设置 `--allow-natives-syntax` 可以使用 v8 [内部 API](https://github.com/v8/v8/blob/4b9b23521e6fd42373ebbcb20ebe03bf445494f9/src/runtime/runtime.h)，如下，使用 `%DebugPrint` 打印变量 a 的信息：

```js
// test.js
let a = [1, "hello", true, function() {
    return 1;
}];
console.debug(%DebugPrint(a));
```

运行命令：

```
d8 test.js --allow-natives-syntax
```

## 文章

- [JavaScript 引擎 V8 执行流程概述](https://mp.weixin.qq.com/s/t__Jqzg1rbTlsCHXKMwh6A)
- [v8-debug 与 V8 编译流程 - 掘金](https://juejin.cn/post/6979149480960458788#comment)
- [探究JS V8引擎下的“数组”底层实现](https://mp.weixin.qq.com/s?__biz=MzI4NjY4MTU5Nw==&mid=2247486244&idx=2&sn=f215f9a64fc622622e4a86d8f22e9ba6&chksm=ebd87bb6dcaff2a0d78f7e6175ae0f3eca753f09b3d51d6e2ce25ddaf737aef15c42dc9e9d87&scene=178&cur_album_id=1500522652875194368#rd)
    