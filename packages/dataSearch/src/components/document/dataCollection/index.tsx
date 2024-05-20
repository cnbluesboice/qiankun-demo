import React, { useCallback, useEffect } from 'react';
import { List, Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Data_Collection_Anchor_Text = {
  title: 'Data Collection',
  subTitle_1: '列表页',
  subTitle_2: '查看质检结果页',
};

const ListPage: any[] = [
  {
    content: '1. 列表项说明:',
    children: [
      {
        content: (
          <Col>{`a. need_manully_check项: 按钮有三种形态("查看质检结果", "质检中", "无法查看质检结果"), 只有"查看质检结果"时可点击；`}</Col>
        ),
      },
      {
        content: (
          <Col>{`b. file_status项: 点击查看按钮, 弹出弹框将file_status字段的值以JSON的形式进行展示;`}</Col>
        ),
      },
      {
        content: <Col>{`c. 其他项：直接展示该字段值，字段没有值则不展示;`}</Col>,
      },
    ],
  },
  {
    content:
      '2. 列表支持条件检索，根据colection_bag表的column字段精准查询;(若要查询可查看质检结果数据，查询条件可设置如下)',
    image: '/images/doc/DataCollectionSearch.png',
  },
  {
    content: '3. 检索条件：可选择表及表对应的字段进行检索，支持多个条件组合；',
  },
];

const ResultPage: any[] = [
  {
    content: '1. 质检结果资源展示: 包含视频和图片资源; 点击资源s3链接可查看;',
    image: '/images/doc/DataCollectionResult.png',
  },
  {
    content:
      '2. 更新质检结果；支持多选之后，点击更新按钮，更新成功之后弹出“更新成功！”的提示文案；',
    image: '/images/doc/DataCollectionResultUpdate.png',
  },
];

const Data_Collection_Anchor_Config = [
  {
    key: Data_Collection_Anchor_Text.title,
    href: `#${Data_Collection_Anchor_Text.title}`,
    title: Data_Collection_Anchor_Text.title,
    children: [
      {
        key: '1',
        href: `#${Data_Collection_Anchor_Text.subTitle_1}`,
        title: Data_Collection_Anchor_Text.subTitle_1,
      },
      {
        key: '2',
        href: `#${Data_Collection_Anchor_Text.subTitle_2}`,
        title: Data_Collection_Anchor_Text.subTitle_2,
      },
    ],
  },
];

const DataCollectionDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Data_Collection_Anchor_Config);
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
        title: Data_Collection_Anchor_Text.subTitle_1,
        content: ItemDom(ListPage),
      },
      {
        title: Data_Collection_Anchor_Text.subTitle_2,
        content: ItemDom(ResultPage),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Data_Collection_Anchor_Text.title}>
        {Data_Collection_Anchor_Text.title}
        <Link
          className={styles.Document__Link}
          to={`${window.location.origin}/view/dataCollection`}
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

export { DataCollectionDocView };
