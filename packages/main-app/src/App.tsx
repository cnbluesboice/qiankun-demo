import React, { useCallback } from 'react';
import './App.css';
import microApps from './micro-app';
// import { useNavigate } from 'react-router-dom';

function App() {
  // const navigate = useNavigate();

  const handleClick = useCallback(
    (item: any) => {
      // navigate(item.activeRule);
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, item.activeRule, item.activeRule)
    },
    []
  );
    console.log(microApps, 'microApps');
  return (
    <div className="App">
      {microApps.map((item: any, index: number) => (
        <button key={index.toString()} onClick={() => handleClick(item)}>{item.name}</button>
      ))}
      <div id="subapp-viewport"></div>
    </div>
  );
}

export default App;
