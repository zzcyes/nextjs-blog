# Next.js 博客项目

![项目截图](./assets/demo.png)

这是一个基于Next.js构建的个人博客项目，主要用于分享技术文章和个人见解。

## 功能特性

- 响应式设计，支持移动端和桌面端
- Markdown文章支持
- 文章分类和标签
- 夜间模式支持
- 文章搜索功能

## 快速开始

### 环境要求

- Node.js 16.x 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或者
pnpm install
```

### 开发模式

```bash
npm run dev
# 或者
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 生产构建

```bash
npm run build
# 或者
pnpm build
```

### 启动生产服务器

```bash
npm run start
# 或者
pnpm start
```

## 常见问题

### 1. 构建失败（Webpack错误）

```bash
error - Failed to patch lockfile, please try uninstalling and reinstalling next in this workspace
TypeError: fetch failed
```

**解决方案：**

1. 尝试强制重新安装依赖：

```bash
npm i --force
# 或者
pnpm install --force
```

2. 如果是在M1 Mac上，从不受支持的Node.js版本（如v14）切换到支持的版本（如v16），可能需要重新安装node_modules。

更多信息请参考：[Next.js SWC加载失败](https://nextjs.org/docs/messages/failed-loading-swc)

## 贡献指南

欢迎提交Pull Request！请确保遵循以下步骤：

1. Fork 本项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。