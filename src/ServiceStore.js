import { observable, computed, action } from 'mobx';

export default class ServiceStore {
  service = undefined;
  name = undefined;
  idField = 'id';
  defaultNamespace = '__default__';

  @computed get items() {
    return this.namespaces[this.defaultNamespace].items;
  }

  @computed get item() {
    return this.namespaces[this.defaultNamespace].item;
  }

  @computed get pagination() {
    return this.namespaces[this.defaultNamespace].pagination;
  }

  @observable namespaces = {};

  @computed get isFindPending() {
    return this.namespaces[this.defaultNamespace].isFindPending;
  }

  @computed get isGetPending() {
    return this.namespaces[this.defaultNamespace].isGetPending;
  }

  @computed get isCreatePending() {
    return this.namespaces[this.defaultNamespace].isCreatePending;
  }

  @observable isUpdatePending = false;
  @observable isPatchPending = false;
  @observable isRemovePending = false;

  @computed get errorOnFind() {
    return this.namespaces[this.defaultNamespace].errorOnFind;
  }

  @computed get errorOnGet() {
    return this.namespaces[this.defaultNamespace].errorOnGet;
  }

  @computed get errorOnCreate() {
    return this.namespaces[this.defaultNamespace].errorOnCreate;
  }

  @observable errorOnUpdate;
  @observable errorOnPatch;
  @observable errorOnRemove;

  constructor(feathers, name, options) {
    this.name = name;
    this.service = feathers.service(name);
    this.idField = options.idField || this.idField;

    this.initializeNamespace(this.defaultNamespace);
    // if service has socket
    this.handleEvents();
  }

  initializeNamespace(name) {
    this.namespaces[name] = {
      items: [],
      item: undefined,
      pagination: {
        items: [],
        limit: 0,
        skip: 0,
        total: 0,
      },
      isFindPending: false,
      isGetPending: false,
      isCreatePending: false,
      errorOnFind: undefined,
      errorOnGet: undefined,
      errorOnCreate: undefined,
      insertCreated: false,
    };
  }

  clearNamespace(name) {
    this.namespaces[name] = undefined;
  }

  getNamespace(options = {}) {
    const ns = options.namespace || this.defaultNamespace;

    if (!this.namespaces[ns]) {
      this.initializeNamespace(ns);
    }

    return ns;
  }

  handleEvents() {
    this.service.on('created', (item) => {
      Object.keys(this.namespaces).map((key) => {
        if (this.namespaces[key].insertCreated) {
          this.setItems([item], { namespace: key });
        }
      });
    });
    this.service.on('updated', (item) => {
      this.updateItem(item);
    });
    this.service.on('patched', (item) => {
      this.updateItem(item);
    });
    this.service.on('removed', (item) => {
      this.removeItem(item);
    });
  }

  setItems(data, options = {}) {
    const ns = this.getNamespace(options);

    if (data.total) {
      this.namespaces[ns].pagination.items = data.data;
      this.namespaces[ns].pagination.limit = data.limit;
      this.namespaces[ns].pagination.skip = data.skip;
      this.namespaces[ns].pagination.total = data.total;
      data = data.data;
    }

    this.namespaces[ns].items = [
      ...this.namespaces[ns].items.filter(
        (item) => !data.find((i) => i[this.idField] === item[this.idField])
      ),
      ...data,
    ];
  }

  updateItem(item) {
    Object.keys(this.namespaces).map((ns) => {
      if (this.namespaces[ns].item?.[this.idField] === item[this.idField]) {
        this.namespaces[ns].item = item;
      }
      this.namespaces[ns].items = this.namespaces[ns].items.map((i) => {
        return i[this.idField] === item[this.idField] ? item : i;
      });
    });
  }

  setItem(item, options = {}) {
    const ns = this.getNamespace(options);

    this.namespaces[ns].item = item;
  }

  removeItem(item) {
    Object.keys(this.namespaces).map((ns) => {
      if (this.namespaces[ns].item?.[this.idField] === item[this.idField]) {
        this.namespaces[ns].item = undefined;
      }
      this.namespaces[ns].items = this.namespaces[ns].items.filter(
        (i) => i[this.idField] !== item[this.idField]
      );
    });
  }

  @action.bound
  clearPending(options = {}) {
    const ns = this.getNamespace(options);

    this.namespaces[ns].isFindPending = false;
    this.namespaces[ns].isGetPending = false;
    this.namespaces[ns].isCreatePending = false;

    if (ns === this.defaultNamespace) {
      this.isUpdatePending = false;
      this.isPatchPending = false;
      this.isRemovePending = false;
    }
  }

  @action.bound
  clearErrors(options = {}) {
    const ns = this.getNamespace(options);

    this.namespaces[ns].errorOnFind = null;
    this.namespaces[ns].errorOnGet = null;
    this.namespaces[ns].errorOnCreate = null;

    if (ns === this.defaultNamespace) {
      this.errorOnUpdate = null;
      this.errorOnPatch = null;
      this.errorOnRemove = null;
    }
  }

  @action.bound
  clearData(options = {}) {
    const ns = this.getNamespace(options);

    this.namespaces[ns].items = [];
    this.namespaces[ns].pagination = {
      items: [],
      limit: 0,
      skip: 0,
      total: 0,
    };
    this.namespaces[ns].item = undefined;
  }

  @action.bound
  clearAll() {
    this.clearData();
    this.clearErrors();
    this.clearPending();
  }

  @action
  async find(options) {
    const ns = this.getNamespace(options);

    try {
      this.namespaces[ns].isFindPending = true;
      const items = await this.service.find(options);
      this.setItems(items, options);
    } catch (error) {
      this.namespaces[ns].errorOnFind = error;
    } finally {
      this.namespaces[ns].isFindPending = false;
    }
  }

  @action
  async get(id, options) {
    const ns = this.getNamespace(options);

    try {
      this.namespaces[ns].isGetPending = true;
      const item = await this.service.get(id, options);
      this.setItem(item, options);
    } catch (error) {
      this.namespaces[ns].errorOnGet = error;
    } finally {
      this.namespaces[ns].isGetPending = false;
    }
  }

  @action
  async create(data, options) {
    const ns = this.getNamespace(options);

    try {
      this.namespaces[ns].isCreatePending = true;
      const item = await this.service.create(data, options);
      this.setItem(item, options);
    } catch (error) {
      this.namespaces[ns].errorOnCreate = error;
    } finally {
      this.namespaces[ns].isCreatePending = false;
    }
  }

  @action
  async update(id, data, params) {
    try {
      this.isUpdatePending = true;
      const item = await this.service.update(id, data, params);
      this.updateItem(item);
    } catch (error) {
      this.errorOnUpdate = error;
    } finally {
      this.isUpdatePending = false;
    }
  }

  @action
  async patch(id, data, params) {
    try {
      this.isPatchPending = true;
      const item = await this.service.patch(id, data, params);
      this.updateItem(item);
    } catch (error) {
      this.errorOnPatch = error;
    } finally {
      this.isPatchPending = false;
    }
  }

  @action
  async remove(id, params) {
    try {
      this.isRemovePending = true;
      const item = await this.service.remove(id);
      this.removeItem(item);
    } catch (error) {
      this.errorOnRemove = error;
    } finally {
      this.isRemovePending = false;
    }
  }
}
