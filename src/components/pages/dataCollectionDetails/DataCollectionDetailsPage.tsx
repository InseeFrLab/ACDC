import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '@/lib/api/context/apiContext';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueries } from '@tanstack/react-query';
import { Typography, Box } from '@mui/material';
import {
  PoguesQuestionnaire,
  PoguesQuestionnaireResponse,
} from '@/lib/model/poguesQuestionnaire';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import CollectionEventDisplay from './CollectionEvent';
import BottomActionBar from './BottomActionBar';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import CollectionGroupDisplay from './CollectionGroupDisplay';
import DataCollectionDisplay from './DataCollectionDisplay';
import { transformLabels } from '../../../lib/utils/magmaUtils';
import SaveDialog from './dialogs/SaveDialog';
import DeleteDialog from './dialogs/DeleteDialog';

const DataCollectionDetails = () => {
  const { t } = useTranslation([
    'DataCollectionDetails',
    'Form',
    'userAttributeForm',
    'CollectionEvent',
  ]);
  const navigate = useNavigate();
  const dataCollection = useLocation().state.dataCollection as DataCollection;
  const [dataCollectionState, setDataCollectionState] =
    useState(dataCollection);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [notSavedState, setNotSavedState] = useState(false);
  let questionnaires: PoguesQuestionnaire[] = [];
  let series: StatisticalSeries[] = [];

  const { getAllSeries, getQuestionnaires } = useContext(ApiContext);

  const [questionnaireQuery, seriesQuery] = useQueries({
    queries: [
      { queryKey: ['allQuestionnaires'], queryFn: getQuestionnaires },
      { queryKey: ['allSeries'], queryFn: getAllSeries },
    ],
  });
  // TODO : Loading & error indicator somewhere in the page
  questionnaireQuery.isSuccess &&
    (questionnaires = (
      questionnaireQuery.data as PoguesQuestionnaireResponse[]
    ).map((questionnaire: PoguesQuestionnaireResponse) => {
      const dateQuestionnaire = new Date(questionnaire.lastUpdatedDate);
      return {
        id: questionnaire.id,
        label: questionnaire.Label[0],
        date: dateQuestionnaire.toLocaleDateString(),
      };
    }));

  seriesQuery.isSuccess &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (series = (seriesQuery.data as StatisticalSeries[]).map((serie: any) => {
      return {
        id: serie.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        label: transformLabels(serie.label),
        altLabel: serie.altLabel
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            transformLabels(serie.altLabel)
          : {
              'fr-FR': '',
              'en-IE': '',
            },
      };
    }));

  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteCollectionEvent = (id: string) => {
    console.log('Delete Collection Event: ', id);
    const updatedCollectionEvents = dataCollectionState.collectionEvents.filter(
      (event) => event.id !== id
    );
    setDataCollectionState({
      ...dataCollectionState,
      collectionEvents: updatedCollectionEvents,
    });
    const updatedDataCollection: DataCollectionApi = {
      id: dataCollectionState?.id,
      json: dataCollectionState,
    };
    console.log(
      'Updated Data Collection deleting Collection Event: ',
      updatedDataCollection
    );
    mutate(updatedDataCollection);
    setOpenDelete(true);
  };

  const handleDeleteCollectionGroup = (id: string) => {
    console.log('Delete Collection Group: ', id);
    const updatedUserAttributeValue =
      dataCollectionState.userAttributePair[0].attributeValue.filter(
        (event) => event.id !== id
      );
    setDataCollectionState({
      ...dataCollectionState,
      userAttributePair: [
        {
          ...dataCollectionState.userAttributePair[0],
          attributeValue: updatedUserAttributeValue,
        },
      ],
    });

    const updatedDataCollection: DataCollectionApi = {
      id: dataCollectionState?.id,
      json: dataCollectionState,
    };
    console.log(
      'Updated Data Collection deleting Collection Group: ',
      updatedDataCollection
    );
    mutate(updatedDataCollection);
    setDataCollectionState(updatedDataCollection.json);
    setNotSavedState(true);
    setOpenDelete(true);
  };

  const handleSave = () => {
    const updatedDataCollection: DataCollectionApi = {
      id: dataCollection?.id,
      json: dataCollectionState,
    };
    const now = Date.now();
    const today: string = new Date(now).toISOString();
    updatedDataCollection.json.versionDate = today;

    console.log('Updated Data Collection: ', updatedDataCollection);
    mutate(updatedDataCollection);
    setDataCollectionState(updatedDataCollection.json);
    setNotSavedState(false);
    setOpenSave(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenSave(false);
      const dataCollectionLink = dataCollectionState;
      navigate(`/collection/${dataCollectionLink.id}`, {
        state: { dataCollection: dataCollectionLink },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <DataCollectionDisplay
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
        series={series}
        setNotSavedState={setNotSavedState}
      />
      <Box
        sx={{
          paddingTop: 2,
          marginTop: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          borderTop: '2px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="text.secondary">
          {t('title', { ns: 'collectionEvent' })}:
        </Typography>
      </Box>
      <Box>
        {dataCollectionState.collectionEvents.map((event) => {
          return (
            <CollectionEventDisplay
              key={event.id}
              collectionEvent={event}
              handleDeleteCollectionEvent={handleDeleteCollectionEvent}
              dataCollectionState={dataCollectionState}
              setDataCollectionState={setDataCollectionState}
              questionnaires={questionnaires}
              setNotSavedState={setNotSavedState}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          paddingTop: 2,
          marginTop: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="text.secondary">
          {t('title', { ns: 'userAttributeForm' })}:
        </Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 10,
        }}
      >
        {dataCollectionState.userAttributePair[0].attributeValue.map(
          (attributeValue) => {
            return (
              <CollectionGroupDisplay
                key={attributeValue.id}
                attributeValue={attributeValue}
                dataCollectionState={dataCollectionState}
                setDataCollectionState={setDataCollectionState}
                handleDeleteUserAttribute={handleDeleteCollectionGroup}
                setNotSavedState={setNotSavedState}
              />
            );
          }
        )}
      </Box>
      <DeleteDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <SaveDialog
        openSave={openSave}
        setOpenSave={setOpenSave}
        isError={isError}
        isLoading={isLoading}
      />
      <BottomActionBar
        dataCollection={dataCollection}
        handleSave={handleSave}
        questionnaires={questionnaires}
        notSavedState={notSavedState}
      />
    </Main>
  );
};

export default DataCollectionDetails;
