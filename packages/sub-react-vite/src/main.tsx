import React from 'react'
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

export async function bootstrap() {
  console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mount(props: any) {
  console.log('基座下发的能力：', props);

  // 可通过 props.getGlobalState() 获取基座下发的数据

  // props.setGlobalState({user: {name: ''}}) 改变全局的数据

  // props.onGlobalStateChange 监听全局数据的变化
  // render();
  ReactDOM.render(<App />, props.container);
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function update(props: any) {
  console.log('update props', props);
}
