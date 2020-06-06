## feathers-mobx

> Inplement feathers client into your mobx store

**feathers-mobx** is an integration of the Feathers Client for `mobx`.  
It can be used with any mobx client like `react-mobx` and `vue-mobx`.

#### [documentation](https://florianguyonnet.github.io/feathers-mobx/#/)

#### [example](example/)

## Quick start

### installation

`yarn add feathers-mobx`

### usage

```js
// <stores.js>

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

import { createServiceStore, createAuthStore } from 'feathers-mobx';

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
  }, []);

  return (
    <div className="todos">
      <div>{todoStore.isFindPending && 'loading...'}</div>
      <div>{todoStore.errorOnFind?.message}</div>
      {todoStore.items?.map((todo) => (
        <div className="todo">{todo.name}</div>
      ))}
    </div>
  );
});
```

### namespaces

Namespaces is a feature designed to handle different sets of items at the same time.

```js
// <components/App.js>

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import useStores from '../hooks/useStores';

export default observer(() => {
  const { todoStore } = useStores();

  useEffect(() => {
    todoStore.find({
      namespace: 'foo',
    });
    todoStore.get({
      namespace: 'bar',
    });
  }, []);

  return (
    <div className="todos">
      <div>{todoStore.namespaces.bar.item?.name}</div>
      <div>{todoStore.namespaces.foo.isFindPending && 'loading...'}</div>
      <div>{todoStore.namespaces.foo.errorOnFind?.message}</div>
      {todoStore.namespaces.foo.items?.map((todo) => (
        <div className="todo">{todo.name}</div>
      ))}
    </div>
  );
});
```

`update`, `patch` and `remove` actions are not scoped in each namespaces. So, the following code will not work:

```js
todoStore.namespaces.foo.isUpdatePending; // NO
todoStore.isUpdatePending; // YES
```

## License

MIT
