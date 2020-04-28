import ServiceStore from './ServiceStore';
import ServiceStore from './AuthStore';

export const createServiceStore = (feathers, name, options = {}) => {
  return new ServiceStore(feathers, name, options);
}

export const createAuthStore = (feathers, options = {}) => {
  return new ServiceStore(feathers, name, options);
}