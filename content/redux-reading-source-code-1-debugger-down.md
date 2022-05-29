---
title: "Redux 源码阅读（一）：源码调试（下）"
date: "2022-05-27 20:15:36"
---

## 确定模块入口

先 cd 到 redux 根目录下，查看  `package.json` 文件的信息，确定下模块入口。

![redux-debugger-image-20220524145050748](https://www.zzcyes.com/images/redux-debugger-20220524145050748.png)

### React 

在 React 项目下进行调试时，我们找到 `module` 字段为 `es/redux.js` 。然后在  `es/redux.js` 文件里打 debugger 进行断点调试。

Tips：为什么入口不是 `main` 字段 ，推荐阅读这篇文章[《package.json 中 你还不清楚的 browser，module，main 字段优先级》](https://github.com/SunshowerC/blog/issues/8)

### Node

Node 环境支持 CommonJS 规范， 在 `package.json` 中，`main` 字段为 `lib/redux.js` 。我们在 `lib/redux.js` 文件里打 debugger 进行断点调试。

## debugger

### React

为了验证 redux  link 是否生效，我们在  `es/redux.js` 文件下的 `createStore` 函数内部进行 debugger 调试。

![redux-debugger-image-20220524145654269](https://www.zzcyes.com/images/redux-debugger-20220524145654269.png)

在 react 项目中通过 createStore 函数创建 store ，然后在组件中使用 store（省略详细代码，重点不是如何使用 redux）

![redux-debugger-image-20220524150948764](https://www.zzcyes.com/images/redux-debugger-20220524150948764.png)

通过 `yarn start` 运行项目后，会发现 console 输出了我们在 redux 项目中 debugger 打印的信息。

![redux-debugger-image-20220524151255113](https://www.zzcyes.com/images/redux-debugger-20220524151255113.png)

可以看到 Sources 面板中，展示了我们打断点的源码信息，需要注意的是，我们是在 `redux.js` 文件中进行的断点调试，那为什么这里显示的是`createStore.ts` 文件的信息呢? 

![redux-debugger-image-20220524151322772](https://www.zzcyes.com/images/redux-debugger-20220524151322772.png)

### Node

为了验证 node 环境下 redux  link 是否生效，先进入到 `lib/redux.js` 中添加调试信息

![image-20220526101539133](https://www.zzcyes.com/images/redux-debugger-20220526101539133.png)

接着在 Node 环境下通过 createStore 函数创建 store 

```typescript
const { createStore, combineReducers, applyMiddleware, compose } = require('redux');
const { counterReducer } = require('./reducer')

const store = createStore(
    counterReducer,
);

console.debug(store.getState());
```

使用 VSCode 编辑器的 Run Debugger 功能进行调试，这里选择 Node.js 环境

![image-20220526101421535](https://www.zzcyes.com/images/redux-debugger-20220526101421535.png)

Run Debugger 后，会跳转到刚刚在  `lib/redux.js`  打debugger 的位置了，说明之前添加的 redux  link 生效了。那么接下来就可以愉快的调试了！

![image-20220526102150189](https://www.zzcyes.com/images/redux-debugger-20220526102150189.png)

## Source Map

还记得之前我们修改过 `rollup.config.js` 文件的配置吗，我们配置了  `sourcemap: true`。在 rollup 打包的时候，会在原有输出目录下多打包出一个  `*.js.map` 的文件

![redux-debugger-image-20220524151953295](https://www.zzcyes.com/images/redux-debugger-20220524151953295.png)

在回到 `redux.js` 文件的最后一行，能看到一行注释 `// sourceMappingURL=redux.js.map*` ，这里标记了该文件的 Source Map 地址为 `redux.js.map` ，如果我们想在浏览器 `source` 面板看到 `redux.js` 的文件信息，那么我们把这行注释去掉即可。

![redux-debugger-image-20220524152831314](https://www.zzcyes.com/images/redux-debugger-20220524152831314.png)

## 源码目录

redux 源码目录如下：

```js
|-- redux
    |-- dist                      // 打包后的 redux、source map 文件
    |-- docs                      // 官方文档说明
    |-- es                        // 打包后支持 ES Modules 的 redux、source map 文件 
    |-- examples                  // 官方案例包括 counter、todomvs等等
    |-- lib                       // 打包后支持 CommonJS 的 redux、source map 文件   
    |-- logo                      // logo图标
    |-- scripts                   // 存放 js 文件
        |-- mangleErrors.js           // babel 插件，记录错误信息到 errors.json 文件
    |-- src                       // 核心 API 代码
        |-- types                     // 部分核心类的 ts 类型
        |-- utils                     // 工具类
    |-- test                      // 单元测试
    |-- types                     // 核心代码
        |-- types                     // 部分核心类的声明
        |-- utils                     // 工具类的声明
    |-- website                   // 使用 docusaurus 搭建官方文档的静态网站
```

我们主要关注 src 和 types 这两个目录。

- redux/src

  核心 API 都在 src 的根目录下，除此外，src/utils 目录下放的是一些工具函数类，types 是核心类的 ts 类型。

```
|-- redux
    |-- src
    |   |-- applyMiddleware.ts
    |   |-- bindActionCreators.ts
    |   |-- combineReducers.ts
    |   |-- compose.ts
    |   |-- createStore.ts
    |   |-- index.ts
    |   |-- types
    |   |   |-- actions.ts
    |   |   |-- middleware.ts
    |   |   |-- reducers.ts
    |   |   |-- store.ts
    |   |-- utils
    |       |-- actionTypes.ts
    |       |-- formatProdErrorMessage.ts
    |       |-- isPlainObject.ts
    |       |-- kindOf.ts
    |       |-- symbol-observable.ts
    |       |-- warning.ts
    
```

- redux/types

  types 目录下都是核心 API 和工具类的声明文件，并且文件结构与 redux/src 是一一对应的。

```
|-- redux
    |-- types
        |   |-- applyMiddleware.d.ts
        |   |-- bindActionCreators.d.ts
        |   |-- combineReducers.d.ts
        |   |-- compose.d.ts
        |   |-- createStore.d.ts
        |   |-- index.d.ts
        |   |-- types
        |   |   |-- actions.d.ts
        |   |   |-- middleware.d.ts
        |   |   |-- reducers.d.ts
        |   |   |-- store.d.ts
        |   |-- utils
        |       |-- actionTypes.d.ts
        |       |-- formatProdErrorMessage.d.ts
        |       |-- isPlainObject.d.ts
        |       |-- kindOf.d.ts
        |       |-- symbol-observable.d.ts
        |       |-- warning.d.ts
```

## 源码入口

我们阅读源码的时候可以直接看 redux/src  目录下的 ts 文件，这样方便阅读。碰到有疑惑的点，则可以通过打包构建后的 redux.js 文件进行 debugger 调试，并且在 redux.js 文件末尾加上一行注释  `// sourceMappingURL=redux.js.map` ，可以映射到 sourece map 文件，进而在我们 debugger 调试的时候访问到 redux/src 目录下的 ts 文件。

- redux/src/index.ts

  index.ts 是源码入口文件，在这个文件可以划分为两个部分。

  第一部分是从 redux/src/types 目录下导出 ts 类型。

  ```typescript
  // ...
  
  // types
  // store
  export {
    CombinedState,
    PreloadedState,
    Dispatch,
    Unsubscribe,
    Observable,
    Observer,
    Store,
    StoreCreator,
    StoreEnhancer,
    StoreEnhancerStoreCreator,
    ExtendState
  } from './types/store'
  // reducers
  export {
    Reducer,
    ReducerFromReducersMapObject,
    ReducersMapObject,
    StateFromReducersMapObject,
    ActionFromReducer,
    ActionFromReducersMapObject
  } from './types/reducers'
  // action creators
  export { ActionCreator, ActionCreatorsMapObject } from './types/actions'
  // middleware
  export { MiddlewareAPI, Middleware } from './types/middleware'
  // actions
  export { Action, AnyAction } from './types/actions'
  
  // ...
  ```

  第二部分则是通过 export 导出了 redux 的五个核心 API：createStore、combineReducers、bindActionCreators、applyMiddleware 和 compose。

## Redux API

  Redux 源码不到千行，但是其生态却很丰富，以下是完整的 [Redux API](https://redux.js.org/api/api-reference)，后续阅读源码时，也是按照 API 来阅读分析。

  Top-Level Exports：

  - createStore(reducer, [preloadedState], [enhancer])
  - combineReducers(reducers)
  - applyMiddleware(...middlewares)
  - bindActionCreators(actionCreators, dispatch)
  - compose(...functions)

  Store API

  - Store
    - getState()
    - dispatch(action)
    - subscribe(listener)
    - replaceReducer(nextReducer)

## 链接

- [npm-link | npm Docs](https://docs.npmjs.com/cli/v6/commands/npm-link/)

- [《package.json 中 你还不清楚的 browser，module，main 字段优先级》](https://github.com/SunshowerC/blog/issues/8)）

- [API Reference | Redux](https://redux.js.org/api/api-reference)
    