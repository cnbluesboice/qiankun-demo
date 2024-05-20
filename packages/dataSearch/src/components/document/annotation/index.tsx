import React, { useCallback, useEffect } from 'react';
import { List, Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Annotation_Anchor_Text = {
  title: 'Annotation',
  subTitle_2: '送标任务',
};

const Annotation: any[] = [
  {
    content: '1. 查询条件：支持条件检索，根据表的column字段精准查询；',
    image: '/images/doc/AnnotationSearch.png',
  },
  {
    content: '2. 列表项',
    children: [
      {
        content: <Col>a. id项：点击列表项id跳转至argo workflow详情页查看任务详情；</Col>,
      },
      {
        content: (
          <Col>{`b. dataset_name项：点击列表项dataset_name跳转至dataset列表页，可查看当前的dataset list；`}</Col>
        ),
      },
      {
        content: <Col>{`c. anno_doc_name项：点击列表项anno_doc_name跳转查看当前的标注文档；`}</Col>,
      },
      {
        content: <Col>{`d. 其他项：直接展示字段值，若无则不展示；`}</Col>,
      },
    ],
  },
];

const Annotation_Anchor_Config = [
  {
    key: Annotation_Anchor_Text.title,
    href: `#${Annotation_Anchor_Text.title}`,
    title: Annotation_Anchor_Text.title,
    children: [
      {
        key: '1',
        href: `#${Annotation_Anchor_Text.subTitle_2}`,
        title: Annotation_Anchor_Text.subTitle_2,
      },
    ],
  },
];

const AnnotationDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Annotation_Anchor_Config);
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
        title: Annotation_Anchor_Text.subTitle_2,
        content: ItemDom(Annotation),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Annotation_Anchor_Text.title}>
        {Annotation_Anchor_Text.title}
        <Link className={styles.Document__Link} to={`${window.location.origin}/view/annotation`}>
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

export { AnnotationDocView };
