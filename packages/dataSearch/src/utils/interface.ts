import { TableName } from './constant';
export interface Table {
  name: string;
  gqlQueryName: string;
  isGqlQueryable: boolean;
  columns?: string[];
  sortBy: string;
  isSearchObject: boolean;
}

export interface TrajectoryParams {
  vehicelValue?: string[];
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
  table?: string;
  query?: string;
  viewType: string;
  bagId?: string;
}

export interface Props {
  query?: any;
  env?: string;
  cookie?: any;
}

export interface Params {
  table: TableName | string;
  query?: string;
  datasetQuery?: string;
  datasetInfoQuery?: string;
  page?: number | null;
  // pageSize?: number;
  page_size?: number;
  with_deleted?: boolean;
  asc_order_by?: any;
  desc_order_by?: any;
  returns?: string[];
  count?: boolean;
  all?: boolean;
  hide_storage_endpoint?: boolean;
  getColumns?: boolean;
  fields?: [];
  limit?: number;
  offset?: number;
  only_deleted?: boolean;
  join_tables?: string;
  tableDataFilter?: string;
  parentFields?: string;
  parent_id?: string;
  timestamp?: string;
  id?: string;
  database_name?: string;
  vehicelValue?: string | undefined;
  startDay?: string;
  endDay?: string;
  datasetId?: string;
  downsample_col?: string;
  downsample_value?: number;
  tab?: string;
  text?: string;
  image?: string;
  multiTableName?: string;
}
