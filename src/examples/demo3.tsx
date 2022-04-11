import React from 'react';
import { withHooks, useEffect, useState } from '..';

const Demo = withHooks(function Demo(props) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    console.log('init');
  }, []);

  useEffect(() => {
    console.log('num change', num);

    // 背景颜色会闪烁一下（加个定时为了明显一点）
    const el = document.getElementById('demo3') as HTMLElement;
    setTimeout(() => {
      el.style.backgroundColor = 'lightyellow';
    }, 100);

    return () => {
      el.style.backgroundColor = '#fff';
    };
  }, [num]);
  return (
    <div>
      <div id='demo3'>
        num: {num} <button onClick={() => setNum(num + 1)}>button</button>
      </div>
    </div>
  );
});

export default Demo;
