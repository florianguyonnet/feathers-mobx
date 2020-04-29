import React from 'react';
import { Provider, observer } from 'mobx-react';

import Todos from './components/Todos';
import Account from './components/Account';

import stores from './stores';

import './App.css';

const App = () => {
  return (
    <Provider {...stores}>
      <div className="app">
        <Account />
        <Todos />
      </div>
    </Provider>
  );
};

export default observer(App);
