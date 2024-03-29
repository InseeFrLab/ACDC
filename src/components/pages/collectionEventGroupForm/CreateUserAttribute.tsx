import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import CollectionGroupForm from './UserAttributeForm';
import { DataCollection } from '../../../lib/model/dataCollection';

const CreateCollectionGroup = () => {
  const { t } = useTranslation(['userAttributeForm', 'form']);
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  console.log('Create New UserAttribute for dataCollection:', dataCollection);
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title', { ns: 'userAttributeForm' })}
      </Typography>
      <CollectionGroupForm dataCollection={dataCollection} />
    </Main>
  );
};

export default CreateCollectionGroup;
