import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { parseUserAttributeFromDataCollectionApi } from '@/lib/utils/dataCollectionUtils';
import {
  createNodeFromCollectionGroup,
  createTreeFromDataCollection,
  deleteCollectionGroupNode,
} from '@/lib/utils/visualizationUtils';
import { useQuery } from '@tanstack/react-query';
import { getDataCollectionById } from '@/lib/api/remote/dataCollectionApiFetch';
import { init } from 'i18next';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import FlowTree from './FlowTree';
import BottomVisualizationBar from './ActionBar';

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
    const initialTree = createTreeFromDataCollection(dataCollection);
    const { attributeValue } = dataCollection.userAttributePair[0];

    // Convert attributeValue to an array if it's a string
    const attributeValueArray = Array.isArray(attributeValue)
      ? attributeValue
      : [];
    const test = createNodeFromCollectionGroup(
      attributeValueArray[0],
      initialTree.nodes,
      initialTree.edges
    );
    return (
      <Main sx={{ justifyContent: 'flex-start' }}>
        <FlowTree nodes={initialTree.nodes} edges={initialTree.edges} />{' '}
        <BottomVisualizationBar
          handleReset={() => {}}
          dataCollection={dataCollection}
        />
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
