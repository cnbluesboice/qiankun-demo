import React, { useCallback, useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Dropdown, Space, Button, Modal, Select, Alert } from 'antd';
import type { MenuProps } from 'antd';
import { useErrorMessage, MessageType, useMyDebounce } from 'common-tools';
import { logOutFn } from './hepler';
// import Image from 'next/image';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { getSessionStorage, setSessionStorage } from 'common-tools';
import { UserLoginKey, DatabaseName } from 'common-tools';
import { setDataBase, getSettings } from '../https';

const { Header } = Layout;

interface Props {
  colorBgContainer?: string;
  cookie: any;
}

export const HeaderView: React.FC<Props> = () => {
  const showMessage = useErrorMessage();
  const navigate = useNavigate();
  const user = getSessionStorage(UserLoginKey);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [databaseValue, setDatabaseValue] = useState<string>('');
  const [databaseLoading, setDatabaseLoading] = useState<boolean>(false);
  const [databaseOptions, setDatabaseOptions] = useState<any>([]);

  const getSettingsFn = useMyDebounce(() => {
    getSettings().then((res: any) => {
      const { status, data } = res;
      if (status === 200) {
        const options: any = [];
        data.database_name_options.forEach((item: string) => {
          options.push({
            label: item,
            value: item,
          });
        });
        let databaseName = getSessionStorage(DatabaseName) || '';
        if (!databaseName) {
          databaseName = data?.database_name;
        }
        setDatabaseValue(databaseName);
        setDatabaseOptions(options);
      }
    });
  }, 500);

  useEffect(() => {
    getSettingsFn.current();
  }, []);

  const logOut = useCallback(() => {
    logOutFn(navigate, showMessage);
  }, []);

  const items: MenuProps['items'] = [
    {
      label: <span>个人中心</span>,
      key: '0',
    },
    {
      label: <span>主页</span>,
      key: '1',
    },
    {
      label: <span onClick={() => setOpenSetting(true)}>设置</span>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: <span onClick={logOut}>退出</span>,
      key: '3',
    },
  ];
  const setDatabaseFn = useCallback(() => {
    setDatabaseLoading(true);
    setDataBase({ database: databaseValue })
      .then((res: any) => {
        const { status, data } = res;
        if (status === 200) {
          showMessage(MessageType.SUCCESS, data?.data?.message);
          window.location.reload();
        }
      })
      .catch((error: any) => {
        showMessage(MessageType.ERROR, 'database设置失败', error);
        throw new Error(error);
      })
      .finally(() => {
        setOpenSetting(false);
        setDatabaseLoading(false);
      });
  }, [databaseValue, showMessage]);
  return (
    <Header className={styles.Layout__Header} data-testid="HeaderView">
      <div className={styles.Layout__Logo}>
        {/* <Image
          src={'/images/logo.png'}
          alt="default img"
          width={230}
          height={105}
          style={{ marginTop: '-17px', marginLeft: '-50px' }}
        /> */}
      </div>
      <div className={styles.Layout__User}>
        <Space>
          <div>
            <Button
              type="link"
              target="_blank"
              onClick={() => {
                navigate('/view/document');
              }}
            >
              <span className={styles.Layout__User_Help}>帮助中心</span>
            </Button>
          </div>
          <div>
            <span>{user?.name}</span>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar size={60} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Space>
      </div>
      <Modal
        width={'30%'}
        title="用户设置"
        open={openSetting}
        footer={null}
        onCancel={() => setOpenSetting(false)}
      >
        <Space direction="vertical">
          <Alert message="注意：切换database后，需要重新登录/注册！" type="warning" />
          <Space direction="horizontal">
            <label>database:</label>
            <Select
              value={databaseValue}
              style={{ width: 200 }}
              onChange={(value: string) => {
                setDatabaseValue(value);
                setSessionStorage(DatabaseName, value);
              }}
              options={databaseOptions}
            />
            <Button type="primary" onClick={setDatabaseFn} loading={databaseLoading}>
              确定
            </Button>
          </Space>
        </Space>
      </Modal>
    </Header>
  );
};
