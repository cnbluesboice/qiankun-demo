import React from 'react';
import { Pagination } from 'antd';
import styles from './index.module.scss';

interface Props {
  totalCount: number | null | undefined;
  pageNum: number | null | undefined;
  pageSizeNum: number | null | undefined;
  dataList: any;
  onChangeFn: (page: number, pageSize: number) => void;
  style?: any;
}

export const PaginationView: React.FC<Props> = (props: Props) => {
  const { totalCount, pageNum, pageSizeNum, dataList, onChangeFn, style } = props;
  return (
    <>
      {totalCount !== null && (
        <div className={styles.Table_pagination} style={{ ...style }}>
          <Pagination
            showQuickJumper
            current={Number(pageNum)}
            defaultPageSize={30}
            pageSize={Number(pageSizeNum)}
            total={Number(totalCount)}
            pageSizeOptions={[10, 20, 30, 50, 100]}
            showTotal={(total: number) => `总条数：${Number(total)}`}
            onChange={(page, pageSize) => onChangeFn(page, pageSize)}
          />
        </div>
      )}
      {!totalCount && dataList && dataList.length > 0 && (
        <div className={styles.Table_pagination}>
          <span>总页数获取中，请稍等......</span>
        </div>
      )}
    </>
  );
};
