import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import StatisticalSeries from '../model/statisticalSeries';
import ApiContext from '../api/context/apiContext';

const useSerieOperation = (id: string) => {
  const apiClient = useContext(ApiContext);

  return useQuery(['serieOperation', id], async () => {
    const data: StatisticalSeries[] = await apiClient.getSerieOperation(id);
    return data;
  });
};

export default useSerieOperation;
