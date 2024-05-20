import { isIncludeQL } from '../../utils/tools';
import { setSessionStorage } from '../../utils/common_tools';
import {
  Data_Detail_Key,
  Dataset_Detail_Key,
  Dataset_Element_Detail_Key,
  fromStr,
  TableName,
} from '../../utils/constant';
import { setBreadcrumb } from '../../utils/tools';

export const handleCheck = (
  e: any,
  data: any,
  from: string,
  idList: string[],
  setIdList: (params: string[]) => void
) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  if (from === fromStr) {
    const checked = e.target.checked;
    const id = data?.data?.id;
    if (checked) {
      setIdList([...idList, id]);
    } else {
      setIdList(idList.filter((item: string) => item !== id));
    }
  }
};

export const getDatasetHrefFn = (item: any, table: string) => {
  const { data = {} } = item;
  if (table === TableName.BAG) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.id,
        process_status: data?.process_status,
        bag_name: data?.name,
      },
    };
  }
  if (table === TableName.BAG_FILE) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.CALIB) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.id,
      },
    };
  }
  if (table === TableName.FRAME) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        timestamp: data?.timestamp,
        parent_id: data?.bag_id,
        storage_url: data?.storage_url,
        bag_name: data?.bag_name,
      },
    };
  }
  if (table === TableName.IMAGE) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.LIDAR_POINTCLOUD) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.POSE) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.DATASET) {
    return {
      pathname: `/view/dataset`,
      query: {
        id: data?.data_id,
        table: table,
      },
    };
  }
  if (table === TableName.DATASET_ELEMENT) {
    return {
      pathname: `/view/dataset`,
      query: {
        id: data?.id,
        table: table,
        parent_id: data?.data_id,
      },
    };
  }
  return {};
};

export const getHomeHrefFn = (item: any, table: string, tables: any) => {
  const { data = {} } = item;
  let parent_id = '';
  if (data?.bag_id) parent_id = data?.bag_id;
  if (table === TableName.BAG) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        parent_id: data?.id,
        process_status: data?.process_status,
        bag_name: data?.name,
      },
    };
  }
  if (table === TableName.BAG_FILE) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.CALIB) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        parent_id: data?.id,
      },
    };
  }
  if (table === TableName.FRAME) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        timestamp: data?.timestamp,
        parent_id,
        storage_url: data?.storage_url,
        bag_name: data?.bag_name,
      },
    };
  }
  if (table === TableName.IMAGE) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.LIDAR_POINTCLOUD) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.POSE) {
    return {
      pathname: `/view/Data/detail`,
      query: {
        id: data?.id,
        table,
        parent_id: data?.bag_id,
      },
    };
  }
  if (table === TableName.DATASET) {
    const tableSql = isIncludeQL(tables, data?.data_type);
    return {
      pathname: `/view/dataset`,
      query: {
        id: data?.id,
        table: tableSql?.name,
        datasetName: data?.name,
      },
    };
  }
  return {};
};

export const handleCardClick = (from: string, queryData: any, datasetName: string) => {
  if (from === fromStr && queryData?.table === TableName.DATASET) {
    setSessionStorage(Dataset_Detail_Key, { ...queryData });
  } else if (from === fromStr && queryData?.table != TableName.DATASET) {
    setSessionStorage(Data_Detail_Key, { ...queryData });
  } else if (from != fromStr) {
    setSessionStorage(Dataset_Element_Detail_Key, { ...queryData });
  }
  const href = window.location.href;
  let title = '';
  if (from === fromStr) {
    title = 'Data Search';
  } else {
    title = `Dataset-${datasetName}`;
  }
  const breadcrumbItem = {
    href,
    title,
  };
  setBreadcrumb(breadcrumbItem);
};
