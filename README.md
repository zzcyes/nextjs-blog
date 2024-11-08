## Getting Started

![demo.png](./assets/demo.png)

## Usage

First, build the development server:

```bash
npm run build
# or
yarn build
```
next to run the development server:

```bash
npm run dev
# or
yarn dev
```

next to run the production server:

```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Q&A

1. Build failed because of webpack errors

```bash
error - Failed to patch lockfile, please try uninstalling and reinstalling next in this workspace
TypeError: fetch failed
    at node:internal/deps/undici/undici:12618:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.patchIncorrectLockfile (/Users/zhongzichen/Develop/zzcyes-github/nextjs-blog/node_modules/next/dist/lib/patch-incorrect-lockfile.js:72:33)
    at async Object.build [as default] (/Users/zhongzichen/Develop/zzcyes-github/nextjs-blog/node_modules/next/dist/build/index.js:1350:9) {
  cause: ConnectTimeoutError: Connect Timeout Error
      at onConnectTimeout (node:internal/deps/undici/undici:7760:28)
      at node:internal/deps/undici/undici:7716:50
      at Immediate._onImmediate (node:internal/deps/undici/undici:7748:13)
      at process.processImmediate (node:internal/timers:476:21) {
    code: 'UND_ERR_CONNECT_TIMEOUT'
  }
}

> Build failed because of webpack errors
```

When on an M1 Mac and switching from a Node.js version without M1 support to one with, e.g. v14 to v16, you may need a different swc dependency which can require re-installing node_modules (npm i --force or yarn install --force).

https://nextjs.org/docs/messages/failed-loading-swc