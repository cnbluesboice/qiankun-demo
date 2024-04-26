import React, { useCallback, ReactNode } from 'react';
import './App.css';
import microApps from './micro-app';
import { Link } from 'react-router-dom';
import {
  DatabaseOutlined,
  FundViewOutlined,
  AreaChartOutlined,
  CarOutlined,
  DeploymentUnitOutlined,
  ImportOutlined,
  TableOutlined,
  HeatMapOutlined,
} from '@ant-design/icons';
import { removeSessionStorage } from 'common-tools';
import { BreadCrumbKey, SearchValueKey } from 'common-tools';
import { Layout, Menu, theme } from 'antd';
import { HeaderView } from './HeaderSearch';
import styles from './index.module.scss';

const { Content, Sider } = Layout;

export enum Keys {
  DATA_SEARCH = '1',
  DATA_INSIGHTS = '2',
  DATA_OVERVIEW = '2-1',
  DATA_TRAJECTORY = '2-2',
  DATA_FACTORY = '2-3',
  EVALUATION = '3',
  WORKFLOW = '4',
  ANNOTATION = '6',
  DATA_COLLECTION = '5',
  DATA_POOL = '7',
  DATA_MAP = '8',
  USER_SETTING = '9',
}

const items2 = () => [
  {
    key: Keys.DATA_SEARCH,
    icon: React.createElement(DatabaseOutlined),
    label: (
      <Link to="/">
        <span>Data Search</span>
      </Link>
    ),
  },
  {
    key: Keys.DATA_COLLECTION,
    icon: React.createElement(CarOutlined),
    label: (
      <Link to="/view/dataCollection">
        <span>Data Collection</span>
      </Link>
    ),
  },
  {
    key: Keys.DATA_POOL,
    icon: React.createElement(TableOutlined),
    label: (
      <Link to="/view/dataPool">
        <span>Data Pool</span>
      </Link>
    ),
  },
  {
    key: Keys.DATA_MAP,
    icon: React.createElement(HeatMapOutlined),
    label: (
      <Link to="/view/dataMap">
        <span>Data Map</span>
      </Link>
    ),
  },
  {
    key: Keys.DATA_INSIGHTS,
    icon: React.createElement(AreaChartOutlined),
    label: <span>Data Insights</span>,
    children: [
      {
        key: Keys.DATA_OVERVIEW,
        label: (
          <Link to="/view/operation/overview">
            <span>Data Overview</span>
          </Link>
        ),
      },
      {
        key: Keys.DATA_FACTORY,
        label: (
          <Link to="/view/operation/dataFactory">
            <span>Data Factory</span>
          </Link>
        ),
      },
      {
        key: Keys.DATA_TRAJECTORY,
        label: (
          <Link to="/view/operation/trajectory">
            <span>Data Trajectory</span>
          </Link>
        ),
      },
    ],
  },
  {
    key: Keys.WORKFLOW,
    icon: React.createElement(DeploymentUnitOutlined),
    label: (
      <Link to="/view/workflow">
        <span>Workflow</span>
      </Link>
    ),
  },
  {
    key: Keys.ANNOTATION,
    icon: React.createElement(ImportOutlined),
    label: (
      <Link to="/view/annotation">
        <span>Annotation</span>
      </Link>
    ),
  },
  {
    key: Keys.EVALUATION,
    icon: React.createElement(FundViewOutlined),
    label: (
      <Link to="/view/evaluation/evalset">
        <span>Evaluation</span>
      </Link>
    ),
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
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, item.activeRule, item.activeRule);
  }, []);
  console.log(microApps, 'microApps');
  return (
    // <div className="App">
    //   {microApps.map((item: any, index: number) => (
    //     <button key={index.toString()} onClick={() => handleClick(item)}>
    //       {item.name}
    //     </button>
    //   ))}
    //   <div id="subapp-viewport"></div>
    // </div>
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
              onClick={() => {
                removeSessionStorage(BreadCrumbKey);
                removeSessionStorage(SearchValueKey);
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
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
