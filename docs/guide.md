## Quick Start

### Install Feathers-mobx

``yarn add feathers-mobx``


### React JS

```js
// <stores.js>

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

import {
  createServiceStore,
  createAuthStore,
} from 'feathers-mobx';

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(socketio(socket));

const options = {};

export default {
  todoStore: createServiceStore(feathers, 'todos', options),
  userStore: createServiceStore(feathers, 'users', options),
  authStore: createAuthStore(feathers, options),
};
```

```js
// <components/App.js>

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import useStores from '../hooks/useStores';

export default observer(() => {
  const { todoStore } = useStores();

  useEffect(() => {
    todoStore.find();
    todoStore.find({ namespace: 'foo', userId: 'userId' });
  }, []);

  return (
    <div className="todos">
      <div>{todoStore.isFindPending && 'loading...'}</div>
      <div>{todoStore.namespaces.foo.isFindPending && 'loading...'}</div>
      <div>{todoStore.errorOnFind?.message}</div>
      <div>{todoStore.namespaces.foo.errorOnFind?.message}</div>
      {todoStore.items?.map(todo => 
        <div className="todo">{todo.name}</div>
      )}
      {todoStore.namespaces.fooTodos.items?.map(todo => 
        <div className="todo">{todo.name}</div>
      )}
    </div>
  );
});
```

### Vue JS

### React Native
