import React, { useCallback, useEffect } from 'react';
import { List, Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Data_Search_Anchor_Text = {
  title: 'Data Search',
  subTitle_1: '检索页',
  subTitle_2: '检索结果详情页',
  subTitle_3: '创建数据集',
  subTitle_4: '点云2d可视化',
  subTitle_5: '多模态检索',
};

const HomePage: any[] = [
  {
    content: '1. 模块介绍：该模块主要是提供对象检索，及检索结果可视化；',
  },
  {
    content:
      '2. 检索对象: 目前包括Bag, BagFile, Calib, Dataset, DatasetElement, Flow, Frame, Image, LidarPointcloud, Pose;',
  },
  {
    content: '3. 检索条件：可选择表及表对应的字段进行检索，支持多个条件组合；',
    image: '/images/doc/HomePage.png',
  },
];

const DetailPage: any[] = [
  {
    content: '1. 模块介绍：该模块主要是提供对象检索，及检索结果可视化；',
    children: [
      {
        content: <Col>a. 图片播放: bag, frame(播放时携带点云2D数据)</Col>,
      },
      {
        content: <Col>b. 单个图片展示: image</Col>,
      },
      {
        content: <Col>c. 视频播放: bag_file</Col>,
      },
      {
        content: <Col>d. json数据格式展示: calib</Col>,
      },
      {
        content: <Col>e. 其他：直接展示详情字段信息</Col>,
      },
    ],
  },
];

const CreateDataset: any[] = [
  {
    content: '1. 用户勾选Checkbox, 点击右上角 "Create Dataset" 按钮，即可创建数据集',
    image: '/images/doc/CreateDataset.png',
  },
];

const Lidar2D: any[] = [
  {
    content: '1. 预览图展示',
    image: '/images/doc/Lidar2DRes.png',
  },
  {
    content: '2. 支持预览查看大图，且可放大和缩小图片，放大可查看细节',
    image: '/images/doc/Lidar2D_preview.png',
  },
  {
    content: '3. 图片播放支持点云2D同步播放',
    image: '/images/doc/Lidar2D_play.png',
  },
];

const MultiSearch: any[] = [
  {
    content: '目前支持图片和文本查询二选一，当图片和文本同时传入则优先文本检索；',
  },
  {
    content: '1. 文本',
    image: '/images/doc/MultiSearch_text.png',
  },
  {
    content: '2. 图片',
    image: '/images/doc/MultiSearch_image.png',
  },
];

const Data_Search_Anchor_Config = [
  {
    key: Data_Search_Anchor_Text.title,
    href: `#${Data_Search_Anchor_Text.title}`,
    title: Data_Search_Anchor_Text.title,
    children: [
      {
        key: '1',
        href: `#${Data_Search_Anchor_Text.subTitle_1}`,
        title: Data_Search_Anchor_Text.subTitle_1,
      },
      {
        key: '2',
        href: `#${Data_Search_Anchor_Text.subTitle_2}`,
        title: Data_Search_Anchor_Text.subTitle_2,
      },
      {
        key: '3',
        href: `#${Data_Search_Anchor_Text.subTitle_3}`,
        title: Data_Search_Anchor_Text.subTitle_3,
      },
      {
        key: '4',
        href: `#${Data_Search_Anchor_Text.subTitle_4}`,
        title: Data_Search_Anchor_Text.subTitle_4,
      },
      {
        key: '5',
        href: `#${Data_Search_Anchor_Text.subTitle_5}`,
        title: Data_Search_Anchor_Text.subTitle_5,
      },
    ],
  },
];

const DataSearchDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Data_Search_Anchor_Config);
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
        title: Data_Search_Anchor_Text.subTitle_1,
        content: ItemDom(HomePage),
      },
      {
        title: Data_Search_Anchor_Text.subTitle_2,
        content: ItemDom(DetailPage),
      },
      {
        title: Data_Search_Anchor_Text.subTitle_3,
        content: ItemDom(CreateDataset),
      },
      {
        title: Data_Search_Anchor_Text.subTitle_4,
        content: ItemDom(Lidar2D),
      },
      {
        title: Data_Search_Anchor_Text.subTitle_5,
        content: ItemDom(MultiSearch),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Data_Search_Anchor_Text.title}>
        {Data_Search_Anchor_Text.title}
        <Link className={styles.Document__Link} to={`${window.location.origin}/`}>
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

export { DataSearchDocView };
