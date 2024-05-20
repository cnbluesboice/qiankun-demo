import moment from 'moment';
import { LogicUrlConfig, LogicOP, IsSearchObject, IsGqlQueryable } from './constant';

export function formatTime(date: string) {
  if (!date) return;
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function addMinutesToTime(timeString: string, minutesToAdd: number) {
  const originalTime = moment(timeString, 'HH:mm:ss');
  const updatedTime = originalTime.add(minutesToAdd, 'minutes');
  return updatedTime.format('HH:mm:ss');
}

export const isWindow = () => {
  return typeof window !== 'undefined';
};

export const isDataType = (data: any) => {
  const len: number = 8;
  const init: number = -1;
  return Object.prototype.toString.call(data).slice(len, init).toLowerCase();
};

export const setSessionStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key: string, isStr = false) => {
  if (typeof window !== 'undefined') {
    const value: any = sessionStorage.getItem(key);
    if (value) {
      if (isStr) {
        return value;
      }
      return JSON.parse(value);
    }
  }
};

export const removeSessionStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};

export const randomColor = () => {
  const brightColors: string[] = [
    '#f5222d',
    '#237804',
    '#08979c',
    // '#1677ff',
    // '#531dab',
    '#c41d7f',
    '#000000',
    '#91d5ff',
    '#520339',
    '#120338',
  ];
  const randomIndex = Math.floor(Math.random() * brightColors.length);
  return brightColors[randomIndex];
};

export const getRandomColor = (opacityValue = 1) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},${opacityValue})`;
};

export const sliceLastSecondStr = (mainString: string, searchString: string) => {
  let index = mainString.lastIndexOf(searchString);
  if (index !== -1) {
    index = mainString.lastIndexOf(searchString, index - 1);
    if (index !== -1) {
      return mainString.slice(index + searchString.length);
    }
  }
  return '';
};

export const handleQueryValue = (str: string) => {
  let searchValueTemp: string = str.replace(LogicUrlConfig.Reg_And, LogicOP.AND);
  searchValueTemp = searchValueTemp.replace(LogicUrlConfig.Reg_Or, LogicOP.OR);
  return searchValueTemp;
};

export const handleInputValue = (str: string) => {
  let input = str.replace(LogicUrlConfig.Reg_And_Input, LogicUrlConfig.And_str);
  input = input.replace(LogicUrlConfig.Reg_Or_Input, LogicUrlConfig.Or_str);
  return input;
};

export const formatNumber = (number: number, isInteger = false) => {
  if (number >= 100000000) {
    return (number / 100000000).toFixed(3) + ' 亿';
  } else if (number >= 10000) {
    return (number / 10000).toFixed(3) + ' 万';
  }
  if (Number.isInteger(number)) {
    if (isInteger && !number) {
      return number;
    }
    return !number ? '-' : number;
  }
  return number.toFixed(3);
};

export const parseTableFields = (data: any) => {
  if (!data || !Object.keys(data).length) return null;
  const fields_res: any = {};
  const Table_config: any = {
    TableName: {},
    TableTypeSQL: {},
    PoolType: {},
    tables: [],
  };
  Object.keys(data).forEach((key: string) => {
    fields_res[key] = {};
    data[key].columns.forEach((column: any) => {
      fields_res[key][column.name] = column.type;
    });
    const isSearchObject: boolean = IsSearchObject.includes(key);
    const isGqlQueryable: boolean = IsGqlQueryable.includes(key);
    const table_key: string = data[key].table_name.toUpperCase();
    const table_sql: string = data[key].table_name + 's';
    Table_config.TableName[table_key] = key;
    Table_config.TableTypeSQL[table_key] = table_sql;
    Table_config.PoolType[table_key] = data[key].table_name;
    Table_config.tables.push({
      name: key,
      gqlQueryName: table_sql,
      sortBy: data[key].order_by,
      isSearchObject,
      isGqlQueryable,
    });
  });
  return { TableFields: fields_res, Table_config };
};

// const router = useRouter();
// function errorRouter(err: any) {
//   if (env === 'development') {
//     throw new Error(err);
//   }
//   const { response = {} } = err;
//   const { data = {} } = response;
//   router.push({
//     pathname: '/_error',
//     query: {
//       errCode: response?.status || 500,
//       errMsg: err.message,
//       errInfo: Object.keys(data).length > 0 ? JSON.stringify(data) : '',
//     },
//   });
// }
