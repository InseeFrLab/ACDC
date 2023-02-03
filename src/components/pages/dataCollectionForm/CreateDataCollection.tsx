import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Main from '../../shared/layout/Main';
import CollectionForm from './DataCollectionForm';

const CreateDataCollection = () => {
  const { t } = useTranslation(['dataCollectionForm']);
  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1">
        {t('description', { ns: 'form' })}
      </Typography>
      <CollectionForm />
    </Main>
  );
};

export default CreateDataCollection;
