/* eslint-disable import/no-unresolved */
import allSeries from '@/assets/mockData/allSeries.json';
import s1001 from '@/assets/mockData/s1001.json';
import s1004 from '@/assets/mockData/s1004.json';
import s1005 from '@/assets/mockData/s1005.json';

export enum SeriesId {
  S1001 = 's1001',
  S1004 = 's1004',
  S1005 = 's1005',
}

export const getAllSeries = (): Promise<unknown[]> => {
  return Promise.resolve(allSeries);
};

export function getSerieOperation(id: string): Promise<unknown[]> {
  switch (id) {
    case SeriesId.S1001:
      return Promise.resolve(s1001);
    case SeriesId.S1004:
      return Promise.resolve(s1004);
    case SeriesId.S1005:
      return Promise.resolve(s1005);
    default:
      return Promise.resolve([]);
  }
}
