import React from 'react';
import { withHooks, useState } from '..';

const Demo1 = withHooks(function Demo(props) {
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState<number>(1);
  return (
    <div>
      <div>
        num: {num} <button onClick={() => setNum(num + 1)}>button</button>
      </div>
      <div>
        num * 2: {num2}{' '}
        <button onClick={() => setNum2((val) => val * 2)}>button 2</button>
      </div>
      <button
        onClick={() => {
          setNum(num + 1);
          setNum2(num2 * 2);
        }}
      >
        triggle all
      </button>
    </div>
  );
});

export default Demo1;
