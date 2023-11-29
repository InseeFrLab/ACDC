/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useContext } from 'react';
import ApiContext from '@/lib/api/context/apiContext';
import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import Main from '../../shared/layout/Main';
import CollectionForm from './DataCollectionForm';
import { transformLabels } from '../../../lib/utils/magmaUtils';

const CreateDataCollection = () => {
  const { t } = useTranslation(['dataCollectionForm']);
  const { getAllSeries } = useContext(ApiContext);
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['allSeries'],
    getAllSeries
  );

  if (isLoading)
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <CircularProgress />
      </Main>
    );
  if (isSuccess) {
    const dataSeries = data as StatisticalSeries[];
    const series = dataSeries.map((serie: any) => {
      const dataSerie: StatisticalSeries = {
        id: serie.id,
        label: transformLabels(serie.label),
        altLabel: serie.altLabel
          ? transformLabels(serie.altLabel)
          : {
              'fr-FR': '',
              'en-IE': '',
            },
      };
      return dataSerie;
    });
    return (
      <Main sx={{ justifyContent: 'flex-start' }}>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <CollectionForm series={series} />
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <Typography variant="h2" fontWeight="xl">
          Error message to be translated
        </Typography>
      </Main>
    );
  }
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <CollectionForm series={[]} />
    </Main>
  );
};

export default CreateDataCollection;
