import React from 'react';
import { Provider, observer } from 'mobx-react';

import Todos from './components/Todos';

import stores from './stores';

const App = () => {
  return (
    <Provider {...stores}>
      <Todos />
    </Provider>
  );
};

export default observer(App);
