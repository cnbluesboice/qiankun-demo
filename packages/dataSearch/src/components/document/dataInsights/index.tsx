import React, { useCallback, useEffect } from 'react';
import { List, Card, Image, Col } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Data_Insights_Anchor_Text = {
  title: 'Data Insights',
  subTitle_0: '数据总览Data Overview',
  subTitle_1: '数据工厂Data Factory',
  subTitle_2: '数据轨迹Data Trajectory',
};

const Overview: any[] = [
  {
    content: '1. 概览',
    children: [
      {
        content: '展示数据库中所有采集，解析，tagging，送标的各项指标；如下图：',
        image: '/images/doc/InsightOverviewSum.png',
      },
    ],
  },
  {
    content: '2. 趋势',
    children: [
      {
        content:
          '展示当日或截止至当日的统计数据指标；可选择查看bag，frame，clip，image等；默认展示bag，如下图：',
        image: '/images/doc/InsightOverviewGraph.png',
      },
      {
        content: '可点击右侧总体数据的 ’查看分布‘ 按钮，查看指标的分布图，如下图：',
        image: '/images/doc/InsightOverviewCheckDistribution.png',
      },
    ],
  },
];

const Factory: any[] = [
  {
    content:
      '模块介绍：该模块主要是对上盘数据的解析/tagging/atl等flow的进度，及其总数和所占百分比进行可视化展示；',
  },
  {
    content: '1. 生产',
    children: [
      {
        content:
          '支持查看当前字段的详情，且右上角提供“查看总计”按钮，支持查看当前数据库中上盘解析进度的总数和百分比；',
        image: '/images/doc/InsightFactoryProductList.png',
      },
      {
        image: '/images/doc/InsightFactoryProductTotal.png',
      },
    ],
  },
  {
    content: '2. 监控',
    children: [
      {
        content:
          '对折线图-图例中的各项指标的变化趋势进行可视化，并统计各指标的平均值用于分析指标性能，如下图：',
        image: '/images/doc/InsightFactoryMonitor.png',
      },
    ],
  },
];

const Trajectory: any[] = [
  {
    content: '1. 模块简介',
    children: [
      {
        content: (
          <Col>
            {`a. 模块介绍：该模块主要功能是用来查询 “车端原始数据” 和 “解析之后的数据” 以 “轨迹地图”
            和 “聚合点位图” 两种可视化形式展示，默认展示解析之后的数据轨迹；`}
          </Col>
        ),
      },
      {
        content: <Col>{`b. 轨迹图含义：可表示demo car在道路上行驶的轨迹；`}</Col>,
      },
      {
        content: <Col>{`c. 聚合点位图：可表示demo car在当前路段行驶过的频次；`}</Col>,
      },
      {
        content: (
          <Col>
            {`d.
            聚合点位图数值含义：表示对应的比例尺下，以当前点位为中心，周围的pose点聚合起来的数量；`}
          </Col>
        ),
      },
      {
        content: (
          <Col>{`e. 地图工具：比例尺，缩放按钮（用户可手指触控板进行手动缩放），缩略区域；`}</Col>
        ),
      },
    ],
  },
  {
    content: '2. 解析入库',
    children: [
      {
        content: <Col>{`a. 查询条件有：车牌（多选），时间区间`}</Col>,
      },
      {
        content: (
          <Col>{`b. 轨迹图：展示的数据轨迹条数以车牌为维度进行区分，每条轨迹颜色不同；`}</Col>
        ),
        image: '/images/doc/InsightsInputLineMap.png',
      },
      {
        content: <Col>{`c. 聚合点位图`}</Col>,
        image: '/images/doc/InsightsInputClusterMap.png',
      },
    ],
  },
  {
    content: '3. 车端采集',
    children: [
      {
        content: <Col>{`a. 查询条件有：车牌（多选），时间区间`}</Col>,
      },
      {
        content: (
          <Col>{`b. 轨迹图：展示的数据轨迹条数以车牌为维度进行区分，每条轨迹颜色不同；`}</Col>
        ),
        image: '/images/doc/InsightsCarLineMap.png',
      },
      {
        content: <Col>{`c. 聚合点位图`}</Col>,
        image: '/images/doc/InsightsCarClusterMap.png',
      },
    ],
  },
];

const Data_Insights_Anchor_Config = [
  {
    key: Data_Insights_Anchor_Text.title,
    href: `#${Data_Insights_Anchor_Text.title}`,
    title: Data_Insights_Anchor_Text.title,
    children: [
      {
        key: '0',
        href: `#${Data_Insights_Anchor_Text.subTitle_0}`,
        title: Data_Insights_Anchor_Text.subTitle_0,
      },
      {
        key: '1',
        href: `#${Data_Insights_Anchor_Text.subTitle_1}`,
        title: Data_Insights_Anchor_Text.subTitle_1,
      },
      {
        key: '2',
        href: `#${Data_Insights_Anchor_Text.subTitle_2}`,
        title: Data_Insights_Anchor_Text.subTitle_2,
      },
    ],
  },
];

const DataInsightsDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Data_Insights_Anchor_Config);
  }, []);

  const ItemDom = useCallback((data: any[]) => {
    const Dom = (itemData: any[]) => {
      return (
        <List
          split={false}
          dataSource={itemData}
          itemLayout="vertical"
          renderItem={(item: any) => (
            <List.Item>
              <>
                {item.content && <div>{item.content}</div>}
                {item.image && <Image width={900} src={item.image} alt="image" />}
                {item.children && Dom(item.children)}
              </>
            </List.Item>
          )}
        />
      );
    };
    return Dom(data);
  }, []);

  const getlistDom = useCallback(() => {
    return [
      {
        title: Data_Insights_Anchor_Text.subTitle_0,
        content: ItemDom(Overview),
      },
      {
        title: Data_Insights_Anchor_Text.subTitle_1,
        content: ItemDom(Factory),
      },
      {
        title: Data_Insights_Anchor_Text.subTitle_2,
        content: ItemDom(Trajectory),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Data_Insights_Anchor_Text.title}>
        {Data_Insights_Anchor_Text.title}
        <Link
          className={styles.Document__Link}
          to={`${window.location.origin}/view/operation/trajectory`}
        >
          <LinkOutlined />
        </Link>
      </h3>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={getlistDom()}
        renderItem={(item: any) => (
          <List.Item>
            <Card title={<span id={item.title}>{item.title}</span>}>{item.content}</Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export { DataInsightsDocView };
