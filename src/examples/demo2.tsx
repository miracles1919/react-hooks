import React from 'react';
import { withHooks, useState } from '..';

const Demo2 = withHooks(function Demo(props) {
  const [num, setNum] = useState(0);
  return (
    <div>
      <div>
        num: {num} <button onClick={() => setNum(num + 1)}>button</button>
      </div>
      <Child />
    </div>
  );
});

const Child = withHooks(function Child(props) {
  const [num, setNum] = useState(10);
  return (
    <div>
      <div>
        child num: {num} <button onClick={() => setNum(num + 1)}>button</button>
      </div>
    </div>
  );
});

export default Demo2;
