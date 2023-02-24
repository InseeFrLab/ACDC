/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import { getAllSeries } from '@/lib/api/remote/magmaSeries';
import Main from '../../shared/layout/Main';
import CollectionForm from './DataCollectionForm';
import { transformLabels } from '../../../lib/utils/magmaUtils';

const CreateDataCollection = () => {
  const { t } = useTranslation(['dataCollectionForm']);
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['allSeries'],
    getAllSeries
  );
  const series: StatisticalSeries[] = [];

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
    data.forEach((serie: any) => {
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
      series.push(dataSerie);
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
      <CollectionForm series={series} />
    </Main>
  );
};

export default CreateDataCollection;
