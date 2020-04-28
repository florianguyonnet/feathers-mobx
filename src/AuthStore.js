import { observable, action } from 'mobx';

export default class ServiceStore {

  app = undefined;
  idField = 'id';
  userService = 'users';
  entityField = 'user';

  @observable accessToken;
  @observable payload;
  @observable user;

  @observable isAuthenticatePending = false;
  @observable isLogoutPending = false;

  @observable errorOnAuthenticate;
  @observable errorOnLogout;

  constructor(app, options) {
    this.app = app;
    this.idField = options.idField;
    this.userService = options.userService;
    this.entityField = options.entityField;
  }

  @action.bound
  clearPending() {
    this.isAuthenticatePending = false;
    this.isLogoutPending = false;
  }

  @action.bound
  clearErrors() {
    this.errorOnAuthenticate = null;
    this.errorOnLogout = null;
  }

  @action.bound
  clearData() {
    this.user = null;
    this.payload = null;
    this.user = null;
  }

  @action.bound
  clearAll() {
    this.clearData();
    this.clearErrors();
    this.clearPending();
  }

  async getUser(userId) {
    return await this.app.service(this.userService).get(userId)
  }
  
  async authenticateHandler(data) {
    this.accessToken = data.accessToken;
    this.payload = data;

    let user = data[entityField];
    
    if (user) {
      this.user = user;
    } else if (
      this.userService
      && data.hasOwnProperty(this.idField)
    ) {
      this.user = await this.getUser(data[this.idField]);
    }
  }

  @action
  async authenticate(data) {
    try {
      this.isFindPending = true;
      this.authenticateHandler(
        await this.app.authenticate(data)
      );
    } catch (error) {
      this.errorOnFind = error;
    } finally {
      this.isFindPending = false;
    }
  }

  @action
  async reAuthenticate(params) {
    try {
      this.isFindPending = true;
      this.authenticateHandler(
        await this.app.reAuthenticate(data)
      );
    } catch (error) {
      this.errorOnFind = error;
    } finally {
      this.isFindPending = false;
    }
  }

  @action
  async logout(ids, params) {
    try {
      this.isLogoutPending = true;
      await this.app.logout();
      this
    } catch (error) {
      this.errorOnLogout = error;
    } finally {
      this.isLogoutPending = false;
    }
  }
}