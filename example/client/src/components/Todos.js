import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import useStores from '../hooks/useStores';

export default observer(() => {
  const { todoStore } = useStores();

  useEffect(() => {
    todoStore.find();
  }, []);

  return (
    <div>
      <div>{todoStore.isFindPending ? 'loading...' : 'hello world' }</div>
      <div>{todoStore.errorOnFind?.message}</div>
      {todoStore.items?.map(todo => 
        <div className="todo">
          {todo.name}
        </div>
      )}
    </div>
  );
});