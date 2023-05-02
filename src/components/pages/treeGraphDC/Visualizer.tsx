import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createTreeFromDataCollection } from '@/lib/utils/dataCollectionUtils';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import FlowTree from './FlowTree';

const Visualizer = () => {
  const { t } = useTranslation(['visualizer', 'form']);
  const dataCollection = useLocation().state.dataCollection as DataCollection;

  const dataCollectionResult = createTreeFromDataCollection(dataCollection);
  console.log('dataCollectionResult:', dataCollectionResult);
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title', { ns: 'visualizer' })}
      </Typography>
      <FlowTree
        nodes={dataCollectionResult.nodes}
        edges={dataCollectionResult.edges}
      />
    </Main>
  );
};

export default Visualizer;
