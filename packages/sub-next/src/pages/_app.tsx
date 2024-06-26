import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactDOM from 'react-dom';

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return null;
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
// export async function bootstrap() {
//   console.log('react app bootstraped');
// }
// /**
//  * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
//  */
// export async function mount(props: any) {
//   console.log('基座下发的能力：', props);

//   // 可通过 props.getGlobalState() 获取基座下发的数据

//   // props.setGlobalState({user: {name: ''}}) 改变全局的数据

//   // props.onGlobalStateChange 监听全局数据的变化
//   // render();
//   // ReactDOM.render(<App />, props.container);
// }
// /**
//  * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
//  */
// export async function unmount() {
//   ReactDOM.unmountComponentAtNode(document.getElementById('__next') as HTMLElement);
// }
// /**
//  * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
//  */
// export async function update(props: any) {
//   console.log('update props', props);
// }
