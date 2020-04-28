import { observable, action } from 'mobx';

export default class ServiceStore {

  service = undefined;
  name = undefined;
  idField = 'id';

  @observable items = [];
  @observable item;

  @observable pagination = {
    items: [],
    limit: 0,
    skip: 0,
    total: 0,
  };

  @observable isFindPending = false;
  @observable isGetPending = false;
  @observable isCreatePending = false;
  @observable isUpdatePending = false;
  @observable isPatchPending = false;
  @observable isRemovePending = false;

  @observable errorOnFind;
  @observable errorOnGet;
  @observable errorOnCreate;
  @observable errorOnUpdate;
  @observable errorOnPatch;
  @observable errorOnRemove;

  constructor(feathers, name) {
    this.name = name;
    this.service = feathers.service(name);
    // if service has socket
    this.handleEvents();
  }

  handleEvents() {
    this.service.on('created', item => {
      console.log('created');
    });
    this.service.on('updated', item => {handleEvents
      console.log('updated');
    });
    this.service.on('patched', item => {
      console.log('patched');
    });
    this.service.on('removed', item => {
      console.log('removed');
    });
  }

  setItems(items) {
    if (items.total) {
      this.pagination.items = items.data;
      this.pagination.limit = items.limit;
      this.pagination.skip = items.skip;
      this.pagination.total = items.total;
    }
    this.items = {
      ...items,
      ...(this.items.filter((item) => 
        items.find(i => i[this.idField] === item[this.idField])
      )),
    };
  }

  setItem(item) {
    this.item = item;
  }

  patchItems(items) {
    this.setItems(items);
    // update single item
  }

  removeItems(items) {
    this.items = {
      ...(this.items.filter((item) => 
        items.find(i => i[this.idField] === item[this.idField])
      )),
    };
    // update single item
  }

  @action.bound
  clearPending() {
    this.isFindPending = false;
    this.isGetPending = false;
    this.isCreatePending = false;
    this.isUpdatePending = false;
    this.isPatchPending = false;
    this.isRemovePending = false;
  }

  @action.bound
  clearErrors() {
    this.errorOnFind = null;
    this.errorOnGet = null;
    this.errorOnCreate = null;
    this.errorOnUpdate = null;
    this.errorOnPatch = null;
    this.errorOnRemove = null;
  }

  @action.bound
  clearData() {
    this.items = [];
    this.pagination = {
      items: [],
      limit: 0,
      skip: 0,
      total: 0,
    };
    this.item = undefined;
  }

  @action.bound
  clearAll() {
    this.clearData();
    this.clearErrors();
    this.clearPending();
  }

  @action
  async find(params) {
    try {
      this.isFindPending = true;
      const items = await this.service.find(params);
      this.setItems(items)
    } catch (error) {
      this.errorOnFind = error;
    } finally {
      this.isFindPending = false;
    }
  }

  @action
  async get(id, params) {
    try {
      this.isGetPending = true;
      const item = await this.service.get(id, params);
      this.setItem(item);
    } catch (error) {
      this.errorOnGet = error;
    } finally {
      this.isGetPending = false;
    }
  }

  @action
  async create(data, params) {
    try {
      // @todo multiple create handler
      this.isCreatePending = true;
      const item = await this.service.create(data, params);
      this.setItem(item)
    } catch (error) {
      this.errorOnCreate = error;
    } finally {
      this.isCreatePending = false;
    }
  }

  @action
  async update(ids, data, params) {
    try {
      this.isUpdatePending = true;
      const item = await this.service.update(data, params);
      this.patchItems(item);
    } catch (error) {
      this.errorOnUpdate = error;
    } finally {
      this.isUpdatePending = false;
    }
  }

  @action
  async patch(ids, data, params) {
    try {
      this.isPatchPending = true;
      const item = await this.service.patch(data, params);
      this.patchItems(item);
    } catch (error) {
      this.errorOnPatch = error;
    } finally {
      this.isPatchPending = false;
    }
  }

  @action
  async remove(ids, params) {
    try {
      this.isRemovePending = true;
      const items = await this.service.remove(ids);
      this.removeItems(items);
    } catch (error) {
      this.errorOnRemove = error;
    } finally {
      this.isRemovePending = false;
    }
  }
}