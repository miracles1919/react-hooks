import ReactDOM from 'react-dom';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';

const App = () => (
  <div>
    <Demo1 />
    <br />
    <Demo2 />
    <br />
    <Demo3 />
  </div>
);

const container = document.getElementById('root');
ReactDOM.render(<App />, container);
