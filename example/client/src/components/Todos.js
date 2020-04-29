import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import useStores from '../hooks/useStores';

export default observer(() => {
  const { todoStore } = useStores();
  const [name, setName] = useState('');

  useEffect(() => {
    todoStore.find();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (name) {
      todoStore.create({ name });
      setName('');
    }
  }

  return (
    <div className="todos">
      <div className="todos--create">
        <input 
          value={name}
          onChange={e => setName(e.target.value)}
          name="text"
          placeholder="write task..."
        />
        <button onClick={handleCreate}>create</button>
      </div>
      <div className="todos--list">
        <div>{todoStore.isFindPending && 'loading...'}</div>
        <div>{todoStore.errorOnFind?.message}</div>
        {todoStore.items?.map(todo => 
          <div className="todo" key={todo.id}>
            {todo.name}
          </div>
        )}
      </div>
    </div>
  );
});