import React, { useCallback, useEffect, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { getFilterOption } from '../../utils/tools';
import { CompareOPValues, LogicOPValues } from '../../utils/constant';

const { TextArea } = Input;

interface Props {
  searchValue: string;
  setSearchValue: (val: string) => void;
  enums: any;
  tableFields: any;
}

interface OptionsItem {
  value: string;
}

const TextSearchView: React.FC<Props> = ({
  searchValue,
  setSearchValue,
  enums,
  tableFields,
}: Props) => {
  const [valueOptions, setValueOptions] = useState<OptionsItem[]>([]);
  const [saveTableOptions, setSaveTableOptions] = useState<OptionsItem[]>([]);
  const [saveValueOptions, setSaveValueOptions] = useState<OptionsItem[]>([]);
  const [columnValues, setColumnValues] = useState<OptionsItem[]>([]);
  const [saveInput, setSaveInput] = useState<string[]>([]);

  const handleTableFields = useCallback((fields: any) => {
    if (!fields || !Object.keys(fields).length) return {};
    const tables: OptionsItem[] = Object.keys(fields).map((item: string) => ({ value: item }));
    const result: any = {};
    for (let key in fields) {
      result[key] = Object.keys(fields[key]).map((item: string) => ({ value: item }));
    }
    return { flelds: result, tables };
  }, []);

  useEffect(() => {
    const list: OptionsItem[] = [];
    if (enums) {
      const { EnumsData = {} } = enums;
      for (let key in EnumsData) {
        EnumsData[key].forEach((item: OptionsItem) => {
          const isExist = list.find((val: OptionsItem) => val.value === item.value);
          if (!isExist) {
            list.push(item);
          }
        });
      }
      const { flelds, tables = [] } = handleTableFields(tableFields);
      setColumnValues(flelds);
      setSaveTableOptions(tables);
      setSaveValueOptions([...CompareOPValues, ...LogicOPValues, ...tables, ...list]);
    }
  }, [enums]);
  const handleSearch = useCallback(
    (val: string) => {
      const splitStrList = val.split(' ');
      const lastStr = splitStrList[splitStrList.length - 1];
      setSaveInput(splitStrList);
      if (!val) {
        setValueOptions(saveTableOptions);
      } else {
        if (lastStr === ' ') {
          setValueOptions(saveValueOptions);
        } else if (lastStr.includes('(')) {
          if (lastStr === '(') {
            setValueOptions(saveTableOptions);
          } else {
            const curStr = lastStr.replace('(', '');
            const tableStrList: any[] = curStr.split('.');
            if (tableStrList.length === 1) {
              const filterOptions = getFilterOption(curStr, saveTableOptions);
              setValueOptions(filterOptions);
            } else {
              const tableFieldsValues: any = columnValues[tableStrList[0]];
              const filterOptions = getFilterOption(tableStrList[1], tableFieldsValues);
              setValueOptions(filterOptions);
            }
          }
        } else if (lastStr.includes('.')) {
          const tableStrList: any = lastStr.split('.');
          const tableStr: any = tableStrList[0].replace('(', '');
          if (tableStrList.length === 1) {
            const tableFieldsValues: any = columnValues[tableStr];
            setValueOptions(tableFieldsValues);
          } else {
            const tableFieldsValues: any = columnValues[tableStr];
            const filterOptions = getFilterOption(tableStrList[1], tableFieldsValues);
            setValueOptions(filterOptions);
          }
        } else {
          const filterOptions = getFilterOption(lastStr, saveValueOptions);
          setValueOptions(filterOptions);
        }
      }
      setSearchValue(val);
    },
    [saveValueOptions]
  );

  return (
    <AutoComplete
      options={valueOptions}
      value={searchValue}
      style={{ width: 1200 }}
      onSelect={(val: string) => {
        const beforeValueList: string[] = [];
        saveInput.map(item => beforeValueList.push(item ? item : ''));
        const lastValue = beforeValueList[beforeValueList.length - 1];
        const splitStrList: any = lastValue.split('.');
        beforeValueList.pop();
        if (lastValue.includes('.')) {
          beforeValueList.push(splitStrList[0] + '.' + val);
        } else {
          if (lastValue.includes('(')) {
            const curStr = splitStrList[0].slice(0, 1);
            beforeValueList.push(curStr + val);
          } else {
            beforeValueList.push(val);
          }
        }
        const value: string = beforeValueList.join(' ');
        setSearchValue(value);
      }}
      onBlur={() => setValueOptions(saveValueOptions)}
      onFocus={() => {
        handleSearch(searchValue);
      }}
      onSearch={(val: string) => {
        handleSearch(val);
      }}
    >
      <TextArea rows={6} style={{ width: 1200 }} placeholder="input condition" />
    </AutoComplete>
  );
};

export { TextSearchView };
