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

#### items

- ...

#### item

- ...

#### pagination

- ...

#### is<Method>Pending

- ...

#### errorOn<Method>

- ...

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

- ...

#### get(id, params)

- ...

#### create(data, params)

- ...

#### update(data, params)

- ...

#### patch(data, params)

- ...


#### remove(data, params)

- ...

#### clearData

- reset `items`, `item` and `pagination` to `null`

#### clearPending

- reset all pending observables to `false`

#### clearError

- reset all error observables to `null`
