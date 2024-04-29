import store from './store'

export enum Keys {
  DATA_SEARCH = '1',
  DATA_INSIGHTS = '2',
  DATA_OVERVIEW = '2-1',
  DATA_TRAJECTORY = '2-2',
  DATA_FACTORY = '2-3',
  WORKFLOW = '4',
  ANNOTATION = '6',
  DATA_COLLECTION = '5',
  DATA_POOL = '7',
  DATA_MAP = '8',
}

const microApps = [
  {
    key: Keys.DATA_SEARCH,
    name: 'dataSearch',
    entry: process.env.REACT_APP_SUB_REACT,
    activeRule: '/dataSearch'
  },
  {
    key: Keys.DATA_COLLECTION,
    name: 'dataCollection',
    entry: process.env.REACT_APP_SUB_REACT1,
    activeRule: '/dataCollection'
  },
]

const apps: any = {};
microApps.forEach(item => {
  apps[item.key] = {
    name: item.name,
    entry: item.entry,
    activeRule: item.activeRule,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
