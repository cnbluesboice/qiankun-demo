export interface Params {
  table: string;
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
  date?: string[];
}

export type LoginParams = {
  userName: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  phone: string;
  password: string;
};

export type CreateWorkflow = { flow_config_str: string; computer_cluster: string; map: boolean };

export type FieldType = {
  page: number;
  page_size: number;
  query: string;
  text: string;
  image: any;
  count: boolean;
};

export interface Options {
  value: string;
  label: string;
}
