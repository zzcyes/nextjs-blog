---
title: "Redux 源码阅读（一）：源码调试（上）"
date: "2022-05-27 20:05:02"
---

## 版本信息

开发环境、npm包版本信息：

| 名称 | 版本 |
| ---- | ---- |
| yarn | 1.22.17 |
| redux | 5.0.0-alpha.0 |
| react | 18.1.0 |
| node | v14.17.0 |
| OS | Microsoft Windows [版本 10.0.19044.1645] |
| Google Chrome | 版本 103.0.5057.3（正式版本）dev （64 位） |


Redux  插件可以与 React 或者其他 view library 一起使用。并且，Redux 提供了 ES、CommonJS 等不同模块规范的依赖包。因此，我们除了在 React 项目实例下调试 Redux，还可以在 Node 环境下调试。

## React 创建项目

通过 `create-react-app` 脚手架创建一个支持 typescript 的 React 项目，`<project name>`为需要填入的项目名称

```js
// npx
npx create-react-app <project name> --template typescript

// yarn
yarn create react-app <project name> --template typescript 

// or
npm install -g create-react-app 
create-react-app <project name> --template typescript 
```

Tips：如果不加 `--template`，只是 `--typescript` ，项目只是支持 ts ，本身模板不会升级到 ts。 

### run eject scripts

运行 `eject scripts`命令，可以将 webpack 等配置或依赖项放开（不可逆，若不需要自定义配置则跳过），这里只是为了方便后续自定义配置。

```js
yarn eject 
// or 
// npm run eject
```

![redux-debugger-image-20220523143711304](https://www.zzcyes.com/images/redux-debugger-20220523143711304.png)

### 安装 Redux

```js
// Yarn
yarn add redux

// NPM
npm install redux
```

## 初始化 Node 环境

Node 环境下调试下就比较简洁了，先初始化 npm 

```
npm init 
```

再安装 Redux 包

```js
// Yarn
yarn add redux

// NPM
npm install redux
```

## Clone Redux

从 Github 克隆 [Redux](https://github.com/reduxjs/redux) 仓库到本地

```
git clone --depth 1 --branch master git@github.com:reduxjs/redux.git
```

### 打包 Redux

```js
// Yarn
yarn install 
yarn build 

// NPM 
npm install 
npm run build 
```

build 之后可以看到会打包出不同版本的 Redux 文件。

![redux-debugger-image-20220523144704410](https://www.zzcyes.com/images/redux-debugger-20220523144704410.png)

打开  `rollup.config.js` 文件，可以看到不同版本的构建信息

![redux-debugger-image-20220523145036749](https://www.zzcyes.com/images/redux-debugger-20220523145036749.png)

- CommonJS

  - lib/redux.js

- ES

  - es/redux.js

- ES for Browsers

  - es/redux.mjs

- UMD Development

  - dist/redux.js

- UMD Production

  - dist/redux.min.js

### 添加 Source Map

在output 配置中添加 `sourcemap:true` 配置，打包后会在原有目录下多输出一份`*.js.map` 文件，可进行 Source Map 源码调试。

```diff
{
    input: 'src/index.ts',
-   output: { file: 'es/redux.js', format: 'es', indent: false },
+   output: { file: 'es/redux.js', format: 'es', indent: false, sourcemap: true, },
    external,
    plugins: [
     	// ... 
    ]
},
```

## Redux Link

### Link Redux 到全局

通过 `npm link` 命令，我们 clone 下来的 redux 项目会被链接到全局。

```
cd redux
npm link
```

![redux-debugger-image-20220524110458367](https://www.zzcyes.com/images/redux-debugger-20220524110458367.png)

根据 [npm Docs (Version 6.x)](https://docs.npmjs.com/cli/v6/commands/npm-link/) 文档描述， `npm link` 成功的话，会把库包链接到 `{prefix}/lib/node_modules/<package>`  

![redux-debugger-image-20220524111908683](https://www.zzcyes.com/images/redux-debugger-20220524111908683.png)

为了验证 `npm link` 是否成功，我们先通过 `npm config get prefix` 命令查看 `prefix` 值，在这里是`C:\Users\admin\AppData\Roaming\npm` 

![redux-debugger-image-20220524110936982](https://www.zzcyes.com/images/redux-debugger-20220524110936982.png)

再进入到 `{prefix}/lib/node_modules/<package>` 目录下看 `redux` 是否被链接到全局。

![redux-debugger-image-20220524112032408](https://www.zzcyes.com/images/redux-debugger-20220524112032408.png)

进入到 `{prefix}` 目录后，会发现并没有 `lib` 目录（与官方文档描述不符）。那么直接进入到 `node_modules` 目录，会发现，此时 `redux` 已被链接到全局，并且是以快捷方式创建的文件。

Tips：需要注意的是，这里链接到全局的 redux 模块的命名，并不是根据我们 clone 的项目的文件名来命名的，而是根据 `package.json` 里边的 `name` 字段命名的，也就是包名。

![redux-debugger-image-20220524112142220](https://www.zzcyes.com/images/redux-debugger-20220524112142220.png)

### 引用全局 Redux

刚刚经过 `npm link` 已经把我们 clone 下来的 redux 模块链接到全局 `node_modules` 。接下来，我们只需要在 react 项目根目录或初始化后的 Node 环境根目录下，通过 `npm link redux` 命令，把我们在调试环境中引用的 `redux` 模块链接到全局 `node_modules` 。

```js
// cd <React Project Name>
npm link redux 
```

![redux-debugger-image-20220524113638619](https://www.zzcyes.com/images/redux-debugger-20220524113638619.png)

link 成功后，会输出当前项目 redux 的引用关系：当前项目引用的 redux 模块 -> 全局 redux模块 -> 克隆下来的 redux 模块

```
D:\workspace\source-code-debugger\react-redux-debugger\node_modules\redux -> C:\Users\admin\AppData\Roaming\npm\node_modules\redux -> D:\workspace\Open-Github\redux
```

## 链接

- [npm-link | npm Docs](https://docs.npmjs.com/cli/v6/commands/npm-link/)

- [《package.json 中 你还不清楚的 browser，module，main 字段优先级》](https://github.com/SunshowerC/blog/issues/8)）

- [API Reference | Redux](https://redux.js.org/api/api-reference)
    