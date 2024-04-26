import { debounce } from 'lodash';
import { useRef } from 'react';

export const useMyDebounce = (fun: any, wait: number, options?: any) => {
  const myRef: any = useRef();
  if (!myRef.current) {
    myRef.current = debounce(fun, wait, options);
  }
  return myRef;
};
