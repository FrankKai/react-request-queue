# react-request-queue

一个用于管理请求队列的 React hook，确保一次只处理一个请求，以避免由于异步问题导致的不一致结果。

## 安装

你可以使用 npm 安装此包：

```sh
npm install react-request-queue
```

或者使用 yarn：

```sh
yarn add react-request-queue
```

## 使用方法

### 导入 Hook

首先，在你的组件中导入 `useRequestQueue` hook：

```tsx
import React, { useEffect } from 'react';
import useRequestQueue from 'react-request-queue';
```

### 定义请求函数

定义处理请求的函数。这个函数应该是异步的：

```tsx
const fetchDataLocal = async (params: any) => {
  const response = await api.fetchDataRemote(params);
};
```

### 使用 Hook

在你的组件中使用 `useRequestQueue` hook，传入请求函数和依赖项：

```tsx
const MyComponent = ({ dep1, dep2 }) => {
  const { addToQueue } = useRequestQueue(fetchDataLocal, [dep1, dep2]);

  useEffect(() => {
    const params = {dep1, dep2};
    addToQueue(params);
  }, [dep1, dep2]);

  return (
    <div>
      {/* 你的组件内容 */}
    </div>
  );
};

export default MyComponent;
```

## API

### `useRequestQueue(requestFunction, dependencies)`

#### 参数

- `requestFunction` (函数): 处理请求的函数。它应该返回一个 promise。
- `dependencies` (数组): 当这些依赖项发生变化时，将触发队列的处理。

#### 返回值

- `addToQueue` (函数): 一个将新请求添加到队列中的函数。

## 许可证

MIT
