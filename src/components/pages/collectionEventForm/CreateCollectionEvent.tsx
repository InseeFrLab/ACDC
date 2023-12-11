import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Main from '../../shared/layout/Main';
import EventForm from './CollectionEventForm';
import {
	DataCollection,
	DataCollectionApi,
} from '../../../lib/model/dataCollection';
import { PoguesQuestionnaire } from '../../../lib/model/poguesQuestionnaire';

const CreateCollectionEvent = () => {
  const { t } = useTranslation(['collectionEvent', 'form']);
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  const questionnaires: PoguesQuestionnaire[] = useLocation().state
    .questionnaires as PoguesQuestionnaire[];
  console.log('Create New collection  for dataCollection:', dataCollection);
  const dataCollectionApi: DataCollectionApi = {
    id: dataCollection.id,
    json: dataCollection,
  };

  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>
      <EventForm
        DataCollectionApi={dataCollectionApi}
        questionnaires={questionnaires}
      />
    </Main>
  );
};

export default CreateCollectionEvent;
