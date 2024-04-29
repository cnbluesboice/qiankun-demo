import React, { useCallback, ReactNode } from 'react';
import './App.css';
import microApps, { Keys } from './micro-app';
// import { Link } from 'react-router-dom';
import {
  DatabaseOutlined,
  AreaChartOutlined,
  CarOutlined,
  DeploymentUnitOutlined,
  ImportOutlined,
  TableOutlined,
  HeatMapOutlined,
} from '@ant-design/icons';
import { removeSessionStorage } from '../src/utils';
import { BreadCrumbKey, SearchValueKey } from '../src/utils';
import { Layout, Menu, theme } from 'antd';
import { HeaderView } from './HeaderSearch';
import styles from './index.module.scss';

const { Content, Sider } = Layout;

const items2 = () => [
  {
    key: Keys.DATA_SEARCH,
    icon: React.createElement(DatabaseOutlined),
    label: <span>Data Search</span>,
  },
  {
    key: Keys.DATA_COLLECTION,
    icon: React.createElement(CarOutlined),
    label: <span>Data Collection</span>,
  },
  {
    key: Keys.DATA_POOL,
    icon: React.createElement(TableOutlined),
    label: <span>Data Pool</span>,
  },
  {
    key: Keys.DATA_MAP,
    icon: React.createElement(HeatMapOutlined),
    label: <span>Data Map</span>,
  },
  {
    key: Keys.DATA_INSIGHTS,
    icon: React.createElement(AreaChartOutlined),
    label: <span>Data Insights</span>,
    children: [
      {
        key: Keys.DATA_OVERVIEW,
        label: <span>Data Overview</span>,
      },
      {
        key: Keys.DATA_FACTORY,
        label: <span>Data Factory</span>,
      },
      {
        key: Keys.DATA_TRAJECTORY,
        label: <span>Data Trajectory</span>,
      },
    ],
  },
  {
    key: Keys.WORKFLOW,
    icon: React.createElement(DeploymentUnitOutlined),
    label: <span>Workflow</span>,
  },
  {
    key: Keys.ANNOTATION,
    icon: React.createElement(ImportOutlined),
    label: <span>Annotation</span>,
  },
];

type Props = {
  children?: ReactNode;
  title?: string;
  menuStatus: string;
  cookie: any;
};

function App({ children, title = 'HUIXI Data Platform', menuStatus, cookie }: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClick = useCallback((item: any) => {
    window.history.pushState(null, item.activeRule, item.activeRule);
  }, []);
  // console.log(microApps, 'microApps');
  return (
    <div className={styles.Main__Layout_container} data-testid="LayoutView">
      <Layout className={styles.Main__Layout_item}>
        <header>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="referrer" content="no-referrer" />
        </header>
        <HeaderView cookie={cookie} />
        <Layout style={{ display: 'flex' }}>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              data-testid="LayoutView_Menu"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['4']}
              selectedKeys={[menuStatus]}
              style={{ height: 'auto', borderRight: 0 }}
              items={items2()}
              triggerSubMenuAction="click"
              onClick={({key}) => {
                removeSessionStorage(BreadCrumbKey);
                removeSessionStorage(SearchValueKey);
                const cur_sub_app = microApps[key]
                handleClick(cur_sub_app);
              }}
            />
          </Sider>
          <Layout style={{ paddingLeft: '24px', flex: 1 }}>
            <Content
              style={{
                padding: '24px 24px 0',
                boxSizing: 'border-box',
                margin: 0,
                background: colorBgContainer,
              }}
            >
              <div id="subapp-viewport"></div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
