import React, { useState, useEffect, useCallback, useContext } from 'react';
// import { GetServerSideProps } from 'next';
import {
  Select,
  Button,
  Checkbox,
  Space,
  Popover,
  Spin,
  Dropdown,
  AutoComplete,
  Form,
  Input,
  Tabs,
  Tooltip,
  Alert,
  Modal,
  Upload,
} from 'antd';
import { FilterOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { TabsProps, MenuProps, GetProp, UploadFile, UploadProps } from 'antd';
import { useParams } from 'react-router-dom';
import { FilterAutoCompolete, PaginationView } from './components';
import { PreviewListView, TextSearchView } from './businessComponent';
import { Params, FieldType, Options } from './https/interface';
import {
  getHomeList,
  createDatasetFn,
  getMultiModalSearch,
  getListCount,
  getDatabaseData,
} from './https';
import {
  isIncludeTable,
  validateValue,
  getFilterOption,
  parseParams,
  getQuery,
} from './utils/tools';
import {
  LogicOption,
  CompareOptions,
  CompareOP,
  LogicOP,
  LogicUrlConfig,
  SearchValueKey,
  fromStr,
  PROCESS_STATUS,
  Time_Fields,
  UserLoginKey,
  Modal_Obj_Options,
  // TableName,
} from './utils/constant';
import { useMyDebounce, useErrorMessage, MessageType } from './utils/hooks';
// import { TableFieldsContext } from './utils/contexts';
import {
  setSessionStorage,
  handleQueryValue,
  handleInputValue,
  getSessionStorage,
} from './utils/common_tools';
import { sentryIntegration } from './utils/sentry';
import styles from './index.module.scss';
import dayjs from 'dayjs';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface Query {
  table: string;
  desc_order_by: string;
  asc_order_by: string;
  page: number;
  page_size: number;
  query: string;
  text: string;
  tab: string;
  multiTableName: string;
}

interface Props {
  query?: Query;
  env?: string;
  cookie?: any;
  useSSR?: boolean;
}

enum Tab_Key {
  SELECT = '1',
  TEXT = '2',
  MODEL = '3',
}

let Search_Obj_Multi: string = '';
const formKey: string = 'names';
const formKeyModel: string = 'model';

const DataSearchView: React.FC<Props> = (props: any) => {
  console.log(props, 'props-22222222');
  const router: any = useParams();
  const { query }: Props = router;
  const user = getSessionStorage(UserLoginKey);
  // const commonData: any = useContext(TableFieldsContext);
  const { TableFields = {}, Enums = {}, tables = [], TableName = {} } = props;
  const QUERY_SUCCESS = `(${TableName.BAG}.process_status ${CompareOP.EQ} ${JSON.stringify(
    PROCESS_STATUS.SUCCEEDED
  )})`;
  const showMessage = useErrorMessage();
  const [form] = Form.useForm();
  const [modelForm] = Form.useForm();
  const [searchDefaultKey, setSearchDefaultKey] = useState<string>(Tab_Key.SELECT);
  const [queryData, setQueryData]: any = useState<Params>({
    table: TableName.BAG,
    query: '',
    asc_order_by: [],
    desc_order_by: [],
    page: 1,
    page_size: 30,
    returns: [],
    count: false,
    all: false,
    hide_storage_endpoint: false,
    getColumns: false,
    tab: searchDefaultKey,
    text: '',
    multiTableName: TableName.IMAGE_EMBEDDING,
  });
  const [listData, setListData]: any = useState({});
  const [spinning, setSpinning] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [timeFields, setTimeFields] = useState<string>('');
  const [descFilterValue, setDescFilterValue]: any = useState([]);
  const [acseFilterValue, setAsceFilterValue]: any = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableOptionsSave, setTableOptionsSave] = useState<Options[]>([]);
  const [tableObjectOptionsSave, setTableObjectOptionsSave] = useState<Options[]>([]);
  const [columnOptions, setColumnOptions] = useState<Options[]>([]);
  const [tableOptions, setTableOptions] = useState<Options[]>([]);
  const [FilterOptions, setFilterOptions] = useState<Options[]>([]);
  const [idList, setIdList] = useState<string[]>([]);
  const [datasetName, setDatasetName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectIsDateType, setSelectIsDateType] = useState<boolean>(false);
  const [modelIsDateType, setModelIsDateType] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const getCountValue = useMyDebounce((params: Params) => {
    const getCount = () => {
      getListCount({ ...params, page: null, tables: JSON.stringify(tables) })
        .then((res: any) => {
          const { data } = res;
          setTotalCount(data?.total_count);
        })
        .catch((err: any) => {
          showMessage(MessageType.ERROR, '列表total count查询', err);
          throw new Error(err);
        });
    };
    sentryIntegration(getCount, 'Home_SearchList_getCount', 'search');
  }, 500);

  const getListData = useMyDebounce((params: Params) => {
    if (query?.tab === Tab_Key.MODEL) return;
    setSpinning(true);
    getHomeList({ ...params, tables: JSON.stringify(tables) })
      .then((res: any) => {
        const { status, data } = res;
        if (status === 200) {
          setListData(data.data);
        }
      })
      .catch((err: any) => {
        showMessage(MessageType.ERROR, '对象检索查询', err);
        throw new Error(err);
      })
      .finally(() => {
        setSpinning(false);
      });
  }, 500);

  useEffect(() => {
    if (Object.keys(TableFields).length && Object.keys(tables).length) {
      console.log(tables, '88888888');
      const initData = () => {
        const tableOptionsTemp: any = [];
        const tableObjectOptionsTemp: any = [];
        const FilterOptionsTemp: any = [];
        Object.keys(TableFields).forEach(type => {
          const table = isIncludeTable(tables, type, true);
          if (table?.isSearchObject) {
            tableObjectOptionsTemp.push({
              value: type,
              label: type,
            });
          }
        });
        Object.keys(TableFields).forEach(type => {
          const table = isIncludeTable(tables, type, true);
          if (table?.isGqlQueryable) {
            tableOptionsTemp.push({
              value: type,
              label: type,
            });
          }
        });
        Object.keys(TableFields[queryData?.table]).forEach(option => {
          FilterOptionsTemp.push({
            value: option,
            label: option,
          });
        });
        setTableObjectOptionsSave(tableObjectOptionsTemp);
        setTableOptionsSave(tableOptionsTemp);
        setTableOptions(tableOptionsTemp);
        setFilterOptions(FilterOptionsTemp);
      };
      sentryIntegration(initData, 'Home_logic_setTableFields', 'logic');
    }
  }, [TableFields, tables]);

  useEffect(() => {
    if (Object.keys(TableFields).length && Object.keys(tables).length) {
      if (queryData.tab !== Tab_Key.MODEL) {
        const getData = () => {
          const params: Params = {
            table: queryData.table,
            query: queryData.query,
            page: queryData.page,
            page_size: queryData.page_size,
            all: queryData.all,
            count: queryData.count,
            hide_storage_endpoint: queryData.hide_storage_endpoint,
            getColumns: queryData.getColumns,
            asc_order_by: queryData?.asc_order_by,
            desc_order_by: queryData?.desc_order_by,
          };
          getListData.current(params);
          const countParams: Params = {
            table: queryData?.table,
            query: queryData?.query,
            page_size: queryData?.page_size,
          };
          getCountValue.current(countParams);
        };
        sentryIntegration(getData, 'Home_SearchList_getListTotalCount', 'search');
      } else {
        const getModelSearchData = () => {
          modelSearchGetList.current(queryData, TableFields);
        };
        sentryIntegration(getModelSearchData, 'Home_SearchList_modelSearchGetList', 'search');
      }
    }
  }, [
    queryData,
    queryData.table,
    queryData.desc_order_by,
    queryData.asc_order_by,
    queryData.query,
    queryData.page,
    queryData.page_size,
    queryData.tab,
    TableFields,
    tables,
  ]);

  useEffect(() => {
    if (queryData?.table && Object.keys(tables).length) {
      const tableItem: any = isIncludeTable(tables, queryData?.table, true);
      setDescFilterValue([tableItem.sortBy]);
      setTimeFields(tableItem.sortBy);
      setQueryData({
        ...queryData,
        desc_order_by: [tableItem.sortBy],
      });
    }
  }, [queryData.table]);

  useEffect(() => {
    if (Object.keys(TableFields).length && Object.keys(tables).length) {
      const tableItem: any = isIncludeTable(tables, queryData?.table, true);
      let descOrderByTemp: string[] = [tableItem.sortBy];
      let ascOrderByTemp: string[] = [];
      if (query && Object.keys(query).length) {
        setSearchDefaultKey(query?.tab);
        if (query?.desc_order_by) {
          descOrderByTemp = query?.desc_order_by.split(',');
        } else {
          const tableItem: any = isIncludeTable(tables, queryData?.table, true);
          descOrderByTemp = [tableItem.sortBy];
        }
        if (query?.asc_order_by) {
          ascOrderByTemp = query?.asc_order_by.split(',');
        } else {
          ascOrderByTemp = [];
        }
        if (query?.tab !== Tab_Key.MODEL) {
          let query_params: string = '';
          if (query && Object.keys(query).length) {
            const isBag: boolean = query.table === TableName.BAG;
            const { query: queryStr } = query;
            if (queryStr) {
              const result = parseParams(queryStr);
              let filterNames = result;
              if (!isBag) {
                filterNames = result.filter(
                  (item: any) =>
                    item &&
                    item.column !== 'process_status' &&
                    item.value !== PROCESS_STATUS.SUCCEEDED
                );
              }
              form.setFieldsValue({ [formKey]: filterNames });
              const query_cur: string = getQuery(result, TableFields, queryData.table);
              query_params = query_cur;
            } else {
              if (isBag) query_params = QUERY_SUCCESS;
            }
            setDescFilterValue(descOrderByTemp);
            setAsceFilterValue(ascOrderByTemp);
          } else {
            if (queryData.table === TableName.BAG) {
              query_params = QUERY_SUCCESS;
            }
          }
          setQueryData({
            ...queryData,
            ...query,
            tab: Tab_Key.SELECT,
            query: query_params,
            desc_order_by: descOrderByTemp,
            asc_order_by: ascOrderByTemp,
          });
        } else {
          const text = query?.text || '';
          const values: Params = {
            table: query?.table,
            query: query?.query,
            multiTableName: query?.multiTableName,
            text,
            page: query?.page,
            page_size: query?.page_size,
            count: false,
          };
          getMultiModalSearchFn({ ...values, count: true });
          getMultiModalSearchFn(values);
          const result = parseParams(query?.query);
          if (!result.length) {
            result.push({
              column: '',
              compare: CompareOP.EQ,
              value: '',
            });
          }
          const modelFormValue = { text, [formKeyModel]: result };
          modelForm.setFieldsValue(modelFormValue);
          setQueryData({
            ...queryData,
            ...query,
            desc_order_by: descOrderByTemp,
            asc_order_by: ascOrderByTemp,
            tab: Tab_Key.MODEL,
          });
        }
      } else {
        const query_params = QUERY_SUCCESS;
        setQueryData({
          ...queryData,
          query: query_params,
          desc_order_by: descOrderByTemp,
          asc_order_by: ascOrderByTemp,
        });
        const result = parseParams(query_params);
        form.setFieldsValue({ [formKey]: result });
      }
    }
  }, [query, TableFields, tables]);

  useEffect(() => {
    if (queryData.tab !== Tab_Key.MODEL) {
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?tab=${queryData.tab}&table=${queryData?.table}&desc_order_by=${queryData?.desc_order_by}&asc_order_by=${queryData?.asc_order_by}&page=${queryData?.page}&page_size=${queryData?.page_size}&query=${queryData?.query}`
      );
    } else {
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?tab=${queryData.tab}&table=${queryData?.table}&multiTableName=${queryData?.multiTableName}&query=${queryData?.query}&page=${queryData?.page}&page_size=${queryData?.page_size}&desc_order_by=${queryData?.desc_order_by}&asc_order_by=${queryData?.asc_order_by}&text=${queryData?.text}`
      );
    }
  }, [
    queryData,
    queryData.tab,
    queryData.table,
    queryData.desc_order_by,
    queryData.asc_order_by,
    queryData.page,
    queryData.page_size,
    queryData.query,
    queryData.text,
  ]);

  const FilterContent = FilterOptions.length > 0 && (
    <>
      <div className={styles.Data__Filter}>
        <Space>
          <span>desc sort:</span>
          <Select
            mode="multiple"
            value={descFilterValue}
            style={{ width: 200 }}
            onChange={(val: string[]) => {
              setDescFilterValue(val);
              setSpinning(true);
              setListData([]);
              setQueryData({ ...queryData, desc_order_by: val, page: 1 });
              getListData.current({ ...queryData, desc_order_by: val, page: 1 });
            }}
            options={FilterOptions}
          />
        </Space>
      </div>
      <div className={styles.Data__Filter}>
        <Space>
          <span>asce sort:</span>
          <Select
            mode="multiple"
            value={acseFilterValue}
            style={{ width: 200 }}
            onChange={(val: string[]) => {
              setAsceFilterValue(val);
              setSpinning(true);
              setQueryData({ ...queryData, asc_order_by: val, page: 1 });
              getListData.current({ ...queryData, asc_order_by: val, page: 1 });
            }}
            options={FilterOptions}
          />
        </Space>
      </div>
    </>
  );
  const items: MenuProps['items'] = [
    // {
    //   label: <span>select1</span>,
    //   key: '0',
    // },
    // {
    //   label: <span>select1</span>,
    //   key: '1',
    // },
    // {
    //   label: <span>select1</span>,
    //   key: '2',
    // },
  ];
  const getSecondOptions = useCallback(
    (textTemp: string) => {
      const secondOptionsTemp: any[] = [];
      if (TableFields) {
        if (TableFields[textTemp]) {
          Object.keys(TableFields[textTemp]).forEach(option => {
            secondOptionsTemp.push({
              label: option,
              value: option,
            });
          });
        }
      }
      return secondOptionsTemp;
    },
    [TableFields]
  );

  const checkErrorBag = useCallback(
    (e: any) => {
      const formData = form.getFieldsValue();
      let query_params: string = '';
      if (!e.target.checked) {
        const successItem = parseParams(QUERY_SUCCESS);
        const filterNulls = formData[formKey].filter((item: any) => item.column && item.value);
        const filterRes = filterNulls.map((item: any) => ({ ...item, logic: LogicOP.AND }));
        const filterNames = [...filterRes, ...successItem];
        form.setFieldsValue({ [formKey]: filterNames });
        const result = getQuery(filterNames, TableFields, queryData.table);
        query_params = result;
      } else {
        if (queryData.query) {
          const filterNames = formData[formKey].filter(
            (item: any) =>
              item && item.column !== 'process_status' && item.value !== PROCESS_STATUS.SUCCEEDED
          );
          const result = getQuery(filterNames, TableFields, queryData.table);
          query_params = result;
          if (!filterNames.length) {
            filterNames.push({
              column: '',
              compare: CompareOP.EQ,
              value: '',
            });
          }
          form.setFieldsValue({ [formKey]: filterNames });
        }
      }
      setQueryData({ ...queryData, query: query_params });
    },
    [queryData]
  );

  const onFinishSelect = useCallback(
    (values: any) => {
      if (TableFields) {
        const flag = validateValue(values[formKey]);
        if (!flag) {
          setIsError(true);
          return;
        }
        setIsError(false);
        const result = getQuery(values[formKey], TableFields, queryData.table);
        let failData: string = '';
        let textFailData: string = '';
        const isIncludeSuccessQuery: boolean = queryData.query.includes(QUERY_SUCCESS);
        if (!isIncludeSuccessQuery && result && queryData.table === TableName.BAG) {
          failData = ` ${LogicUrlConfig.And_str} ${QUERY_SUCCESS}`;
          textFailData = `${QUERY_SUCCESS} ${LogicOP.AND} `;
        }
        setSessionStorage(SearchValueKey, values[formKey]);
        setSearchValue(textFailData + result);
        setQueryData({ ...queryData, query: result + failData });
      }
    },
    [TableFields, queryData]
  );

  const changeColumn = useCallback((val: string, index: number) => {
    const isDate = Time_Fields.includes(val);
    setSelectIsDateType(isDate);
    if (isDate) {
      const formData = form.getFieldsValue();
      const tempList = JSON.parse(JSON.stringify(formData[formKey]));
      tempList[index].value = '';
      const result = tempList.map((item: any) => {
        if (Time_Fields.includes(item.column) && item.value) {
          return {
            ...item,
            value: dayjs(item.value),
          };
        }
        return item;
      });
      form.setFieldsValue({ [formKey]: result });
    }
  }, []);

  const changeColumnModel = useCallback((val: string, index: number) => {
    const isDate = Time_Fields.includes(val);
    setModelIsDateType(isDate);
    if (isDate) {
      const formData = modelForm.getFieldsValue();
      const tempList = JSON.parse(JSON.stringify(formData[formKeyModel]));
      tempList[index].value = '';
      const result = tempList.map((item: any) => {
        if (Time_Fields.includes(item.column) && item.value) {
          return {
            ...item,
            value: dayjs(item.value),
          };
        }
        return item;
      });
      modelForm.setFieldsValue({ [formKeyModel]: result });
    }
  }, []);

  const SelectSearch = useCallback(() => {
    return (
      <div className={styles.Home__Options_container}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {isError && (
            <Alert
              message="请查看条件输入是否正确"
              type="error"
              showIcon
              style={{ maxWidth: 775, marginBottom: 10 }}
            />
          )}
          <Form name="select_form_item" form={form} onFinish={onFinishSelect}>
            <Form.Item label="">
              <Tooltip placement="top" title="检索对象选择">
                <Select
                  size="large"
                  style={{ width: 150 }}
                  value={queryData?.table}
                  defaultValue={queryData?.table}
                  options={tableObjectOptionsSave}
                  onChange={(val: string) => {
                    setSpinning(true);
                    setListData([]);
                    const filterColumn = getSecondOptions(val);
                    setFilterOptions(filterColumn);
                    form.setFieldsValue({
                      [formKey]: [{ table: val, compare: CompareOP.EQ, logic: LogicOP.AND }],
                    });
                    let query_params: string = '';
                    if (val === TableName.BAG) {
                      query_params = QUERY_SUCCESS;
                    }
                    setQueryData({ ...queryData, table: val, page: 1, query: query_params });
                    setSearchValue(query_params);
                  }}
                />
              </Tooltip>
            </Form.Item>
            {tableOptionsSave.length > 0 && (
              <Form.List
                name={formKey}
                initialValue={[
                  {
                    table: queryData?.table,
                    column: '',
                    compare: CompareOP.EQ,
                    value: '',
                    logic: LogicOP.AND,
                  },
                ]}
              >
                {(fields: any, { add, remove }: any, { errors }: any) => (
                  <>
                    {fields.map(({ name }: any, index: number) => (
                      <Form.Item required={false} key={index.toString()}>
                        <Space direction="vertical">
                          <Space>
                            <Form.Item label="" name={[name, 'table']}>
                              <AutoComplete
                                options={tableOptions}
                                style={{ width: 150 }}
                                placeholder="table"
                                onSelect={(text: string) => {
                                  const value = text.replace('.', '');
                                  const options = getSecondOptions(value);
                                  setColumnOptions(options);
                                }}
                                onSearch={(text: string) => {
                                  setTableOptions(getFilterOption(text, tableOptionsSave));
                                  const options = getSecondOptions(text);
                                  setColumnOptions(options);
                                }}
                              />
                            </Form.Item>
                            <Form.Item label="" name={[name, 'column']}>
                              <AutoComplete
                                options={columnOptions}
                                style={{ width: 150 }}
                                onFocus={() => {
                                  const formData = form.getFieldsValue();
                                  if (formData[formKey][0]?.table) {
                                    const columnOptions = getSecondOptions(
                                      formData[formKey][index]?.table
                                    );
                                    setColumnOptions(columnOptions);
                                  }
                                }}
                                onSearch={(text: string) => {
                                  const formData = form.getFieldsValue();
                                  if (formData[formKey][0]?.table) {
                                    const columnOptions = getSecondOptions(
                                      formData[formKey][index]?.table
                                    );
                                    const columnFilterOptions = getFilterOption(
                                      text,
                                      columnOptions
                                    );
                                    setColumnOptions(columnFilterOptions);
                                  }
                                }}
                                onChange={(val: string) => {
                                  changeColumn(val, index);
                                }}
                                onSelect={(val: string) => {
                                  changeColumn(val, index);
                                }}
                                placeholder="column"
                              />
                            </Form.Item>
                            <Form.Item
                              label=""
                              name={[name, 'compare']}
                              initialValue={CompareOP.EQ}
                            >
                              <AutoComplete
                                options={CompareOptions}
                                style={{ width: 100 }}
                                placeholder="compare"
                              />
                            </Form.Item>
                            <FilterAutoCompolete
                              form={form}
                              formKey={formKey}
                              index={index}
                              name={name}
                              enums={Enums}
                              selectIsDateType={selectIsDateType}
                            />
                            {index !== fields.length - 1 ? (
                              <Form.Item label="" name={[name, 'logic']} initialValue={LogicOP.AND}>
                                <AutoComplete
                                  options={LogicOption}
                                  style={{ width: 100 }}
                                  placeholder="logic"
                                />
                              </Form.Item>
                            ) : (
                              <Form.Item
                                style={{ width: fields.length === 1 ? 0 : 100 }}
                              ></Form.Item>
                            )}
                            {fields.length > 1 && (
                              <Form.Item label="">
                                <DeleteOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(name)}
                                />
                              </Form.Item>
                            )}
                            {index === fields.length - 1 && (
                              <Form.Item label="">
                                <PlusOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => {
                                    add();
                                    setSelectIsDateType(false);
                                  }}
                                />
                              </Form.Item>
                            )}
                          </Space>
                        </Space>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <div
                        style={{
                          textAlign: 'left',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Space>
                          <Button type="primary" htmlType="submit">
                            search
                          </Button>
                        </Space>
                        {queryData.table === TableName.BAG && (
                          <Space>
                            <Checkbox
                              checked={!queryData.query.includes(QUERY_SUCCESS)}
                              onChange={checkErrorBag}
                            >
                              包含解析中/解析失败数据
                            </Checkbox>
                          </Space>
                        )}
                      </div>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            )}
          </Form>
        </Space>
      </div>
    );
  }, [tableOptions, columnOptions, queryData, isError, selectIsDateType]);

  const getIdList = useCallback((name: string, data: any) => {
    const idList: string[] = [];
    const distList: string[] = [];
    data.forEach((item: any) => {
      if (name === TableName.FRAME) {
        idList.push(item.frame_id);
      } else if (name === TableName.IMAGE) {
        idList.push(item.image_id);
      }
      distList.push(item.dist);
    });
    return { idList, distList };
  }, []);

  const getMultiModalSearchFn = useCallback((values: any) => {
    return new Promise((resolve, reject) => {
      try {
        if (!values?.image && !values?.text) {
          setSpinning(false);
          return [];
        }
        setSpinning(true);
        const { image = null, table, text, query, page, page_size, count } = values;
        let formData: any = new FormData();
        if (image) {
          const file = image.fileList[0].originFileObj;
          formData.append('image', file);
        }
        formData.append('text', text);
        formData.append('table', table);
        formData.append('query', query);
        formData.append('page', page);
        formData.append('page_size', page_size);
        formData.append('count', count);
        getMultiModalSearch(formData).then((res: any) => {
          if (res?.data) {
            const { data } = res;
            if (data[0]?.total_count) {
              setTotalCount(data[0]?.total_count);
            } else {
              const modalData = getIdList(table, data);
              resolve(modalData);
              Search_Obj_Multi = table;
            }
          }
        });
      } catch (error) {
        setSpinning(false);
        reject(error);
      }
    });
  }, []);

  const getMultiModalListFn = useCallback((queryData: Params, TableFields: any, Ids: string[]) => {
    if (!Ids) return;
    return new Promise((resolve, reject) => {
      try {
        const fields = Object.keys(TableFields[queryData?.table]);
        const params: Params = {
          all: queryData.all,
          asc_order_by: queryData?.asc_order_by,
          count: queryData?.count,
          desc_order_by: queryData?.desc_order_by,
          getColumns: queryData?.getColumns,
          hide_storage_endpoint: queryData?.hide_storage_endpoint,
          page: queryData?.page,
          page_size: queryData?.page_size,
          table: queryData?.table,
        };
        let query_str: string = '';
        if (queryData?.page && queryData.page_size) {
          query_str = `${Search_Obj_Multi}.id.${CompareOP.IN}(${Ids})`;
        }
        params.query = query_str;
        params.returns = fields;
        params.page = 1;
        getDatabaseData(params)
          .then((res: any) => {
            const dataRes = res?.data.data;
            const resData: any[] = [];
            if (dataRes && dataRes.length) {
              Ids.forEach((id: string) => {
                const item = dataRes.find((item: any) => item.data.id === id);
                resData.push(item);
              });
            }
            resolve({ data: resData });
          })
          .catch((err: any) => {
            showMessage(MessageType.ERROR, '多模态检索查询', err);
            throw new Error(err);
          })
          .finally(() => {
            setSpinning(false);
          });
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const modelSearchGetList = useMyDebounce(async (queryData: Params, TableFields: any) => {
    if (TableFields) {
      if (
        !queryData?.table ||
        !queryData?.multiTableName ||
        (!queryData?.image && !queryData?.text)
      )
        return;
      setListData([]);
      const params: Params = {
        table: queryData.table,
        query: queryData?.query,
        multiTableName: queryData.multiTableName,
        image: queryData?.image,
        text: queryData?.text,
        page: queryData.page,
        page_size: queryData.page_size,
        count: false,
      };
      getMultiModalSearchFn({ ...params, count: true });
      const { idList, distList }: any = await getMultiModalSearchFn(params);
      const { data }: any = await getMultiModalListFn(queryData, TableFields, idList);
      const result: any = [];
      data.forEach((item: any, index: number) => {
        item.data.modalDist = distList[index];
        result.push(item);
      });
      setListData(result);
    }
  }, 1000);

  const onFinishMultiModal = useCallback(
    (values: any) => {
      const { text = '', image } = values;
      if (!image && !text) {
        setIsError(true);
        return;
      }
      setIsError(false);
      const result = getQuery(values[formKeyModel], TableFields, queryData.multiTableName);
      setSessionStorage(SearchValueKey, values[formKeyModel]);
      setQueryData({ ...queryData, query: result, text, image });
    },
    [TableFields, queryData, searchDefaultKey]
  );

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error: any) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const removeImage = useCallback(() => {
    const values = modelForm.getFieldsValue();
    values.image = null;
    setTimeout(() => {
      modelForm.setFieldsValue(values);
    }, 0);
  }, []);

  const MultiModalSearch = useCallback(() => {
    return (
      <>
        <Alert
          message="请注意：图片检索和文本检索目前只支持一种"
          type="warning"
          showIcon
          style={{ maxWidth: 666, marginBottom: 10 }}
        />
        {isError && (
          <Alert
            message="Text or Image can't be empty"
            type="error"
            showIcon
            style={{ maxWidth: 666, marginBottom: 10 }}
          />
        )}
        <Form
          name="model_search"
          form={modelForm}
          labelCol={{ span: 5 }}
          style={{ maxWidth: 1000 }}
          onFinish={onFinishMultiModal}
          autoComplete="off"
        >
          <Form.Item label="">
            <Tooltip placement="top" title="检索对象选择">
              <Select
                size="large"
                style={{ width: 150 }}
                value={queryData?.table}
                defaultValue={queryData?.table}
                options={Modal_Obj_Options}
                onChange={(val: string) => {
                  setSpinning(true);
                  setListData([]);
                  const filterColumn = getSecondOptions(val);
                  setFilterOptions(filterColumn);
                  form.setFieldsValue({
                    [formKeyModel]: [{ table: val, compare: CompareOP.EQ, logic: LogicOP.AND }],
                  });
                  let query_params: string = '';
                  if (val === TableName.BAG) {
                    query_params = QUERY_SUCCESS;
                  }
                  setQueryData({ ...queryData, table: val, page: 1, query: query_params });
                  setSearchValue(query_params);
                }}
              />
            </Tooltip>
          </Form.Item>
          <Form.List
            name={formKeyModel}
            initialValue={[
              {
                table: queryData.multiTableName,
                column: '',
                compare: CompareOP.EQ,
                value: '',
                logic: LogicOP.AND,
              },
            ]}
          >
            {(fields: any, { add, remove }: any) => (
              <>
                {fields.map(({ name }: any, index: number) => (
                  <Form.Item required={false} key={index.toString()}>
                    <Space direction="vertical">
                      <Space>
                        <Form.Item label="" name={[name, 'column']}>
                          <AutoComplete
                            options={columnOptions}
                            style={{ width: 150 }}
                            onFocus={() => {
                              if (queryData.multiTableName) {
                                const columnOptions = getSecondOptions(queryData.multiTableName);
                                setColumnOptions(columnOptions);
                              }
                            }}
                            onSearch={(text: string) => {
                              if (queryData.multiTableName) {
                                const columnOptions = getSecondOptions(queryData.multiTableName);
                                const columnFilterOptions = getFilterOption(text, columnOptions);
                                setColumnOptions(columnFilterOptions);
                              }
                            }}
                            onChange={(val: string) => {
                              changeColumnModel(val, index);
                            }}
                            onSelect={(val: string) => {
                              changeColumnModel(val, index);
                            }}
                            placeholder="column"
                          />
                        </Form.Item>
                        <Form.Item label="" name={[name, 'compare']} initialValue={CompareOP.EQ}>
                          <AutoComplete
                            options={CompareOptions}
                            style={{ width: 100 }}
                            placeholder="compare"
                          />
                        </Form.Item>
                        <FilterAutoCompolete
                          form={modelForm}
                          formKey={formKeyModel}
                          index={index}
                          name={name}
                          enums={Enums}
                          selectIsDateType={modelIsDateType}
                        />
                        {index !== fields.length - 1 ? (
                          <Form.Item label="" name={[name, 'logic']} initialValue={LogicOP.AND}>
                            <AutoComplete
                              options={LogicOption}
                              style={{ width: 100 }}
                              placeholder="logic"
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item style={{ width: fields.length === 1 ? 0 : 100 }}></Form.Item>
                        )}
                        {fields.length > 1 && (
                          <Form.Item label="">
                            <DeleteOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(name)}
                            />
                          </Form.Item>
                        )}
                        {index === fields.length - 1 && (
                          <Form.Item label="">
                            <PlusOutlined
                              className="dynamic-delete-button"
                              onClick={() => {
                                add();
                                setModelIsDateType(false);
                                const columnOptions = getSecondOptions(queryData.multiTableName);
                                setColumnOptions(columnOptions);
                              }}
                            />
                          </Form.Item>
                        )}
                      </Space>
                    </Space>
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>
          <Form.Item<FieldType>
            label=""
            name="text"
            rules={[{ required: false, message: 'Please input your text!' }]}
          >
            <Input style={{ width: 666 }} placeholder="请输入文本！" value={queryData?.text} />
          </Form.Item>
          <Form.Item<FieldType>
            label=""
            name="image"
            rules={[{ required: false, message: 'Please upload your image!' }]}
          >
            <Upload
              maxCount={1}
              listType="picture-circle"
              action={`/api/common/upload`}
              headers={{ 'Content-Type': 'multipart/form-data' }}
              onPreview={handlePreview}
              onRemove={removeImage}
              style={{ width: 100 }}
            >
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              search
            </Button>
          </Form.Item>
        </Form>
        <Modal
          width={900}
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }, [TableFields, isError, previewOpen, modelIsDateType, queryData, columnOptions]);

  const onChangeTab = useCallback(
    (key: string) => {
      setSearchDefaultKey(key);
      setListData([]);
      setTotalCount(null);
      if (key !== Tab_Key.MODEL) {
        const successItem = parseParams(QUERY_SUCCESS);
        form.setFieldsValue({ [formKey]: successItem });
        setSearchValue(handleQueryValue(QUERY_SUCCESS));
        setQueryData({ ...queryData, tab: key, table: TableName.BAG, query: QUERY_SUCCESS });
      } else {
        setQueryData({
          ...queryData,
          tab: key,
          table: TableName.FRAME,
          multiTableName: TableName.IMAGE_EMBEDDING,
          query: '',
        });
      }
    },
    [queryData]
  );
  const searchItems: TabsProps['items'] = [
    {
      key: Tab_Key.SELECT,
      label: '下拉检索',
      children: SelectSearch(),
    },
    {
      key: Tab_Key.TEXT,
      label: '文本检索',
      children: (
        <Space className={styles.Data__Search_text}>
          <Space direction="vertical">
            <Select
              size="large"
              style={{ width: 150 }}
              value={queryData?.table}
              defaultValue={queryData?.table}
              options={tableOptionsSave}
              onChange={(val: string) => {
                setSpinning(true);
                setListData([]);
                const filterColumn = getSecondOptions(val);
                setFilterOptions(filterColumn);
                if (val === TableName.BAG) {
                  setQueryData({ ...queryData, table: val, page: 1, query: QUERY_SUCCESS });
                  setSearchValue(QUERY_SUCCESS);
                } else {
                  setQueryData({ ...queryData, table: val, page: 1, query: '' });
                  setSearchValue('');
                }
              }}
            />
            <Space>
              <TextSearchView
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                enums={Enums}
                tableFields={TableFields}
              />
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  let query_params = handleInputValue(searchValue);
                  if (!query_params.includes(QUERY_SUCCESS)) {
                    query_params = `${query_params} ${LogicUrlConfig.And_str} ${QUERY_SUCCESS}`;
                  }
                  setQueryData({ ...queryData, query: query_params });
                }}
              >
                search
              </Button>
            </Space>
          </Space>
          {queryData.table === TableName.BAG && (
            <Space>
              <Checkbox checked={!queryData.query.includes(QUERY_SUCCESS)} onChange={checkErrorBag}>
                包含解析中/解析失败数据
              </Checkbox>
            </Space>
          )}
        </Space>
      ),
    },
    {
      key: Tab_Key.MODEL,
      label: '多模态检索',
      children: MultiModalSearch(),
    },
  ];
  const createDataset = useCallback(() => {
    const createFn = () => {
      const tableItem = isIncludeTable(tables, queryData?.table, true);
      const data_type = tableItem.gqlQueryName.slice(0, -1);
      const params = {
        name: datasetName,
        data_type,
        data_ids: idList,
        user_id: user.id,
        user_name: user.name,
      };
      createDatasetFn(params)
        .then((res: any) => {
          router.push({
            pathname: '/view/dataset',
            query: {
              id: res.data,
              table: queryData?.table,
              datasetName,
            },
          });
        })
        .catch((err: any) => {
          showMessage(MessageType.ERROR, '创建数据集', err);
          throw new Error(err);
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    };
    sentryIntegration(createFn, 'Home_Dataset_createDatasetFn', 'Dataset');
  }, [idList, datasetName, queryData]);
  console.log(TableName, 'TableName');
  return Object.keys(TableName).length > 0 ? (
    <>
    <div className={styles.Scroll_Wrapper}>
      <div className={styles.Data__Search}>
        <Tabs
          defaultActiveKey={searchDefaultKey}
          activeKey={searchDefaultKey}
          items={searchItems}
          onChange={onChangeTab}
        />
        <div className={styles.Data__Search_Tools}>
          <Popover content={FilterContent} placement="bottom" trigger="click">
            <Button type="primary" icon={<FilterOutlined />}>
              Sort
            </Button>
          </Popover>
          <div>
            <Space>
              <Button
                disabled={
                  !(
                    queryData?.table === TableName.BAG ||
                    queryData?.table === TableName.FRAME ||
                    queryData?.table === TableName.POSE
                  )
                }
                onClick={() => {
                  router.push({
                    pathname: '/view/operation/trajectory/home',
                    query: {
                      table: queryData?.table,
                      query: queryData?.query,
                    },
                  });
                }}
              >
                查看轨迹
              </Button>
              <Dropdown menu={{ items }} trigger={['click']}>
                <Button>{idList.length} Selected</Button>
              </Dropdown>
              <Button disabled={idList.length === 0} onClick={() => setIsModalOpen(true)}>
                Create Dataset
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <Spin spinning={spinning} tip="Loading...">
        {listData && (
          <PreviewListView
            from={fromStr}
            listData={listData}
            timeFields={timeFields}
            table={queryData?.table}
            queryData={queryData}
            idList={idList}
            setIdList={setIdList}
            tables={tables}
          />
        )}
        <PaginationView
          totalCount={totalCount}
          pageNum={queryData.page}
          pageSizeNum={queryData.page_size}
          dataList={listData}
          onChangeFn={(page: number, pageSize: number) => {
            setSpinning(true);
            setListData([]);
            setQueryData({ ...queryData, page, page_size: pageSize });
          }}
        />
      </Spin>
      <Modal
        title="创建数据集"
        open={isModalOpen}
        onOk={createDataset}
        onCancel={() => {
          setIsModalOpen(false);
          setDatasetName('');
        }}
      >
        <Input
          value={datasetName}
          onChange={(e: any) => {
            setDatasetName(e.target.value);
          }}
          placeholder="请输入数据集名称"
        />
      </Modal>
    </div>
    <div>2435346546</div>
    </>
  ) : (
    <></>
  );
  // <div>2435346546</div>
};

export default DataSearchView;
