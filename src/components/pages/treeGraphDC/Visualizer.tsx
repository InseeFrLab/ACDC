import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';

const Visualizer = () => {
  const { t } = useTranslation(['visualizer', 'form']);
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title', { ns: 'visualizer' })}
      </Typography>
    </Main>
  );
};

export default Visualizer;
