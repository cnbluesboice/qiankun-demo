import React, { useCallback, useEffect } from 'react';
import { List, Card, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface DocProps {
  getAnchorItems: (a: any[]) => void;
}

const Workflow_Anchor_Text = {
  title: 'Workflow',
  subTitle_1: '任务总览',
  subTitle_2: '创建workflow',
};

const Workflow: any[] = [
  {
    content: '1. 查询条件：支持条件检索，根据表的column字段精准查询；',
    image: '/images/doc/WorkflowSearch.png',
  },
  {
    content: '2. 列表项',
    children: [
      {
        content: <Col>a. name项：点击列表项name跳转至argo workflow详情页查看任务详情；</Col>,
      },
      {
        content: <Col>b. 其他项：直接展示字段值，若无则不展示；</Col>,
        image: '/images/doc/WorkflowList.png',
      },
    ],
  },
];

const CreateWorkflow: any[] = [
  {
    content: '1. 在workflow页面点击“创建workflow”按钮，弹出弹框，可编辑code，如下：',
    image: '/images/doc/CreateWorkflow.png',
  },
  {
    content: '2. 编辑完之后，点击“保存”按钮，若创建成功，则弹出“创建成功！”的提示信息，如下：',
    image: '/images/doc/CreateWorkflowInfo.png',
  },
  {
    content:
      '3. 查看当前登录用户数据按钮,进入页面默认展示当前登录用户数据，取消“只看我的”勾选之后，可查看所有用户数据；',
    image: '/images/doc/WorkflowSeeMine.png',
  },
];

const Workflow_Anchor_Config = [
  {
    key: Workflow_Anchor_Text.title,
    href: `#${Workflow_Anchor_Text.title}`,
    title: Workflow_Anchor_Text.title,
    children: [
      {
        key: '1',
        href: `#${Workflow_Anchor_Text.subTitle_1}`,
        title: Workflow_Anchor_Text.subTitle_1,
      },
      {
        key: '2',
        href: `#${Workflow_Anchor_Text.subTitle_2}`,
        title: Workflow_Anchor_Text.subTitle_2,
      },
    ],
  },
];

const WorkflowDocView: React.FC<DocProps> = ({ getAnchorItems }) => {
  useEffect(() => {
    getAnchorItems(Workflow_Anchor_Config);
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
        title: Workflow_Anchor_Text.subTitle_1,
        content: ItemDom(Workflow),
      },
      {
        title: Workflow_Anchor_Text.subTitle_2,
        content: ItemDom(CreateWorkflow),
      },
    ];
  }, []);

  return (
    <div>
      <h3 id={Workflow_Anchor_Text.title}>
        {Workflow_Anchor_Text.title}
        <Link className={styles.Document__Link} to={`${window.location.origin}/view/workflow`}>
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

export { WorkflowDocView };
