## feathers-mobx

> Inplement feathers client into your mobx store

**feathers-mobx** is an integration of the Feathers Client for `mobx`.  
It can be used with any mobx client like `react-mobx` and `vue-mobx`.  

#### [documentation](feathers-mobx.github.io)
#### [example](example/)

## Quick start

#### installation

``yarn add feathers-mobx``

#### usage

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
  userStore: createAuthStore(feathers, options),
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
      {todoStore.items?.map(todo => 
        <div className="todo">
          {todo.name}
        </div>
      )}
    </div>
  );
});
```

## License

MIT