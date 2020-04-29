import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import useStores from '../hooks/useStores';

export default observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userStore, authStore } = useStores();

  useEffect(() => {
    authStore.authenticate();
  }, []);

  const resetFields = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    authStore.authenticate({ email, password, strategy: 'local' });
    resetFields();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    userStore.create({ email, password });
    resetFields();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    authStore.logout();
  };

  const loading = (
    userStore.isFindPending
    || authStore.isAuthenticatePending
    || authStore.isLogoutPending
  );

  return (
    <div className="auth">
      <div className="loading">{loading && 'loading...'}</div>
      {authStore.user ? (
        <div>
          Hi, {authStore.user?.email} 🤚
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <div className="auth--form">
          <div className="error">
            {authStore.errorOnAuthenticate?.message}
            {userStore.errorOnCreate?.message}
          </div>
          <input 
            value={email}
            onChange={event => setEmail(event.target.value)}
            name="email"
          />
          <input 
            value={password}
            onChange={event => setPassword(event.target.value)}
            name="password"
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleCreate}>Create an account</button>
        </div>
      )}
    </div>
  );
});