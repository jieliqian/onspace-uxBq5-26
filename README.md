 # onspace-app

基于 React Native & Expo 的移动应用项目

## 项目简介

onspace-app 是一个基于 React Native 和 Expo 构建的移动应用项目，集成了丰富的第三方库，支持多平台（iOS、Android、Web）开发与运行。

## 目录结构

（可根据实际项目结构补充）

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或者
yarn install
```

### 2. 启动项目

- 启动开发服务器（选择平台）：

```bash
npm run start         # 启动 Expo 开发服务器
npm run android       # 启动 Android 模拟器
npm run ios           # 启动 iOS 模拟器
npm run web           # 启动 Web 端
```

- 重置项目（清理缓存等）：

```bash
npm run reset-project
```

### 3. 代码检查

```bash
npm run lint
```

## 主要依赖

- React Native: 0.79.4
- React: 19.0.0
- Expo: ~53.0.12
- Expo Router: ~5.1.0
- Supabase: ^2.50.0
- 其他常用库：  
  - @expo/vector-icons  
  - react-native-paper  
  - react-native-calendars  
  - lottie-react-native  
  - react-native-webview  
  - 等等

详细依赖请见 [package.json](./package.json)。

## 开发工具

- TypeScript: ~5.8.3
- ESLint: ^9.25.0
- @babel/core: ^7.25.2

## 贡献指南

1. Fork 本仓库
2. 新建分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -am 'Add new feature'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 提交 Pull Request

## License

本项目为私有项目（"private": true），如需合作请联系作者。

---

如需补充项目截图、API 文档、功能说明等内容，请在相应位置添加。
