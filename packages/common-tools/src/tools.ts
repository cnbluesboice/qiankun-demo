import { handleInputValue } from './common_tools';
import {
  TableName,
  // tables,
  ALL_CAMERA,
  BreadCrumbKey,
  CompareOP,
  LogicUrlConfig,
  LogicOP,
  Time_Fields,
  ANY_FN_STR,
  Geoalchemy_Fields,
  LogicOPList,
} from './constant';
import cookie from 'cookie';
import { Params } from './interface';
import { getSessionStorage, setSessionStorage, handleQueryValue } from './common_tools';
import coordtransform from 'coordtransform';
import wkx from 'wkx';
import dayjs from 'dayjs';

const Buffer = require('buffer').Buffer;

export const _addAttr = function (key: string, value: any) {
  let query_str: string = '';
  if (value !== undefined && value !== null) {
    query_str += `${key}: ${JSON.stringify(value)}, `;
  }
  return query_str;
};

export const isIncludeTable = (tables: any[], tableName: string, isSame = false) => {
  let curTableName = '';
  if (!isSame) {
    curTableName = TableName.FRAME;
  } else {
    curTableName = tableName;
  }
  const table = tables.find((tbl: any) => tbl.name === curTableName);
  if (!table) {
    throw new Error(`Table ${curTableName} not found`);
  }
  return table;
};
export const isIncludeQL = (tables: any, gqlQueryName: string) => {
  if (!gqlQueryName || gqlQueryName === 'unittest') {
    return;
  }
  const table = tables.find((tbl: any) => tbl.gqlQueryName.slice(0, -1) === gqlQueryName);
  if (!table) {
    throw new Error(`Table ${gqlQueryName} not found`);
  }
  return table;
};

export const getGalleryImgUrls = (urls: any[] | undefined) => {
  if (!urls || !urls.length) return {};
  const urlAllList: string[] = [];
  const timestampList: any[] = [];
  const result: any = {};
  const urlsList: any = {};
  urls.forEach(item => {
    // eslint-disable-next-line prefer-spread
    urlAllList.push.apply(urlAllList, item?.preview_urls);
    timestampList.push(item?.data?.timestamp);
  });
  if (urlAllList.length) {
    for (let i = 0; i < urlAllList.length; i++) {
      for (let j = 0; j < ALL_CAMERA.length; j++) {
        if (urlAllList[i].includes(ALL_CAMERA[j])) {
          if (result[ALL_CAMERA[j]]) {
            result[ALL_CAMERA[j]].push({
              key: ALL_CAMERA[j],
              original: urlAllList[i],
              loading: 'eager',
            });
            urlsList[ALL_CAMERA[j]].push(urlAllList[i]);
          } else {
            result[ALL_CAMERA[j]] = [
              {
                key: ALL_CAMERA[j],
                original: urlAllList[i],
                loading: 'eager',
              },
            ];
            urlsList[ALL_CAMERA[j]] = [urlAllList[i]];
          }
        }
      }
    }
  }
  return {
    imgs: result,
    urlsList,
    timestampList,
  };
};

export const parseServerParams = (params: Params) => {
  if (params?.count && typeof params?.count === 'string') params.count = JSON.parse(params?.count);
  if (params?.all && typeof params?.all === 'string') params.all = JSON.parse(params?.all);
  if (params?.hide_storage_endpoint && typeof params?.hide_storage_endpoint === 'string')
    params.hide_storage_endpoint = JSON.parse(params?.hide_storage_endpoint);
  if (params?.getColumns && typeof params?.getColumns === 'string')
    params.getColumns = JSON.parse(params?.getColumns);
  if (params?.page && typeof params?.page === 'string') params.page = Number(params.page);
  if (params?.page_size && typeof params?.page_size === 'string')
    params.page_size = Number(params.page_size);
  if (params?.downsample_value && typeof params?.downsample_value === 'string')
    params.downsample_value = Number(params.downsample_value);
  return { ...params };
};

export const parseVehicleList = (data: any) => {
  if (!data || !data.length) return [];
  const list: { value: string; label: string }[] = [];
  let tempList: string[] = [];
  data.forEach((item: any) => {
    if (item?.data?.vehicle_plate) {
      tempList.push(item?.data?.vehicle_plate);
    }
  });
  tempList = Array.from(new Set(tempList));
  tempList.forEach((item: string) => {
    list.push({
      label: item,
      value: item,
    });
  });
  return list;
};

export const parseTrajectoryData = (data: any, tableName: string) => {
  const clusterMarkMapList: { lnglat: [string, string]; weight: number }[] = [];
  const lineMapList: any[] = [];
  const progressList: [number, number][] = [];
  let bagsNum: string[] = [];
  let framesNum: string[] = [];
  if (!data || !data.length) return { clusterMarkMapList, lineMapList, bagsNum, framesNum };
  let weight: number = 0;
  data.forEach((item: any) => {
    const pointList: any[] = [];
    if (tableName === TableName.POSE) {
      const wkbPoint = Buffer.from(item?.data?.gps_point, 'hex');
      const geometryObj: any = wkx.Geometry.parse(wkbPoint);
      const geometry = geometryObj.toGeoJSON();
      let gcj02 = null;
      if (geometry.type === 'Point') {
        const point = geometry.coordinates;
        gcj02 = coordtransform.wgs84togcj02(point[0], point[1]);
        pointList.push(gcj02);
      }
      if (item?.data?.bag_id || item?.data?.frame_id) {
        bagsNum.push(item?.data?.bag_id);
        framesNum.push(item?.data?.frame_id);
      }
    }
    if (tableName === TableName.COLLECTION_BAG) {
      let bufferList: any[] = [];
      const wkbPointStart = Buffer.from(item?.data?.start_gps_point, 'hex');
      const wkbPointEnd = Buffer.from(item?.data?.end_gps_point, 'hex');
      bufferList = [wkbPointStart, wkbPointEnd];
      bufferList.forEach((bufferItem: string) => {
        const geometryObj: any = wkx.Geometry.parse(bufferItem);
        const geometry = geometryObj.toGeoJSON();
        let gcj02 = null;
        if (geometry.type === 'Point') {
          const point = geometry.coordinates;
          gcj02 = coordtransform.wgs84togcj02(point[0], point[1]);
          pointList.push(gcj02);
        }
      });
    }
    pointList.forEach((point: any) => {
      lineMapList.push({
        ...item?.data,
        longitude: point[0],
        latitude: point[1],
      });
      progressList.push(point);
      clusterMarkMapList.push({
        lnglat: point,
        weight,
      });
    });
  });
  bagsNum = [...new Set(bagsNum)];
  framesNum = [...new Set(framesNum)];
  return {
    clusterMarkMapList,
    progressList,
    lineMapList,
    bagsNum,
    framesNum,
  };
};

export const validateValue = (data: any[]) => {
  if (!data) return false;
  let flag: boolean = true;
  if (data.length === 1) {
    const value = data[0];
    if (
      (!value.column && !value.value && !value.compare) ||
      (value.column && value.value && value.compare) ||
      (!value.column && !value.value && value.compare)
    ) {
      flag = true;
    } else {
      flag = false;
    }
  } else {
    data.forEach((value: any) => {
      const keys = Object.keys(value);
      keys.forEach((key: string) => {
        if (!value[key] || value[key] === 'undefined') {
          flag = false;
        }
      });
    });
  }
  return flag;
};

export const getFilterOption = (value: string, options: any) => {
  if (!options || !options.length) return [];
  return options.filter((item: any) => {
    let text: string = item?.value.toString();
    return text.includes(value);
  });
};

export const handleLineMapData = (data: any[]) => {
  if (!data || !data.length) return [];
  const result: any = {};
  data.forEach((item: any) => {
    if (!Object.keys(item).length) return;
    let name: string = '';
    if (item?.bag_name) {
      name = item?.bag_name;
    } else {
      name = item?.name;
    }
    if (item?.longitude === 0 || item?.latitude === 0) {
      return;
    }
    const vehicle_plate = name.split('_')[0];
    if (result[vehicle_plate]) {
      if (result[vehicle_plate][item?.bag_id]) {
        result[vehicle_plate][item?.bag_id].push([item?.longitude, item?.latitude]);
      } else {
        result[vehicle_plate][item?.bag_id] = [[item?.longitude, item?.latitude]];
      }
    } else {
      result[vehicle_plate] = { [item?.bag_id]: [[item?.longitude, item?.latitude]] };
    }
  });
  return result;
};

export const setBreadcrumb = (crumbItem: any) => {
  const bread = getSessionStorage(BreadCrumbKey) || [];
  bread.push(crumbItem);
  setSessionStorage(BreadCrumbKey, bread);
};

export const parseQuery = (key: string) => {
  const result = getSessionStorage(key);
  return result;
};

export const logicIsExist = (query: string, logicStr: string, curLogicStr: string) => {
  if (!query) return [];
  let queryList = [];
  if (query.includes(logicStr)) {
    queryList = query.split(logicStr);
    return queryList.map((item: string, index: number) =>
      index !== queryList.length - 1 ? `${item}${curLogicStr}` : item
    );
  }
  return [query];
};

export const parseParams = (query: string, isPageQuery = true) => {
  let queryList: any[] = logicIsExist(query, LogicUrlConfig.And_str, LogicOP.AND);
  let orList: any[] = [];
  let splitList: any[] = [];
  queryList.forEach((item: string) => {
    if (item.includes(LogicUrlConfig.Or_str)) {
      orList = logicIsExist(item, LogicUrlConfig.Or_str, LogicOP.OR);
      splitList.push(orList);
    } else {
      splitList.push(item);
    }
  });
  splitList = [...new Set(splitList.flat())];
  const result: any[] = [];
  splitList.forEach((str: string) => {
    let curItem: string[] = [];
    let items: string[] = [];
    if (str.includes(CompareOP.LIKE)) {
      items = str
        .replace('(', '')
        .replace(')', '')
        .replace('"', '')
        .replace('"', '')
        .replace(`.${CompareOP.LIKE}`, ` ${CompareOP.LIKE} `)
        .replace('(', ' ')
        .replace(')', '')
        .trim()
        .split(' ');
    } else if (str.includes(CompareOP.IN)) {
      items = str
        .replace('(', '')
        .replace(')', '')
        .replace('("', '')
        .replace('")', '')
        .replace(`.${CompareOP.IN}`, ` ${CompareOP.IN} `)
        .trim()
        .split(' ');
    } else if (str.includes(CompareOP.NOT_IN)) {
      items = str
        .replace('(', '')
        .replace(')', '')
        .replace('("', '')
        .replace('")', '')
        .replace(`.${CompareOP.NOT_IN}`, ` ${CompareOP.NOT_IN} `)
        .trim()
        .split(' ');
    } else if (str.includes(CompareOP.ANY)) {
      let cur_str = str;
      if (str.includes(ANY_FN_STR)) {
        cur_str = str.replace(`${ANY_FN_STR}(`, '').slice(0, -1);
      }
      items = cur_str
        .replace('(', '')
        .replace(')', '')
        .replace(`.${CompareOP.ANY}`, ` ${CompareOP.ANY} `)
        .trim()
        .split(' ');
    } else {
      items = str
        .replace('(', '')
        .replace(')', '')
        .replace('"', '')
        .replace('"', '')
        .trim()
        .split(' ');
    }
    items.forEach((item: string, index: number) => {
      if (!item) return;
      if (index === 0) {
        const firstItem = item.split('.');
        curItem = [...firstItem];
      } else {
        curItem.push(item);
      }
    });
    const obj: any = {};
    curItem.forEach((val: string, index: number) => {
      switch (index) {
        case 0:
          obj.table = val;
          break;
        case 1:
          obj.column = val;
          break;
        case 2:
          obj.compare = val;
          break;
        case 3:
          obj.value = val;
          break;
        default:
          if (LogicOPList.includes(val)) {
            obj.logic = val;
          } else {
            if (Time_Fields.includes(obj.column) && isPageQuery) {
              const value = dayjs(`${obj.value} ${val}`, 'YYYY-MM-DD HH:mm:ss');
              obj.value = value;
            } else {
              obj.value = `${obj.value} ${val}`;
            }
          }
          break;
      }
    });
    result.push(obj);
  });
  return result;
};

export const getQuery = (data: any[], TableFields: any, tableName: string) => {
  let result: string = '';
  let key: string = '';
  let flag: boolean = true;
  for (let i = 0; i < data.length; i++) {
    if (!data[i]?.column || !data[i]?.compare || !data[i]?.value) {
      flag = false;
      break;
    }
    if (data[i]?.table) {
      key = data[i]?.table;
    } else {
      key = tableName;
    }
    result = `${result}(${key}.`;
    if (data[i]?.column) {
      let column = data[i]?.column;
      result = `${result}${column}`;
    }
    if (data[i]?.compare) {
      const otherCompare =
        data[i]?.compare === CompareOP.IN ||
        data[i]?.compare === CompareOP.LIKE ||
        data[i]?.compare === CompareOP.NOT_IN;
      const likeCompare = data[i]?.compare === CompareOP.LIKE;
      if (data[i]?.value) {
        let value = data[i]?.value;
        if (Time_Fields.includes(data[i].column)) {
          value = JSON.stringify(dayjs(value).format('YYYY-MM-DD HH:mm:ss'));
        } else {
          switch (TableFields[key][data[i]?.column]) {
            case 'Int':
              value = parseInt(value);
              break;
            case 'Float':
              value = parseFloat(value);
              break;
            case 'Boolean':
              value = JSON.stringify(value);
              break;
            case 'DateTime':
              value = JSON.stringify(value);
              break;
            case 'String':
              if (likeCompare) {
                value = `${value}`;
              }
              value = JSON.stringify(value);
              break;
            case 'string':
              if (likeCompare) {
                value = `${value}`;
              }
              value = JSON.stringify(value);
              break;
            case 'UUIDType':
              if (likeCompare) {
                value = `${value}`;
              }
              value = JSON.stringify(value);
              break;
            case null:
              if (likeCompare) {
                value = `${value}`;
              }
              value = JSON.stringify(value);
              break;
            default:
              break;
          }
        }
        if (otherCompare) {
          result = `${result}.${data[i]?.compare}(${value}))`;
        } else {
          result = `${result} ${data[i]?.compare} `;
          result = `${result}${value})`;
        }
      }
    }
    if (i !== data.length - 1) {
      if (data[i]?.logic) result = `${result} ${data[i]?.logic} `;
    }
  }
  if (flag) {
    result = handleInputValue(result);
    return result;
  }
  return '';
};

export const parseCookie = (req: any) => {
  const cookieStr = decodeURIComponent(req.headers.cookie);
  const cookies = cookie.parse(cookieStr);
  let { user = 'null' }: any = cookies;
  user = JSON.parse(user);
  return { ...user, tokenStr: `Bearer ${user?.token}`, database: user?.user?.database_name };
};

export const handleLikeQuery = (str: string) => {
  if (!str) return '';
  let query_params = '';
  const result = parseParams(str, false);
  result.forEach((item: any) => {
    let itemStr: string = '';
    if (item.compare === CompareOP.LIKE && item.value) {
      item.value = `%${item.value}%`;
      const value = JSON.stringify(item.value);
      itemStr = `(${item.table}.${item.column}.${item.compare}(${value}))`;
    } else if (item.compare === CompareOP.IN || item.compare === CompareOP.NOT_IN) {
      let value = item.value;
      if (!value || !value.length) {
        value = JSON.stringify([]);
        itemStr = `(${item.table}.${item.column}.${item.compare}(${value}))`;
      } else {
        value = item.value.split(',');
        value = JSON.stringify(value);
        if (Geoalchemy_Fields.includes(item.column)) {
          itemStr = `(${item.table}.${item.column}.${item.compare}(${ANY_FN_STR}(${value})))`;
        } else {
          itemStr = `(${item.table}.${item.column}.${item.compare}(${value}))`;
        }
      }
    } else if (item.compare === CompareOP.ANY && item.value) {
      let value = item.value;
      if (value && !value.length) {
        itemStr = '';
      } else {
        value = JSON.stringify(value);
        if (Geoalchemy_Fields.includes(item.column)) {
          itemStr = `(${item.table}.${item.column}.${item.compare}(${ANY_FN_STR}(${value})))`;
        } else {
          itemStr = `(${item.table}.${item.column}.${item.compare}(${value}))`;
        }
      }
    } else if (
      item.compare === CompareOP.NULL.replace('(', '').replace(')', '') ||
      item.compare === CompareOP.NOT_NULL.replace('(', '').replace(')', '')
    ) {
      const compare_value: string = item.compare.split('None')[0] + '(None)';
      itemStr = `(${item.table}.${item.column}.${compare_value})`;
    } else {
      const value = JSON.stringify(item.value);
      itemStr = `(${item.table}.${item.column} ${item.compare} ${value})`;
    }
    if (item?.logic) {
      itemStr = itemStr + ` ${item.logic} `;
    }
    query_params = query_params + itemStr;
  });
  return handleQueryValue(query_params);
};

export const serializeParams = (params: any) => {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
};

export const redirectLogin = (res: any, req: any) => {
  let user = parseCookie(req);
  user = { ...user, tokenObj: { token: user?.token, token_type: user?.token_type } };
  return { props: { cookie: user } };
};
