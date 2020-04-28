Auth store implement feathers-authentication module on the client side for mobx.

### setup

```js
import { createAuthStore } from 'feathers-mobx';

createAuthStore(feathers, {
  idField: '_id', // default 'id'
  userService: 'users', // default 'users'
  entityField: 'user', // default 'user'
});
```

### observable

```js
{
  accessToken,
  payload,
  user,
  isAuthenticatePending,
  isLogoutPending,
  errorOnAuthenticate,
  errorOnLogout,
}
```

#### accessToken

- access token stored on local storage or provided during the authentication

#### payload

- payload of the authentication

#### user

- current logged user populated during the authentication

#### isAuthenticatePending

- `true` if authentication is loading

#### isLogoutPending

- `true` if logout is loading

#### errorOnAuthenticate

- provided if an error is catched during authentication

#### errorOnLogout

- provided if an error is catched during logout

### actions

```js
{
  authenticate,
  reAuthenticate,
  logout,
  clearAll,
  clearPending,
  clearError,
}
```


#### authenticate({ strategy, username, password })

- call `feathers.authenticate()`
- populate user

#### reAuthenticate({ strategy, username, password })

- similar to authenticate but call `feathers.reAuthenticate()`

#### logout()

- call `feathers.logout()`

#### clearAll()

- reset `accessToken`, `payload` and `user` to `false`  
- call `clearPending` and `clearError`

#### clearPending

- reset `isAuthenticatePending` and `isLogoutPending` to `false`

#### clearError

- reset `errorOnAuthenticate` and `errorOnLogout` to `null`
