import React, { useCallback, useEffect } from 'react';
import { List, Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Data_Pool_Anchor_Text = {
  title: 'Data Pool',
  subTitle_1: '数据池list',
  subTitle_2: '添加数据',
};

const ListPage: any[] = [
  {
    content: '列表分为“Pool查询”和“Element查询”两个部分：',
  },
  {
    content: '1. Pool查询',
    children: [
      {
        content: <Col>{`a. “Status Code”部分根据data status的枚举进行数量汇总展示;`}</Col>,
      },
      {
        content: <Col>{`b.   2. “Pool Info”部分展示当前dataset的info;`}</Col>,
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

const AddData: any[] = [
  {
    content: '1. 在进行pool查询之后, “add data”按钮可被点击, 初始状态为禁用状态;',
    image: '/images/doc/DataPoolInit.png',
  },
  {
    content: '2. 在添加数据时, 先选择data type, 选择后用户自定义输入相应的数据字段, 图示如下：',
    image: '/images/doc/DataPoolAddType.png',
  },
  {
    image: '/images/doc/DataPoolAddKey.png',
  },
  {
    content: '填写完成后点击”Ok“按钮;',
  },
];

const Data_Pool_Anchor_Config = [
  {
    key: Data_Pool_Anchor_Text.title,
    href: `#${Data_Pool_Anchor_Text.title}`,
    title: Data_Pool_Anchor_Text.title,
    children: [
      {
        key: '1',
        href: `#${Data_Pool_Anchor_Text.subTitle_1}`,
        title: Data_Pool_Anchor_Text.subTitle_1,
      },
      {
        key: '2',
        href: `#${Data_Pool_Anchor_Text.subTitle_2}`,
        title: Data_Pool_Anchor_Text.subTitle_2,
      },
    ],
  },
];

const DataPoolDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Data_Pool_Anchor_Config);
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
        title: Data_Pool_Anchor_Text.subTitle_1,
        content: ItemDom(ListPage),
      },
      {
        title: Data_Pool_Anchor_Text.subTitle_2,
        content: ItemDom(AddData),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Data_Pool_Anchor_Text.title}>
        {Data_Pool_Anchor_Text.title}
        <Link className={styles.Document__Link} to={`${window.location.origin}/view/dataPool`}>
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

export { DataPoolDocView };
