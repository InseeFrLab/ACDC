import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Main from '../../shared/layout/Main';
import EventForm from './CollectionEventForm';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { DataCollection } from '../../../lib/model/dataCollection';
import getQuestionnaires from '../../../lib/api/remote/poguesQuestionnaires';
import {
  PoguesQuestionnaire,
  PoguesQuestionnaireResponse,
} from '../../../lib/model/poguesQuestionnaire';

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

  // const { data, error, isLoading, isSuccess } = useQuery(
  //   ['allQuestionnaires'],
  //   getQuestionnaires
  // );

  // if (error)
  //   return (
  //     <Typography variant="h2" fontWeight="xl">
  //       Request Failed
  //     </Typography>
  //   );
  // if (isLoading)
  //   return (
  //     <Main>
  //       <Typography variant="h2" fontWeight="xl">
  //         {t('retrieveQuestionnaireModelPending', { ns: 'collectionEvent' })}
  //       </Typography>
  //     </Main>
  //   );

  // if (isSuccess) {
  //   const questionnaires: PoguesQuestionnaire[] = [];
  //   // TODO : Switch to full data set
  //   data.forEach((questionnaire: PoguesQuestionnaireResponse) => {
  //     const dateQuestionnaire = new Date(questionnaire.lastUpdatedDate);
  //     const dataQuestionnaire: PoguesQuestionnaire = {
  //       id: questionnaire.id,
  //       label: questionnaire.Label[0],
  //       date: dateQuestionnaire.toLocaleDateString(),
  //     };
  //     questionnaires.push(dataQuestionnaire);
  //   });

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
  // }
  // return (
  //   <Typography variant="h2" fontWeight="xl">
  //     Request Failed
  //   </Typography>
  // );
};

export default CreateCollectionEvent;
