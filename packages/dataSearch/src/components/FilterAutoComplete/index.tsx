import React, { useEffect, useState } from 'react';
import { AutoComplete, Form, DatePicker } from 'antd';
import { getFilterOption } from '../../utils/tools';
import { Time_Fields } from '../../utils/constant';

interface Props {
  form: any;
  index: number;
  name: any;
  enums: any;
  selectIsDateType: boolean;
  formKey: string;
}

const FilterAutoCompolete: React.FC<Props> = ({
  form,
  formKey,
  index,
  name,
  selectIsDateType,
  enums,
}: Props) => {
  const [valueOptions, setValueOptions] = useState<any[]>([]);
  const [EnumsData, setEnumsData] = useState<any>({});
  const [EnumsKeys, setEnumsKeys] = useState<any[]>([]);
  const [isDateType, setIsDateType] = useState<boolean>(selectIsDateType);
  useEffect(() => {
    if (enums) {
      const formDataCur = form.getFieldsValue();
      const list = formDataCur[formKey];
      const isDate = Time_Fields.includes(list[index]?.column);
      setIsDateType(isDate);
      const { EnumsData, EnumsKeys } = enums;
      setEnumsData(EnumsData);
      setEnumsKeys(EnumsKeys);
    }
  }, [selectIsDateType, enums]);
  return (
    <Form.Item label="" name={[name, 'value']}>
      {isDateType && (
        <DatePicker
          showTime
          showNow
          changeOnBlur={true}
          style={{ width: 400 }}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择时间"
        />
      )}
      {!isDateType && (
        <AutoComplete
          placeholder="value"
          options={valueOptions}
          style={{ width: 400 }}
          onBlur={() => setValueOptions([])}
          onFocus={() => {
            const formData = form.getFieldsValue();
            let column: string = formData[formKey][index]?.column;
            if (column) {
              column = column
                .split('_')
                .map(item => item.charAt(0).toUpperCase() + item.slice(1))
                .join('');
              if (EnumsKeys.includes(column)) {
                setValueOptions(EnumsData[column]);
              } else {
                setValueOptions([]);
              }
            }
          }}
          onSearch={(val: string) => {
            const formData = form.getFieldsValue();
            let column: string = formData[formKey][index]?.column;
            column = column
              .split('_')
              .map(item => item.charAt(0).toUpperCase() + item.slice(1))
              .join('');
            const filterOptions = getFilterOption(val, EnumsData[column]);
            setValueOptions(filterOptions);
          }}
        />
      )}
    </Form.Item>
  );
};

export { FilterAutoCompolete };
