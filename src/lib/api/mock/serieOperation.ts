/* eslint-disable import/no-unresolved */
import s1001 from '@/assets/mockData/s1001.json';
import s1004 from '@/assets/mockData/s1004.json';
import s1005 from '@/assets/mockData/s1005.json';

export enum SeriesId {
  S1001 = 's1001',
  S1004 = 's1004',
  S1005 = 's1005',
}

export const getSeriesOperation = (id: string) => {
  switch (id) {
    case SeriesId.S1001:
      return s1001;
    case SeriesId.S1004:
      return s1004;
    case SeriesId.S1005:
      return s1005;
    default:
      return [];
  }
};

getSeriesOperation;
