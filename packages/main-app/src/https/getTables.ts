import axiosWithRetries from './instance';
export const getTables = async () => {
  const tables_path = '//localhost:4002/api/common/getDatabaseFields';
  const { data } = await axiosWithRetries.get(tables_path);
  return data;
};
