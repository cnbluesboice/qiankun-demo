import React, { useCallback, useEffect } from 'react';
import { List, Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Data_Map_Anchor_Text = {
  title: 'Data Map',
  subTitle_1: '地图展示路口point信息',
};

const PointMap: any[] = [
  {
    content:
      '1. 模块介绍：该模块主要是提供对数据库中map表的路口点位数据检索，展示点位附近200米区域的bag，frame，trip轨迹和数量，以及在地图上的路口名称等信息；',
  },
  {
    content: '2. 菜单功能：右键point，支持如下功能：',
    children: [
      {
        content: <Col>{`a. 显示/隐藏frames;`}</Col>,
      },
      {
        content: <Col>{`b. 显示/隐藏trip;`}</Col>,
      },
      {
        content: <Col>{`c. 显示/隐藏polygon;`}</Col>,
      },
      {
        content: <Col>{`d. 显示map info信息;`}</Col>,
        image: '/images/doc/DataMapPointMap.png',
      },
    ],
  },
  {
    content: '2. Element 查询',
    children: [
      {
        content: <Col>{`a. 展示当前dataset中element的字段信息;`}</Col>,
        image: '/images/doc/DataPoolRes.png',
      },
    ],
  },
];

const Data_Map_Anchor_Config = [
  {
    key: Data_Map_Anchor_Text.title,
    href: `#${Data_Map_Anchor_Text.title}`,
    title: Data_Map_Anchor_Text.title,
    children: [
      {
        key: '1',
        href: `#${Data_Map_Anchor_Text.subTitle_1}`,
        title: Data_Map_Anchor_Text.subTitle_1,
      },
    ],
  },
];

const DataMapDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Data_Map_Anchor_Config);
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
        title: Data_Map_Anchor_Text.subTitle_1,
        content: ItemDom(PointMap),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Data_Map_Anchor_Text.title}>
        {Data_Map_Anchor_Text.title}
        <Link className={styles.Document__Link} to={`${window.location.origin}/view/dataMap`}>
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

export { DataMapDocView };
