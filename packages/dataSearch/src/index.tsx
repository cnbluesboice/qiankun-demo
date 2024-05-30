import './public-path'
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.module.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// if (!(window as any)?.__POWERED_BY_QIANKUN__) {
//   render();
// }
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log('基座下发的能力：', props);
  // 可通过 props.getGlobalState() 获取基座下发的数据
  // props.setGlobalState({user: {name: ''}}) 改变全局的数据
  // props.onGlobalStateChange 监听全局数据的变化

  await props.onGlobalStateChange((state: any, prev: any) => {
    console.log(state, 'state000000');
    console.log(prev, 'prev111111');
    // state: 变更后的状态; prev: 变更前的状态
    const root = createRoot(props.container);
    root.render(<App {...state} />);
  });

  // const root = createRoot(props.container);
  // root.render(<App {...props} />);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLElement);
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  console.log('update props', props);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
