Service store implement feathers REST and Socket services on the client side for mobx. 

### setup

```js
import { createServiceStore } from 'feathers-mobx';

createServiceStore(feathers, 'todos', {
  idField: '_id', // default 'id'
});
```

### observable

```js
{
  items,
  item,
  pagination,

  isFindPending,
  isGetPending,
  isCreatePending,
  isUpdatePending,
  isPatchPending,
  isRemovePending,

  errorOnFind,
  errorOnGet,
  errorOnCreate,
  errorOnUpdate,
  errorOnPatch,
  errorOnRemove,
}
```

### Actions

```js
{
  find,
  get,
  create,
  update,
  patch,
  remove,

  clearAll,
  clearPending,
  clearError,
}
```

#### find(params)

- `sotre.find({ ...params })`

#### get(id, params)

- `sotre.get(id, { ...params })`

#### create(data, params)

- `sotre.get({ ...data }, { ...params })`

#### update(id, data, params)

- `sotre.update(null, { ...data }, { ...params })`

#### patch(id, data, params)

- `sotre.patch(null, { ...data }, { ...params })`

#### remove(id, params)

- `sotre.remove(null, { ...params })`

#### clearData

- reset `items`, `item` and `pagination` to `null`

#### clearPending

- reset all pending observables to `false`

#### clearError

- reset all error observables to `null`

### Namespaces

Namespaces is a feature designed to handle different sets of items at the same time.

#### Find

```js
store.find({ namespace: 'foo' });
console.log(store.namespaces.foo.items);
```

#### Get

```js
store.get(id, { namespace: 'foo' });
console.log(store.namespaces.foo.item);
```

#### Options

```js
store.namespaces.foo.insertCreated = true; // will insert created socket items into the namespaces
```

⚠️ `update`, `patch` and `remove` actions are not scoped in each namespaces. So, the following code will not work:

```js
todoStore.namespaces.foo.isUpdatePending; // NO
todoStore.isUpdatePending; // YES
```

### Options

#### insertCreated

- will insert created socket items into items

```js
store.insertCreated = true; 
store.namespaces.foo.insertCreated = true; 
```
