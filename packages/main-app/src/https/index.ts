import axiosWithRetries from './instance';
import { Params, LoginParams, RegisterParams, CreateWorkflow } from './interface';
import { URLS } from './urls';
import { parseTableFields } from '../utils/common_tools';

// common
const getDatabaseFields = () => {
  return new Promise((resolve, reject) => {
    axiosWithRetries.get(URLS.TABLE_FIELDS).then((res: any) => {
      const { data } = res;
      const fieldsRes = parseTableFields(data);
      resolve(fieldsRes);
    })
  });
};
const getDatabaseData = (data: Params) => axiosWithRetries.post(URLS.Table_LIST, data);
const getUrl = (params: { path: string }) => axiosWithRetries.get(URLS.FILE_URL, { params });
const getEnums = () => axiosWithRetries.get(URLS.ENUMS_LIST);
const tokenValidate = () => axiosWithRetries.get(URLS.AUTH_TOKEN);
const getSettings = () => axiosWithRetries.get(URLS.SETTINGS);
const getBase64Img = (params: any) => axiosWithRetries.get(URLS.IMG_BASE64, { params });
const getListCount = (data: Params) => axiosWithRetries.post(URLS.LIST_COUNT, data || {});
const setDataBase = (data: any) => axiosWithRetries.post(URLS.SET_DATABASE, data);
const getJiraInfo = () => axiosWithRetries.get(URLS.JIRA_INFO);

// user
const userRegister = (params: RegisterParams) =>
  axiosWithRetries.get(URLS.REGISTER_LOGIN, { params });
const userLogin = (params: LoginParams) => axiosWithRetries.get(URLS.USER_LOGIN, { params });
const userLogOut = () => axiosWithRetries.get(URLS.USER_LOGOUT);

// other
const getHomeList = (data: Params, headers = {}) =>
  axiosWithRetries.post(URLS.HOME_LIST, data, {
    headers: headers,
  });

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
  getDatabaseFields,
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
  getDatabaseData,
  getListFiles,
  updateCollection,
  getDataPollTypes,
  addData,
  createPool,
};
