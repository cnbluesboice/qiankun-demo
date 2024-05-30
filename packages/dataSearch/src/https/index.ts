import axiosWithRetries from './instance';
import { Params, LoginParams, RegisterParams, CreateWorkflow } from './interface';
import { URLS } from './urls';
// import { loggerFn, Levels } from '../utils/winston';
import { isIncludeTable, handleLikeQuery } from '../utils/tools';
import { TableName } from '../utils/constant';

// common
const getDatabaseData = (data: Params) => axiosWithRetries.post(URLS.Table_LIST, data);
const getUrl = (params: { path: string }) => axiosWithRetries.get(URLS.FILE_URL, { params });
const getEnums = () => axiosWithRetries.get(URLS.ENUMS_LIST);
const tokenValidate = () => axiosWithRetries.get(URLS.AUTH_TOKEN);
const getSettings = () => axiosWithRetries.get(URLS.SETTINGS);
const getBase64Img = (params: any) => axiosWithRetries.get(URLS.IMG_BASE64, { params });
// const getListCount = (data: Params) => axiosWithRetries.post(URLS.LIST_COUNT, data || {});
const setDataBase = (data: any) => axiosWithRetries.post(URLS.SET_DATABASE, data);
const getJiraInfo = () => axiosWithRetries.get(URLS.JIRA_INFO);

const getListCount = (params: Params) => {
  return new Promise((resolve, reject) => {
    let body: Params = {
      table: params.table,
    };
    body.count = true;
    if (body?.query) {
      body.query = handleLikeQuery(body.query);
    }
    const bodyStr = JSON.stringify(body);
    const headers: any = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const { tables = '[]' } = params;
    const cur_tables = JSON.parse(tables);
    axiosWithRetries.post(URLS.SEARCH_DATA, bodyStr, {
      headers: headers,
    }).then((res: any) => {
      const { data } = res;
      const tableItem = isIncludeTable(cur_tables, body.table, true);
      const total_count = data?.data[tableItem?.gqlQueryName]?.total_count;
      resolve({ total_count });
    });
  });
};

// user
const userRegister = (params: RegisterParams) =>
  axiosWithRetries.get(URLS.REGISTER_LOGIN, { params });
const userLogin = (params: LoginParams) => axiosWithRetries.get(URLS.USER_LOGIN, { params });
const userLogOut = () => axiosWithRetries.get(URLS.USER_LOGOUT);

// other
const getHomeList = (data: Params) => {
  const body_params: Params = data;
  let { tables = '[]' } = data;
  const cur_tables: any[] = JSON.parse(tables);
  return new Promise(async (resolve, reject) => {
    try {
      body_params.count = body_params?.count || false;
      const { query, table, returns = [] }: any = body_params;
      if (body_params?.query) {
        body_params.query = handleLikeQuery(query);
      }
      let returnsTemp = returns;
      if (returnsTemp === undefined || returnsTemp === null) {
        returnsTemp = [];
      }
      if (table === TableName.BAG) {
        returnsTemp = [
          'id',
          'name',
          'city',
          'district',
          'storage_url',
          'street',
          'vehicle_plate',
          'create_timestamp',
          'process_status',
          'start_timestamp',
          'process_exception_type',
          'process_exception_msg',
          'start_image_storage_url',
          'check_file_storage_url',
        ];
      }
      if (table === TableName.BAG_FILE) {
        returnsTemp = ['id', 'name', 'create_timestamp', 'bag_id', 'start_image_storage_url'];
      }
      if (table === TableName.CALIB) {
        returnsTemp = ['id', 'create_timestamp', 'timestamp', 'vehicle_plate', 'storage_url'];
      }
      if (table === TableName.FRAME) {
        returnsTemp = [
          'id',
          'bag_name',
          'timestamp',
          'bag_id',
          'storage_url',
          'camera_front_wide_storage_url',
        ];
      }
      if (table === TableName.IMAGE) {
        returnsTemp = [
          'id',
          'name',
          'create_timestamp',
          'timestamp',
          'bag_id',
          'bag_file_id',
          'storage_url',
        ];
      }
      if (table === TableName.LIDAR_POINTCLOUD) {
        returnsTemp = ['id', 'name', 'create_timestamp', 'bag_id', 'timestamp', 'storage_url'];
      }
      if (table === TableName.POSE) {
        returnsTemp = ['id', 'bag_name', 'create_timestamp', 'bag_id', 'timestamp'];
      }
      if (table === TableName.TAG) {
        returnsTemp = ['id', 'tagger_name', 'create_timestamp'];
      }

      if (table === TableName.DATASET) {
        returnsTemp = ['id', 'name', 'size', 'data_type', 'user_name', 'create_timestamp'];
      }
      if (table === TableName.DATASET_ELEMENT) {
        returnsTemp = ['id', 'create_timestamp', 'data_type', 'data_id', 'status'];
      }

      if (table === TableName.MODEL) {
        returnsTemp = ['id', 'create_timestamp', 'name', 'task_type', 'file_type'];
      }

      if (table === TableName.FLOW) {
        returnsTemp = ['id', 'create_timestamp', 'name', 'user_name', 'flow_status'];
      }

      if (table === TableName.ANNOTATION) {
        returnsTemp = ['id', 'create_timestamp', 'task_type', 'anno_type', 'user_id', 'flow_id'];
      }
      body_params.returns = returnsTemp;

      const body = JSON.stringify(body_params);
      const headers: any = {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // Database: req.headers?.database,
      };
      axiosWithRetries.post(URLS.SEARCH_DATA, body, {
        headers: headers,
      }).then((res: any) => {
        const { data } = res;
        const tableItem = isIncludeTable(cur_tables, table, true);
        const resData = data?.data[tableItem?.gqlQueryName]?.items;
        const total_count = data?.data[tableItem?.gqlQueryName]?.total_count;
        resolve({ data: resData, total_count });
      });
    } catch (error: any) {
      if (error?.response?.data) {
        error.config.errMessage = error?.response?.data;
      }
      reject(error);
      // loggerFn({ level: Levels.error, message: JSON.stringify(error) });
      throw new Error(error);
    }
  });
}


const getMultiModalSearch = (data: any) =>
  axiosWithRetries.post(URLS.HOME_MULTI_SEARCH, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const createDatasetFn = (data: any) => axiosWithRetries.post(URLS.DATASET_CREATE, data);

const createWorkflow = (data: CreateWorkflow) => axiosWithRetries.post(URLS.CREATE_WORKFLOW, data);
const workflowGetServer = () => axiosWithRetries.get(URLS.WORKFLOW_GET_SERVER);
const getAnnotationInfo = () => axiosWithRetries.get(URLS.ANNOTATION_INFO);

const getListFiles = (params: { path: string }) =>
  axiosWithRetries.get(URLS.QUALITY_LIST_FILES, { params });

const updateCollection = (data: any) => axiosWithRetries.post(URLS.Quality_UPDATE_COLLECTION, data);

const getDataPollTypes = () => axiosWithRetries.get(URLS.DATA_POOL_GET_TYPES);

const addData = (data: any) => axiosWithRetries.post(URLS.POOL_ADD_DATA, data);
const createPool = (data: any) => axiosWithRetries.post(URLS.POOL_CREATE_POOL, data);

export {
  // getDatabaseFields,
  getDatabaseData,
  getUrl,
  getEnums,
  tokenValidate,
  getSettings,
  getBase64Img,
  getListCount,
  setDataBase,
  getJiraInfo,
  userRegister,
  userLogin,
  userLogOut,
  getHomeList,
  getMultiModalSearch,
  createDatasetFn,
  createWorkflow,
  workflowGetServer,
  getAnnotationInfo,
  getListFiles,
  updateCollection,
  getDataPollTypes,
  addData,
  createPool,
};
