import React, { useCallback, useEffect, useState } from 'react';
import { Card, Checkbox, Tooltip, Empty } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LazyImage } from '../../components';
import { formatTime, removeSessionStorage } from '../../utils/common_tools';
import { BreadCrumbKey, fromStr, TableName } from '../../utils/constant';
import { getDatasetHrefFn, getHomeHrefFn, handleCheck, handleCardClick } from './function';
import { Params } from '@/https/interface';
import styles from './index.module.scss';

export interface Props {
  listData: any[];
  from?: string;
  table: string;
  timeFields: string;
  queryData: Params;
  id?: string;
  datasetName?: string;
  idList?: string[];
  setIdList?: (params: string[]) => void;
  tables: any;
}

const Cover_Image_Style = { width: '100%', height: '200px' };

export const PreviewListView: React.FC<Props> = ({
  listData = [],
  from = '',
  table = '',
  timeFields = '',
  queryData,
  datasetName = '',
  idList = [],
  setIdList = () => null,
  tables = null,
}: Props) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  useEffect(() => {
    if (from && from === fromStr) {
      removeSessionStorage(BreadCrumbKey);
    }
  }, [from]);

  const getDatasetHref = useCallback(
    (item: any) => {
      return getDatasetHrefFn(item, table);
    },
    [table]
  );
  const getHomeHref = useCallback(
    (item: any) => {
      return getHomeHrefFn(item, table, tables);
    },
    [table]
  );
  const cardClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (isClick) return;
      setIsClick(true);
      handleCardClick(from, queryData, datasetName);
    },
    [from, queryData, isClick]
  );

  const Not_Click_Link = useCallback((item: any, index: number) => {
    return (
      <div key={index.toString()} className={styles.Data__Search_link}>
        <Card
          hoverable
          style={{ width: 300, cursor: 'default' }}
          cover={
            <LazyImage
              url={item?.preview_url}
              status={item?.data?.process_status}
              table={table}
              style={Cover_Image_Style}
            />
          }
          actions={[
            <Tooltip key="checkbox" placement="top" title="勾选">
              <Checkbox
                className={styles.Data__Item_Checkbox}
                onChange={(e: any) => handleCheck(e, item, from, idList, setIdList)}
              ></Checkbox>
            </Tooltip>,
            <Tooltip key="play" placement="top" title="查看详情">
              <Link to={from === fromStr ? getHomeHref(item) : getDatasetHref(item)}>
                <PlayCircleOutlined style={{ fontSize: 20 }} />
              </Link>
            </Tooltip>,
          ]}
          onClick={(e: any) => cardClick(e)}
        >
          <span className={styles.Data__result_item}>
            <Tooltip placement="bottom" title={item?.data?.data_type}>
              <div className="Global__text_ellipsis">
                <b>类型：</b>
                {item?.data?.data_type}
              </div>
            </Tooltip>
            <Tooltip placement="bottom" title={item?.data?.status}>
              <div className="Global__text_ellipsis">
                <b>status: </b>
                {item?.data?.status}
              </div>
            </Tooltip>
            <Tooltip placement="bottom" title={item?.data?.create_timestamp}>
              <div className="Global__text_ellipsis">
                <b>create timestamp: </b>
                {item?.data?.create_timestamp}
              </div>
            </Tooltip>
          </span>
        </Card>
      </div>
    );
  }, []);
  return (
    <>
      <div className={styles.Data__Search_result}>
        {listData.length > 0 &&
          listData.map((item: any, index: number) =>
            item?.data?.data_id === null ? (
              Not_Click_Link(item, index)
            ) : (
              <Card
                hoverable
                key={index.toString()}
                style={{ width: 300, margin: '0 15px 15px 0' }}
                cover={
                  <LazyImage
                    url={item?.preview_url}
                    status={item?.data?.process_status}
                    table={table}
                    style={Cover_Image_Style}
                  />
                }
                actions={[
                  <Tooltip key="checkbox" placement="top" title="勾选">
                    <Checkbox
                      className={styles.Data__Item_Checkbox}
                      onChange={(e: any) => handleCheck(e, item, from, idList, setIdList)}
                    ></Checkbox>
                  </Tooltip>,
                  <Tooltip key="play" placement="top" title="查看详情">
                    <Link to={from === fromStr ? getHomeHref(item) : getDatasetHref(item)}>
                      <PlayCircleOutlined style={{ fontSize: 20 }} />
                    </Link>
                  </Tooltip>,
                ]}
                onClick={(e: any) => cardClick(e)}
              >
                {/* <Link
                  className={styles.Data__Search_link}
                  key={index.toString()}
                  href={from === fromStr ? getHomeHref(item) : getDatasetHref(item)}
                > */}
                <div className={styles.Data__Search_link}>
                  <span className={styles.Data__result_item}>
                    {table === TableName.BAG && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.name}
                          </div>
                        </Tooltip>
                        <div className="Global__text_ellipsis">
                          <Tooltip placement="bottom" title={item?.data[timeFields]}>
                            <div className="Global__text_ellipsis">
                              <b>时间：</b>
                              {formatTime(item?.data[timeFields]) || '暂无数据'}
                            </div>
                          </Tooltip>
                          <b>区域：</b>
                          {item?.data?.city
                            ? `${item?.data?.city}-${item?.data?.district}-${item?.data?.street}`
                            : '无'}
                        </div>
                      </>
                    )}
                    {table === TableName.BAG_FILE && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.CALIB && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.vehicle_plate}>
                          <div className="Global__text_ellipsis">
                            <b>车牌：</b>
                            {item?.data?.vehicle_plate}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.FRAME && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.bag_name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.bag_name || '暂无数据'}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                        {item?.data?.modalDist && (
                          <Tooltip placement="bottom" title={item?.data[timeFields]}>
                            <div className="Global__text_ellipsis">
                              <b>dist: </b>
                              {item?.data?.modalDist || '暂无数据'}
                            </div>
                          </Tooltip>
                        )}
                      </>
                    )}
                    {table === TableName.IMAGE && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                        {item?.data?.modalDist && (
                          <Tooltip placement="bottom" title={item?.data[timeFields]}>
                            <div className="Global__text_ellipsis">
                              <b>dist: </b>
                              {item?.data?.modalDist || '暂无数据'}
                            </div>
                          </Tooltip>
                        )}
                      </>
                    )}
                    {table === TableName.LIDAR_POINTCLOUD && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.POSE && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.bag_name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.bag_name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.TAG && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.tagger_name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.tagger_name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data[timeFields]}>
                          <div className="Global__text_ellipsis">
                            <b>时间：</b>
                            {formatTime(item?.data[timeFields]) || '暂无数据'}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.DATASET && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.name}>
                          <div className="Global__text_ellipsis">
                            <b>名称：</b>
                            {item?.data?.name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.size}>
                          <div className="Global__text_ellipsis">
                            <b>size: </b>
                            {item?.data?.size}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.create_timestamp}>
                          <div className="Global__text_ellipsis">
                            <b>create timestamp: </b>
                            {item?.data?.create_timestamp}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.data_type}>
                          <div className="Global__text_ellipsis">
                            <b>类型: </b>
                            {item?.data?.data_type}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.user_name}>
                          <div className="Global__text_ellipsis">
                            <b>用户: </b>
                            {item?.data?.user_name}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.DATASET_ELEMENT && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.data_type}>
                          <div className="Global__text_ellipsis">
                            <b>类型：</b>
                            {item?.data?.data_type}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.status}>
                          <div className="Global__text_ellipsis">
                            <b>status: </b>
                            {item?.data?.status}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.create_timestamp}>
                          <div className="Global__text_ellipsis">
                            <b>create timestamp: </b>
                            {item?.data?.create_timestamp}
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {table === TableName.MODEL && (
                      <>
                        <Tooltip placement="bottom" title={item?.data?.name}>
                          <div className="Global__text_ellipsis">
                            <b>类型：</b>
                            {item?.data?.name}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.task_type}>
                          <div className="Global__text_ellipsis">
                            <b>task_type: </b>
                            {item?.data?.task_type}
                          </div>
                        </Tooltip>
                        <Tooltip placement="bottom" title={item?.data?.create_timestamp}>
                          <div className="Global__text_ellipsis">
                            <b>create timestamp: </b>
                            {item?.data?.create_timestamp}
                          </div>
                        </Tooltip>
                      </>
                    )}
                  </span>
                </div>
                {/* </Link> */}
              </Card>
            )
          )}
      </div>
      {listData && listData.length === 0 && (
        <div className={styles.List__Empty}>
          <Empty />
        </div>
      )}
    </>
  );
};
