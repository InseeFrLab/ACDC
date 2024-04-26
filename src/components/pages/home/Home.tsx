import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import ApiContext from '@/lib/api/context/apiContext';
import LanguageRecord from '@/lib/model/languageRecord';
import { parseUserAttributeFromDataCollectionApi } from '@/lib/utils/dataCollectionUtils';
import Main from '../../shared/layout/Main';
import DataGridHomePage from './DataTable';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new');
  };
  const { getAllDataCollections } = useContext(ApiContext);

  const { data, error, isLoading, isSuccess } = useQuery(
    ['allDataCollection'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
          Chargement des données...
        </Typography>
      </Main>
    );

  if (isSuccess) {
    const dataArray = data as DataCollectionApi[];
    const parseUserAttribute = dataArray.map(
      (dataCollectionApi: DataCollectionApi) => {
        return parseUserAttributeFromDataCollectionApi(dataCollectionApi);
      }
    );
    const rows = parseUserAttribute.map(
      (dataCollectionApi: DataCollectionApi) => {
        const dataCollection: DataCollection = dataCollectionApi.json;

        const labelData: LanguageRecord = {
          'fr-FR': dataCollection.label['fr-FR'],
          'en-IE': dataCollection.label['en-IE'],
        };
        const studyUnitReferenceData: LanguageRecord = {
          'fr-FR': dataCollection.studyUnitReference.label['fr-FR'],
          'en-IE': dataCollection.studyUnitReference.label['en-IE'],
        };
        const groupReferenceData: LanguageRecord = {
          'fr-FR':
            dataCollection.studyUnitReference.groupReference.label['fr-FR'],
          'en-IE':
            dataCollection.studyUnitReference.groupReference.label['en-IE'],
        };

        const label =
          labelData[i18n.language as keyof LanguageRecord] ||
          labelData['en-IE'];
        const studyUnitReference =
          studyUnitReferenceData[i18n.language as keyof LanguageRecord] ||
          studyUnitReferenceData['en-IE'];
        const groupReference =
          groupReferenceData[i18n.language as keyof LanguageRecord] ||
          groupReferenceData['en-IE'];

        return {
          ...dataCollection,
          label,
          studyUnitReference,
          groupReference,
          action: dataCollection,
        };
      }
    );
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl" fontFamily="Oswald">
          {t('title', { ns: 'home' })}
        </Typography>
        <DataGridHomePage rows={rows} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="customContained"
            sx={{ marginTop: '1rem' }}
            onClick={handleClick}
          >
            <Typography fontFamily="Lato">
              {t('createButton', { ns: 'home' })}
            </Typography>
          </Button>
        </Box>
      </Main>
    );
  }

  return (
    <Main>
      <Typography variant="h2" fontWeight="xl">
        {t('title', { ns: 'home' })}
      </Typography>
      <Typography variant="subtitle1" fontWeight="xl">
        {t('description', { ns: 'form' })}
      </Typography>
      <Typography variant="h2" fontWeight="xl" fontFamily="Oswald">
        Request Failed
      </Typography>
      <Button
        variant="customContained"
        sx={{ marginTop: '1rem' }}
        onClick={handleClick}
      >
        <Link to="new">{t('createButton', { ns: 'home' })}</Link>
      </Button>
    </Main>
  );
};

export default Home;
