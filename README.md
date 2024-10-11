# react-request-queue

A React hook to manage request queues, ensuring that only one request is processed at a time to avoid inconsistent results due to asynchronous issues.

## Installation

You can install this package using npm:

```sh
npm install react-request-queue
```

Or using yarn:

```sh
yarn add react-request-queue
```

## Usage

### Import the Hook

First, import the `useRequestQueue` hook in your component:

```tsx
import React, { useEffect } from 'react';
import useRequestQueue from 'react-request-queue';
```

### Define Your Request Function

Define the function that will handle the requests. This function should be asynchronous:

```tsx
const fetchDataLocal = async (params: any) => {
  const response = await api.fetchDataRemote(params);
};
```

### Use the Hook

Use the `useRequestQueue` hook in your component, passing the request function and dependencies:

```tsx
const MyComponent = ({ dep1, dep2 }) => {
  const { addToQueue } = useRequestQueue(fetchDataLocal, [dep1, dep2]);

  useEffect(() => {
    const params = {dep1, dep2};
    addToQueue(params);
  }, [dep1, dep2]);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default MyComponent;
```

## API

### `useRequestQueue(requestFunction, dependencies)`

#### Parameters

- `requestFunction` (Function): The function that will handle the requests. It should return a promise.
- `dependencies` (Array): An array of dependencies that will trigger the processing of the queue when they change.

#### Returns

- `addToQueue` (Function): A function to add a new request to the queue.

## License

MIT
```