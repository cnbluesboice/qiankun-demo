import store from './store'

const microApps = [
  {
    name: 'sub-react',
    entry: process.env.REACT_APP_SUB_REACT,
    activeRule: '/sub-react'
  },
  // {
  //   name: 'sub-next',
  //   entry: process.env.REACT_APP_SUB_NEXT,
  //   activeRule: '/sub-next'
  // },
  {
    name: 'sub-react1',
    entry: process.env.REACT_APP_SUB_REACT1,
    activeRule: '/sub-react1'
  },
  // {
  //   name: 'sub-react-vite',
  //   entry: process.env.REACT_APP_SUB_REACT_VITE,
  //   activeRule: '/sub-react-vite'
  // },
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
