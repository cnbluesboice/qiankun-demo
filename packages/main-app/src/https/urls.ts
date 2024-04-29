export enum URLS {
  // common
  Table_LIST = '/api/common/getDatabaseData',
  TABLE_FIELDS = '/api/common/getDatabaseFields',
  FILE_URL = '/api/getObject/getUrl',
  ENUMS_LIST = '/api/common/getEnums',
  AUTH_TOKEN = '/api/common/authToken',
  SETTINGS = '/api/setting/database_name',
  LIST_COUNT = '/api/common/getCount',
  IMG_BASE64 = '/api/common/getImgToBase64',
  SET_DATABASE = '/api/common/setDatabase',
  JIRA_INFO = '/api/common/getJiraInfo',

  // User
  REGISTER_LOGIN = '/api/user/register',
  USER_LOGIN = '/api/user/login',
  USER_LOGOUT = '/api/user/logout',

  // other
  HOME_LIST = '/api/home/getHomeData',
  HOME_MULTI_SEARCH = 'api/home/multiModalSearch',
  DATASET_CREATE = '/api/home/createDataset',
  CREATE_WORKFLOW = '/api/workflow/creatWorkflow',
  WORKFLOW_GET_SERVER = '/api/workflow/getServer',
  ANNOTATION_INFO = '/api/workflow/getAnnotationInfo',
  QUALITY_LIST_FILES = '/api/dataCollection/getListFiles',
  Quality_UPDATE_COLLECTION = '/api/dataCollection/updateResult',

  // Data Pool
  DATA_POOL_GET_TYPES = '/api/dataPool/getPoolTypes',
  POOL_ADD_DATA = '/api/dataPool/addData',
  POOL_CREATE_POOL = '/api/dataPool/createPool',
}
