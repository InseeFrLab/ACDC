/* eslint-disable @typescript-eslint/no-explicit-any */
import allDC from '@/assets/mockData/allDC.json';

export const getAllDataCollections = (): Promise<unknown[]> => {
  return Promise.resolve(allDC);
};

export const getDataCollection = (id: string): Promise<unknown> => {
  return Promise.resolve(allDC.filter((dc: any) => dc.id === id));
};
