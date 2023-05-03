import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  createTreeFromDataCollection,
  parseUserAttributeFromDataCollectionApi,
} from '@/lib/utils/dataCollectionUtils';
import { useQuery } from '@tanstack/react-query';
import { getDataCollectionById } from '@/lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '@/lib/model/dataCollectionApi';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import FlowTree from './FlowTree';

const Visualizer = () => {
  const { t } = useTranslation(['visualizer', 'form']);
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isSuccess } = useQuery(
    ['dataCollectionById', id],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    () => getDataCollectionById(id)
  );

  if (error)
    return (
      <Typography variant="h2" fontWeight="xl">
        Request Failed
      </Typography>
    );
  if (isLoading)
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title', { ns: 'visualizer' })}
        </Typography>
        <Typography variant="h2" fontWeight="xl">
          Loading...
        </Typography>
      </Main>
    );

  if (isSuccess) {
    const dataArray = data;
    const parseUserAttribute =
      parseUserAttributeFromDataCollectionApi(dataArray);
    const dataCollection: DataCollection = parseUserAttribute.json;
    const dataCollectionResult = createTreeFromDataCollection(dataCollection);
    console.log('dataCollectionResult:', dataCollectionResult);
    return (
      <Main sx={{ justifyContent: 'flex-start' }}>
        <FlowTree
          nodes={dataCollectionResult.nodes}
          edges={dataCollectionResult.edges}
        />{' '}
      </Main>
    );
  }
  return (
    <Typography variant="h2" fontWeight="xl">
      Request Failed
    </Typography>
  );
};
export default Visualizer;
