import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import { BrowserRouter as Router } from 'react-router-dom';
import { Keys } from './micro-app';
import microApps from './micro-app';

const apps: any[] = Object.values(microApps).map((item: any) => {
  return {
    ...item,
    // loader
  };
});

registerMicroApps(apps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name);
    return Promise.resolve();
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
});

start();
setDefaultMountApp('/dataSearch');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
    <App menuStatus={Keys.DATA_SEARCH} cookie={{}} />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
