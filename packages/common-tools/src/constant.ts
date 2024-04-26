import { Table } from './interface';

// Database Table Names
export enum TableName {
  CALIB = 'Calib',
  BAG = 'Bag',
  BAG_FILE = 'BagFile',
  BAGS_BATCH = 'BagsBatch',
  FRAME = 'Frame',
  IMAGE = 'Image',
  LIDAR_POINTCLOUD = 'LidarPointcloud',
  POSE = 'Pose',
  CLIP = 'Clip',
  DATASET = 'Dataset',
  DATASET_ELEMENT = 'DatasetElement',
  MODEL = 'Model',
  PERCEPTION = 'Perception',
  TAG = 'Tag',
  USER = 'User',
  ANNOTATION = 'Annotation',
  FLOW = 'Flow',
  MANUAL_FILTER = 'ManualFilter',
  COLLECTION_BAG = 'CollectionBag',
  IMAGE_EMBEDDING = 'ImageEmbedding',
  MAP = 'Map',
  TRIP = 'Trip',
  ENU_POSR = 'EnuPose',
  MODELDIFF = 'ModelDiff',
  PERCEPTION_FILE = 'PerceptionFile',
  CAN = 'Can',
  GEO = 'Geo',
  DRIVER_TAG = 'DriverTag',
  INFERENCE = 'Inference',
  EVALUATION = 'Evaluation',
  EVALSET = 'Evalset',
  EVAL_BADCASE = 'EvalBadCase',
  COLLECTION_RECORD = 'CollectionRecord',
  DATA_STATS = 'DataStats',
  DATA_USAGE = 'DataUsage',
  UNKNOWN = 'unknown',
}

export enum TableTypeSQL {
  CALIB = 'calibs',
  BAG = 'bags',
  BAG_FILE = 'bag_files',
  BAGS_BATCH = 'bags_batchs',
  FRAME = 'frames',
  IMAGE = 'images',
  LIDAR_POINTCLOUD = 'lidar_pointclouds',
  POSE = 'poses',
  COLLECTION_BAG = 'collection_bags',
  ENU_POSE = 'enu_poses',
  CLIP = 'clips',
  DATASET = 'datasets',
  DATASET_ELEMENT = 'dataset_elements',
  MODEL = 'models',
  PERCEPTION = 'perceptions',
  TAG = 'tags',
  USER = 'users',
  ANNOTATION = 'annotations',
  CAN = 'cans',
  GEO = 'geos',
  FLOW = 'flows',
  MANUAL_FILTER = 'manual_filters',
  DRIVER_TAG = 'driver_tags',
  INFERENCE = 'inferences',
  EVALUATION = 'evaluations',
  IMAGE_EMBEDDING = 'image_embeddings',
  MAP = 'maps',
  TRIP = 'trips',
  MODELDIFF = 'model_diffs',
  ENU_POSR = 'enuPose',
  PERCEPTION_FILE = 'perception_files',
  EVALSET = 'evalsets',
  EVAL_BADCASE = 'eval_bad_cases',
  COLLECTION_RECORD = 'collection_records',
  DATA_STATS = 'data_statss',
  DATA_USAGE = 'data_usages',
  UNITTEST = 'unittests',
}

export enum PoolTypeEnum {
  CALIB = 'calib',
  BAG = 'bag',
  BAG_FILE = 'bag_file',
  BAGS_BATCH = 'bags_batch',
  FRAME = 'frame',
  IMAGE = 'image',
  LIDAR_POINTCLOUDE = 'lidar_pointcloud',
  POSE = 'pose',
  ENU_POSR = 'enu_pose',
  CLIP = 'clip',
  DATASET = 'dataset',
  DATASET_ELEMENT = 'dataset_element',
  MODEL = 'model',
  MODELDIFF = 'model_diff',
  PERCEPTION = 'perception',
  PERCEPTION_FILE = 'perception_file',
  TAG = 'tag',
  USER = 'user',
  ANNOTATION = 'annotation',
  CAN = 'can',
  GEO = 'geo',
  FLOW = 'flow',
  MANUAL_FILTER = 'manual_filter',
  DRIVER_TAG = 'driver_tag',
  INFERENCE = 'inference',
  MAP = 'map',
  TRIP = 'trip',
  EVALUATION = 'evaluation',
  EVALSET = 'evalset',
  EVAL_BADCASE = 'eval_bad_case',
  COLLECTION_RECORD = 'collection_record',
  COLLECTION_BAG = 'collection_bag',
  DATA_STATS = 'data_stats',
  DATA_USAGE = 'data_usage',
  IMAGE_EMBEDDING = 'image_embedding',
  UNITTEST = 'unittest',
}

export const PoolTypeList: PoolTypeEnum[] = Object.values(PoolTypeEnum);

export const PoolTypeListOptions = PoolTypeList.map((item: string) => ({
  label: item,
  value: item,
}));

export const tables: Table[] = [
  {
    name: TableName.BAG,
    gqlQueryName: TableTypeSQL.BAG,
    sortBy: 'start_timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.FRAME,
    gqlQueryName: TableTypeSQL.FRAME,
    sortBy: 'timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.BAG_FILE,
    gqlQueryName: TableTypeSQL.BAG_FILE,
    sortBy: 'create_timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.BAGS_BATCH,
    gqlQueryName: TableTypeSQL.BAGS_BATCH,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.IMAGE,
    gqlQueryName: TableTypeSQL.IMAGE,
    sortBy: 'timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.LIDAR_POINTCLOUD,
    gqlQueryName: TableTypeSQL.LIDAR_POINTCLOUD,
    sortBy: 'timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.POSE,
    gqlQueryName: TableTypeSQL.POSE,
    sortBy: 'timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.COLLECTION_BAG,
    gqlQueryName: TableTypeSQL.COLLECTION_BAG,
    sortBy: 'start_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.CALIB,
    gqlQueryName: TableTypeSQL.CALIB,
    sortBy: 'timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.CLIP,
    gqlQueryName: TableTypeSQL.CLIP,
    sortBy: 'start_timestamp',
    isSearchObject: true,
    isGqlQueryable: false,
  },
  {
    name: TableName.DATASET,
    gqlQueryName: TableTypeSQL.DATASET,
    sortBy: 'create_timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.DATASET_ELEMENT,
    gqlQueryName: TableTypeSQL.DATASET_ELEMENT,
    sortBy: 'create_timestamp',
    isSearchObject: true,
    isGqlQueryable: true,
  },
  {
    name: TableName.MODEL,
    gqlQueryName: TableTypeSQL.MODEL,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.PERCEPTION,
    gqlQueryName: TableTypeSQL.PERCEPTION,
    sortBy: 'timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.TAG,
    gqlQueryName: TableTypeSQL.TAG,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: true,
  },
  {
    name: TableName.FLOW,
    gqlQueryName: TableTypeSQL.FLOW,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: true,
  },
  {
    name: TableName.ANNOTATION,
    gqlQueryName: TableTypeSQL.ANNOTATION,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: true,
  },
  {
    name: TableName.IMAGE_EMBEDDING,
    gqlQueryName: TableTypeSQL.IMAGE_EMBEDDING,
    sortBy: 'timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.MAP,
    gqlQueryName: TableTypeSQL.MAP,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.TRIP,
    gqlQueryName: TableTypeSQL.TRIP,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.ENU_POSR,
    gqlQueryName: TableTypeSQL.ENU_POSE,
    sortBy: 'timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.MODELDIFF,
    gqlQueryName: TableTypeSQL.MODELDIFF,
    sortBy: 'timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.PERCEPTION_FILE,
    gqlQueryName: TableTypeSQL.PERCEPTION_FILE,
    sortBy: 'timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.USER,
    gqlQueryName: TableTypeSQL.USER,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.CAN,
    gqlQueryName: TableTypeSQL.CAN,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.GEO,
    gqlQueryName: TableTypeSQL.GEO,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.MANUAL_FILTER,
    gqlQueryName: TableTypeSQL.MANUAL_FILTER,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.DRIVER_TAG,
    gqlQueryName: TableTypeSQL.DRIVER_TAG,
    sortBy: 'timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.INFERENCE,
    gqlQueryName: TableTypeSQL.INFERENCE,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.EVALUATION,
    gqlQueryName: TableTypeSQL.EVALUATION,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.EVALSET,
    gqlQueryName: TableTypeSQL.EVALSET,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.EVAL_BADCASE,
    gqlQueryName: TableTypeSQL.EVAL_BADCASE,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.COLLECTION_RECORD,
    gqlQueryName: TableTypeSQL.COLLECTION_RECORD,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.DATA_STATS,
    gqlQueryName: TableTypeSQL.DATA_STATS,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
  {
    name: TableName.DATA_USAGE,
    gqlQueryName: TableTypeSQL.DATA_USAGE,
    sortBy: 'create_timestamp',
    isSearchObject: false,
    isGqlQueryable: false,
  },
];

export const ShowPreImage = [
  TableName.BAG,
  TableName.FRAME,
  TableName.BAG_FILE,
  TableName.IMAGE,
  TableName.DATASET,
  TableName.DATASET_ELEMENT,
];
export const MultiImgPlay = [TableName.BAG, TableName.FRAME];
export const SingleImgPlay = [TableName.BAG_FILE, TableName.IMAGE, TableName.LIDAR_POINTCLOUD];
export const LoadCurInfo = [
  TableName.IMAGE,
  TableName.CALIB,
  TableName.LIDAR_POINTCLOUD,
  TableName.POSE,
  TableName.TAG,
  TableName.DATASET_ELEMENT,
  TableName.BAG_FILE,
];
export const NoImgPlay = [TableName.CALIB, TableName.LIDAR_POINTCLOUD, TableName.POSE];
export const LoadParentInfo = [TableName.BAG, TableName.FRAME, TableName.BAG_FILE, TableName.IMAGE];
export const NotLoadParentInfo = [
  TableName.LIDAR_POINTCLOUD,
  TableName.POSE,
  TableName.TAG,
  TableName.DATASET_ELEMENT,
];
export const InfoHasJson = [TableName.CALIB];

export const SHOW_START_TIMESTAP = [TableName.BAG, TableName.CLIP];
export const SHOW_CREATE_TIMESTAP = [
  TableName.DATASET,
  TableName.DATASET_ELEMENT,
  TableName.MODEL,
  TableName.TAG,
  TableName.BAG_FILE,
];
export const SHOW_TIMESTAP = [
  TableName.FRAME,
  TableName.IMAGE,
  TableName.POSE,
  TableName.LIDAR_POINTCLOUD,
  TableName.CALIB,
  TableName.PERCEPTION,
];

export enum CompareOP {
  LT = '<',
  LE = '<=',
  EQ = '==',
  NE = '!=',
  GE = '>=',
  GT = '>',
  IN = 'in_',
  NOT_IN = 'not_in',
  LIKE = 'like',
  ANY = 'any',
  NULL = 'is_(None)',
  NOT_NULL = 'is_not(None)',
}

export const ANY_FN_STR = 'to_geoalchemy';

export const Geoalchemy_Fields: string[] = ['intersection_centers', 'polygon', 'center_point'];

export const CompareOPList: CompareOP[] = Object.values(CompareOP);

export const CompareOPValues: { value: string }[] = Object.values(CompareOP).map(
  (item: string) => ({ value: item })
);

export const CompareOptions = CompareOPList.map((item: string) => ({ label: item, value: item }));

export enum LogicOP {
  AND = '&',
  OR = '|',
}

export const LogicOPList: any = Object.values(LogicOP);

export const LogicOPValues: { value: string }[] = Object.values(LogicOP).map((item: string) => ({
  value: item,
}));

export const LogicOption = LogicOPList.map((item: string) => ({ label: item, value: item }));

export const LogicUrlConfig = {
  Reg_And: /%and%/g,
  Reg_Or: /%ror%/g,
  Reg_And_Input: /&/g,
  Reg_Or_Input: /\|/g,
  And_str: '%and%',
  Or_str: '%or%',
};

export enum CAMERA_ENUM {
  FRONT_LEFT = 'camera_front_left',
  FRONT_NARROW = 'camera_front_narrow',
  FRONT_RIGHT = 'camera_front_right',
  FRONT_WIDE = 'camera_front_wide',
  REAR_LEFT = 'camera_rear_left',
  REAR_NARROW = 'camera_rear_narrow',
  REAR_RIGHT = 'camera_rear_right',
  SVC_SRCW = 'camera_svc_srcw',
  SVC_SRW = 'camera_svc_srw',
  SVC_SLW = 'camera_svc_slw',
  SVC_SFW = 'camera_svc_sfw',
  LIDAR_TOP = 'lidar_top',
  LIDAR_FRONT = 'lidar_front',
  LIDAR_LEFT = 'lidar_left',
  LIDAR_RIGHT = 'lidar_right',
  LIDAR_TOP_FRONT = 'lidar_top_front',
  LIDAR_TOP_LEFT = 'lidar_top_left',
  LIDAR_TOP_RIGHT = 'lidar_top_right',
  LIDAR_TOP_REAR = 'lidar_top_rear',
}

export enum LIDAR_CAMERA_ENUM {
  LIDAR_TOP = 'lidar_top',
  LIDAR_FRONT = 'lidar_front',
  LIDAR_LEFT = 'lidar_left',
  LIDAR_RIGHT = 'lidar_right',
  LIDAR_TOP_FRONT = 'lidar_top_front',
  LIDAR_TOP_LEFT = 'lidar_top_left',
  LIDAR_TOP_RIGHT = 'lidar_top_right',
  LIDAR_TOP_REAR = 'lidar_top_rear',
}

export const ALL_CAMERA: CAMERA_ENUM[] = Object.values(CAMERA_ENUM);
export const ALL_CAMERA_LIDAR: LIDAR_CAMERA_ENUM[] = Object.values(LIDAR_CAMERA_ENUM);

export enum TreeDataValue {
  ROUND = '0-0',
  ROUND_FRONT_LEFT = '0-0-0',
  ROUND_FRONT_RIGHT = '0-0-1',
  ROUND_FRONT_NARROW = '0-0-2',
  ROUND_FRONT_WIDE = '0-0-3',
  ROUND_REAR_NARROW = '0-0-4',
  ROUND_REAR_LEFT = '0-0-5',
  ROUND_REAR_RIGHT = '0-0-6',
  LINK = '0-1',
  LINK_SVC_SRCW = '0-1-0',
  LINK_SVC_SLW = '0-1-1',
  LINK_SVC_SRW = '0-1-2',
  LINK_SVC_SFW = '0-1-3',
}

export const TreeData = [
  {
    title: '周视',
    value: TreeDataValue.ROUND,
    key: TreeDataValue.ROUND,
    children: [
      {
        title: CAMERA_ENUM.FRONT_LEFT,
        value: TreeDataValue.ROUND_FRONT_LEFT,
        key: TreeDataValue.ROUND_FRONT_LEFT,
      },
      {
        title: CAMERA_ENUM.FRONT_RIGHT,
        value: TreeDataValue.ROUND_FRONT_RIGHT,
        key: TreeDataValue.ROUND_FRONT_RIGHT,
      },
      {
        title: CAMERA_ENUM.FRONT_NARROW,
        value: TreeDataValue.ROUND_FRONT_NARROW,
        key: TreeDataValue.ROUND_FRONT_NARROW,
      },
      {
        title: CAMERA_ENUM.FRONT_WIDE,
        value: TreeDataValue.ROUND_FRONT_WIDE,
        key: TreeDataValue.ROUND_FRONT_WIDE,
      },
      {
        title: CAMERA_ENUM.REAR_NARROW,
        value: TreeDataValue.ROUND_REAR_NARROW,
        key: TreeDataValue.ROUND_REAR_NARROW,
      },
      {
        title: CAMERA_ENUM.REAR_LEFT,
        value: TreeDataValue.ROUND_REAR_LEFT,
        key: TreeDataValue.ROUND_REAR_LEFT,
      },
      {
        title: CAMERA_ENUM.REAR_RIGHT,
        value: TreeDataValue.ROUND_REAR_RIGHT,
        key: TreeDataValue.ROUND_REAR_RIGHT,
      },
    ],
  },
  {
    title: '环视',
    value: TreeDataValue.LINK,
    key: TreeDataValue.LINK,
    children: [
      {
        title: CAMERA_ENUM.SVC_SRCW,
        value: TreeDataValue.LINK_SVC_SRCW,
        key: TreeDataValue.LINK_SVC_SRCW,
      },
      {
        title: CAMERA_ENUM.SVC_SLW,
        value: TreeDataValue.LINK_SVC_SLW,
        key: TreeDataValue.LINK_SVC_SLW,
      },
      {
        title: CAMERA_ENUM.SVC_SRW,
        value: TreeDataValue.LINK_SVC_SRW,
        key: TreeDataValue.LINK_SVC_SRW,
      },
      {
        title: CAMERA_ENUM.SVC_SFW,
        value: TreeDataValue.LINK_SVC_SFW,
        key: TreeDataValue.LINK_SVC_SFW,
      },
    ],
  },
];

export enum Workflow {
  PENDING = 'Pending',
  RUNNING = 'Running',
  SUCCEEDED = 'Succeeded',
  FAILED = 'Failed',
  ERROR = 'Error',
  TERMINATED = 'Terminated',
  DELETED = 'Deleted',
}

export enum PROCESS_STATUS {
  SUCCEEDED = '222222222222',
  FAILED = '4',
}

export const WorkflowStatus: any = {
  [Workflow.PENDING]: {
    color: 'geekblue',
    text: '等待',
  },
  [Workflow.RUNNING]: {
    color: 'cyan',
    text: '运行',
  },
  [Workflow.SUCCEEDED]: {
    color: 'green',
    text: '成功',
  },
  [Workflow.FAILED]: {
    color: 'volcano',
    text: '失败',
  },
  [Workflow.ERROR]: {
    color: 'volcano',
    text: '错误',
  },
  [Workflow.TERMINATED]: {
    color: 'gold',
    text: '终止',
  },
  [Workflow.DELETED]: {
    color: 'black',
    text: '删除',
  },
};

export const ComputerCluster: any = {
  SENSETIME: process.env.NEXT_PUBLIC_COMPUTER_CLUSTER_SENSETIME,
  SHITUO: process.env.NEXT_PUBLIC_COMPUTER_CLUSTER_SHITUO,
};

export const ComputerClusterOptions: any = [
  {
    value: ComputerCluster.SENSETIME,
    label: ComputerCluster.SENSETIME,
  },
  {
    value: ComputerCluster.SHITUO,
    label: ComputerCluster.SHITUO,
  },
];

export const WorkflowUrl: any = {
  [ComputerCluster.SENSETIME]: process.env.NEXT_PUBLIC_WORKFLOW_SENSETIME,
  [ComputerCluster.SHITUO]: process.env.NEXT_PUBLIC_WORKFLOW_SHITUO,
};

export const JudgeJiraSuccess: string | undefined = process.env.NEXT_PUBLIC_JIRA_NAME;
export const Annotation_Link = process.env.NEXT_PUBLIC_ANNOTATION_LINK;

export const Time_Fields = [
  'timestamp',
  'create_timestamp',
  'complete_timestamp',
  'update_timestamp',
  'start_timestamp',
  'process_timestamp',
  'check_timestamp',
  'end_timestamp',
  'tagged_obj_timestamp',
];

export const ID_CONFIG: any = {
  Bag: 'bag_id',
  Frame: 'frame_id',
  Pose: 'id',
};

export const ViewType = [
  { label: '解析入库', value: '0' },
  { label: '车端采集', value: '1' },
];

export enum Modal_Object {
  FRAME = 'Frame',
  IMAGE = 'Image',
}

export const Modal_Obj_Options = Object.values(Modal_Object).map((item: string) => ({
  label: item,
  value: item,
}));

export const MapConfig = {
  key: 'c38ef571b44d737b1d793caee79337d7', // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [
    'AMap.Heatmap',
    'AMap.MarkerCluster',
    'AMap.Scale',
    'AMap.ToolBar',
    'AMap.ControlBar',
    'AMap.HawkEye',
    'AMap.PolygonEditor',
  ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
};

export const ScaleConfig = {
  visible: true,
  position: 'LT',
  maxWidth: 100,
  unit: 'km',
};
export const ToolBarConfig = {
  position: {
    top: '110px',
    right: '40px',
  },
};
export const ControlBarConfig = {
  position: {
    top: '10px',
    right: '10px',
  },
};
export const HawkEyeConfig = {
  opened: false,
};

export const PageSize = 1200;
export const DownsampleValue = 7;
export const numsInit = { bagsNum: [], framesNum: [] };
export const USER_ERROR_STATUS = [401, 409, 422];
export const Timeout: number = 6000000;

export const Data_Detail_Key: string = 'DataDetail';
export const Dataset_Detail_Key: string = 'DatasetDetail';
export const Dataset_Element_Detail_Key: string = 'DatasetElementDetail';
export const BreadCrumbKey: string = 'BreadCrumbKey';
export const SearchValueKey: string = 'SearchValueKey';
export const DatasetSearchValueKey: string = 'DatasetSearchValueKey';
export const UserLoginKey: string = 'UserLoginKey';
export const DatabaseName: string = 'DatabaseName';
export const fromStr: string = 'home';
export const Base64Flag = 'data:image/png;base64,';
export const FilePath = 'public/images/default.png';
