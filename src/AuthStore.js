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
    this.idField = options.idField || this.idField;
    this.userService = options.userService || this.userService;
    this.entityField = options.entityField || this.entityField;
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
  
    let user = data[this.entityField];
  
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
      this.isAuthenticatePending = true;
      this.authenticateHandler(
        await this.app.authenticate(data)
      );
    } catch (error) {
      this.errorOnAuthenticate = error;
    } finally {
      this.isAuthenticatePending = false;
    }
  }

  @action
  async reAuthenticate(data) {
    try {
      this.isAuthenticatePending = true;
      this.authenticateHandler(
        await this.app.reAuthenticate(data)
      );
    } catch (error) {
      this.errorOnAuthenticate = error;
    } finally {
      this.isAuthenticatePending = false;
    }
  }

  @action
  async logout(ids, params) {
    try {
      this.isLogoutPending = true;
      await this.app.logout();
      this.clearAll();
    } catch (error) {
      this.errorOnLogout = error;
    } finally {
      this.isLogoutPending = false;
    }
  }
}