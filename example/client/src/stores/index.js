import {
  createServiceStore,
  createAuthStore,
} from 'feathers-mobx';

import feathers from '../feathers';

const options = {};

export default {
  todoStore: createServiceStore(feathers, 'todos', options),
  userStore: createServiceStore(feathers, 'users', options),
  authStore: createAuthStore(feathers, options),
};