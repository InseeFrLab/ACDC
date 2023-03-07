import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Main from '../../shared/layout/Main';
import DataGridHomePage from './DataTable';
import {
  DataCollection,
  DataCollectionRow,
} from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { getAllDataCollections } from '../../../lib/api/remote/dataCollectionApiFetch';

const Home = () => {
  const { t, i18n } = useTranslation(['home']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new');
  };

  const { data, error, isLoading, isSuccess } = useQuery(
    ['allDataCollection'],
    getAllDataCollections
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
          {t('title')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="xl">
          {t('description')}
        </Typography>
        <Typography variant="h2" fontWeight="xl">
          Loading...
        </Typography>
        <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
      </Main>
    );

  if (isSuccess) {
    const dataArray = data;
    const rows = dataArray.map((dataCollectionApi: DataCollectionApi) => {
      const dataCollection: DataCollection = dataCollectionApi.json;

      const labelData: Record<'fr-FR' | 'en-IE' | string, string> = {
        'fr-FR': dataCollection.label['fr-FR'],
        'en-IE': dataCollection.label['en-IE'],
      };
      const studyUnitReferenceData: Record<'fr-FR' | 'en-IE' | string, string> =
        {
          'fr-FR': dataCollection.studyUnitReference.label['fr-FR'],
          'en-IE': dataCollection.studyUnitReference.label['en-IE'],
        };
      const groupReferenceData: Record<'fr-FR' | 'en-IE' | string, string> = {
        'fr-FR':
          dataCollection.studyUnitReference.groupReference.label['fr-FR'],
        'en-IE':
          dataCollection.studyUnitReference.groupReference.label['en-IE'],
      };

      const label = labelData[i18n.language] || labelData['en-IE'];
      const studyUnitReference =
        studyUnitReferenceData[i18n.language] ||
        studyUnitReferenceData['en-IE'];
      const groupReference =
        groupReferenceData[i18n.language] || groupReferenceData['en-IE'];

      return {
        ...dataCollection,
        label,
        studyUnitReference,
        groupReference,
        action: dataCollection,
      };
    });
    console.log('Get all data collection: ', rows);
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          {t('title')}
        </Typography>
        <DataGridHomePage rows={rows} heightTable={400} />
        <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
      </Main>
    );
  }

  // TODO: Responsive table height
  return (
    <Main>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1" fontWeight="xl">
        {t('description', { ns: 'form' })}
      </Typography>
      <Typography variant="h2" fontWeight="xl">
        Request Failed
      </Typography>
      <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
        <Typography variant="subtitle1">{t('createButton')}</Typography>
      </Button>
    </Main>
  );
};

export default Home;
