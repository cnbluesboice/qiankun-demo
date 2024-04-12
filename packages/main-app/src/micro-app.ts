import store from './store'

const microApps = [
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-react'
  },
  {
    name: 'sub-react1',
    entry: process.env.REACT_APP_SUB_REACT,
    activeRule: '/sub-react1'
  },
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
