// import { useRouter } from 'next/router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useMemo } from 'react';
import { getSessionStorage, setSessionStorage } from '../../utils/common_tools';
// import { setInitFlag } from '@/utils/tools';
import { BreadCrumbKey } from '../../utils/constant';

interface Props {
  title: string;
}

export const Breadcrumbs: React.FC<Props> = ({ title }: Props) => {
  // const router = useRouter();
  const breadList: any[] = getSessionStorage(BreadCrumbKey) || [];
  const defaultItem: any = {
    title,
  };
  const breadListDom: any = useMemo(() => {
    if (breadList && breadList.length) {
      const res: any[] = [];
      breadList.forEach((item: any, index: number) => {
        const dom = (
          <Link data-testid={`my-link-${index}`} to={item?.href}>
            <span
              data-testid={`my-span-${index}`}
              onClick={() => {
                // setInitFlag(router);
                breadList.splice(index, breadList.length - index);
                setSessionStorage(BreadCrumbKey, breadList);
              }}
            >
              {item?.title}
            </span>
          </Link>
        );
        res.push({ title: dom });
      });
      return res;
    }
  }, [breadList]);
  return breadListDom && <Breadcrumb items={[...breadListDom, defaultItem]} />;
};
