import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '@/lib/api/context/apiContext';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueries } from '@tanstack/react-query';
import { Typography, Box } from '@mui/material';
import {
  PoguesQuestionnaire,
  PoguesQuestionnaireResponse,
} from '@/lib/model/poguesQuestionnaire';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import { downloadFile } from '@/lib/utils/dataTransformation';
import getCurrentDate from '@/lib/utils/otherUtils';
import { parseUserAttributeFromDataCollectionApi } from '@/lib/utils/dataCollectionUtils';
import { DataCollection } from '@/lib/model/dataCollection';
import DataCollectionApi from '@/lib/model/dataCollectionApi';
import { updateDataCollection } from '@/lib/api/remote/dataCollectionApiFetch';
import { transformLabels } from '@/lib/utils/magmaUtils';
import Main from '../../shared/layout/Main';
import CollectionEventDisplay from './CollectionEvent';
import BottomActionBar from './BottomActionBar';
import CollectionGroupDisplay from './CollectionGroupDisplay';
import DataCollectionDisplay from './DataCollectionDisplay';
import SaveDialog from './dialogs/SaveDialog';
import DeleteDialog from './dialogs/DeleteDialog';
import PublishDialog from './dialogs/PublishDialog';

const DataCollectionDetails = () => {
  const { t } = useTranslation([
    'DataCollectionDetails',
    'Form',
    'userAttributeForm',
    'CollectionEvent',
  ]);
  const navigate = useNavigate();
  const { idDataCollection } = useParams();
  const [dataCollection, setDataCollection] = useState<DataCollection>(
    {} as DataCollection
  );
  const [dataCollectionState, setDataCollectionState] =
    useState<DataCollection>({} as DataCollection);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const [notSavedState, setNotSavedState] = useState(false);
  const [questionnaires, setQuestionnaires] = useState<PoguesQuestionnaire[]>(
    []
  );
  let series: StatisticalSeries[] = [];

  const {
    getAllSeries,
    getQuestionnaires,
    publishDataCollection,
    getDataCollection,
  } = useContext(ApiContext);

  const [dataCollectionQuery, questionnaireQuery, seriesQuery, publishQuery] =
    useQueries({
      queries: [
        {
          queryKey: ['dataCollection', idDataCollection],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          queryFn: () => getDataCollection(idDataCollection),
          onSuccess: (data: DataCollectionApi) => {
            const parsedData = parseUserAttributeFromDataCollectionApi(data);
            setDataCollectionState(parsedData.json);
            setDataCollection(parsedData.json);
          },
          refetchOnWindowFocus: true,
        },
        {
          queryKey: ['allQuestionnaires'],
          queryFn: getQuestionnaires,
          onSuccess: () => {
            const questionnairesResult = (
              questionnaireQuery.data as PoguesQuestionnaireResponse[]
            ).map((questionnaire: PoguesQuestionnaireResponse) => {
              const dateQuestionnaire = new Date(questionnaire.lastUpdatedDate);
              return {
                id: questionnaire.id,
                label: questionnaire.Label[0],
                date: dateQuestionnaire.toLocaleDateString(),
              };
            });
            setQuestionnaires(questionnairesResult);
            console.log('got questionnaires from Pogues');
          },
          refetchOnWindowFocus: false,
        },
        {
          queryKey: ['allSeries'],
          queryFn: getAllSeries,
          onSuccess: () => {
            series = (seriesQuery.data as StatisticalSeries[]).map(
              (serie: any) => {
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
              }
            );
          },
          refetchOnWindowFocus: false,
        },
        {
          queryKey: ['publishDataCollectionQuery', idDataCollection],
          queryFn: () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return publishDataCollection(idDataCollection);
          },
          enabled: false,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          onSuccess(data: unknown) {
            console.log('Fetching json with ddi success: ', data);
            downloadFile(
              JSON.stringify(data),
              'export.json',
              'application/json'
            );
            setOpenPublish(false);
          },
        },
      ],
    });
  // TODO : Loading & error indicator somewhere in the page
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
    // mutate(updatedDataCollection);
    setNotSavedState(true);
    setOpenDelete(true);
  };

  const handleDeleteCollectionGroup = (id: string) => {
    console.log('Delete Collection Group: ', id);
    const { attributeValue } = dataCollectionState.userAttributePair[0];
    if (!Array.isArray(attributeValue)) {
      return;
    }

    const updatedUserAttributeValue = attributeValue.filter(
      (event) => event.id !== id
    );
    setDataCollectionState({
      ...dataCollectionState,
      userAttributePair: [
        {
          ...dataCollectionState.userAttributePair[0],
          attributeValue: updatedUserAttributeValue,
        },
        ...dataCollectionState.userAttributePair.slice(1),
      ],
    });

    console.log(
      'Updated Data Collection deleting Collection Group: ',
      dataCollectionState
    );
    setNotSavedState(true);
    setOpenDelete(true);
  };

  const handleSave = () => {
    const updatedDataCollection: DataCollectionApi = {
      id: idDataCollection,
      json: dataCollectionState,
    };
    // TEMPORARY FIX
    updatedDataCollection.json.userAttributePair[
      updatedDataCollection.json.userAttributePair.findIndex(
        (pair) => pair.attributeKey === 'extension:surveyStatus'
      )
    ].attributeValue = `{"code":"T","label":"Enquête d'intérêt général et de qualité statistique à caractère obligatoire"}`;
    // const now = Date.now();
    updatedDataCollection.json.versionDate = getCurrentDate();

    console.log('Updated Data Collection: ', updatedDataCollection);
    mutate(updatedDataCollection);
    setDataCollectionState(updatedDataCollection.json);
    setNotSavedState(false);
    setOpenSave(true);
  };

  const handlePublish = () => {
    console.log('Publish Data Collection: ', dataCollectionState.id);
    publishQuery.refetch();
    setOpenPublish(true);

    publishQuery.isError ? console.log(publishQuery.error) : null;
    publishQuery.isLoading ? console.log('publish loading') : null;
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

  if (dataCollectionQuery.isLoading) {
    return (
      <Main>
        <Typography variant="h2" fontWeight="xl">
          Chargement des données...
        </Typography>
      </Main>
    );
  }
  if (dataCollectionQuery.isSuccess) {
    return (
      <Main sx={{ justifyContent: 'flex-start' }}>
        <DataCollectionDisplay
          dataCollectionState={dataCollectionState}
          setDataCollectionState={setDataCollectionState}
          series={series}
          setNotSavedState={setNotSavedState}
        />
        {dataCollectionState.collectionEvents.length > 0 ? (
          <>
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
                {t('title', { ns: 'collectionEvent' })}
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
          </>
        ) : (
          <Box
            sx={{
              paddingTop: 2,
              my: 2,
              display: 'flex',
              justifyContent: 'center',
              borderTop: '2px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h2">
              {t('noEvent', { ns: 'collectionEvent' })}
            </Typography>
          </Box>
        )}

        {dataCollectionState.userAttributePair.length > 0 &&
        Array.isArray(
          dataCollectionState.userAttributePair[0].attributeValue
        ) &&
        dataCollectionState.userAttributePair[0].attributeValue.length > 0 ? (
          <>
            <Box
              sx={{
                paddingTop: 2,
                my: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="text.secondary">
                {t('title', { ns: 'userAttributeForm' })}
              </Typography>
            </Box>
            <Box
              sx={{
                marginBottom: 10,
              }}
            >
              {dataCollectionState.userAttributePair[0].attributeValue.map(
                (attributeValue) => (
                  <CollectionGroupDisplay
                    key={attributeValue.id}
                    attributeValue={attributeValue}
                    dataCollectionState={dataCollectionState}
                    setDataCollectionState={setDataCollectionState}
                    handleDeleteUserAttribute={handleDeleteCollectionGroup}
                    setNotSavedState={setNotSavedState}
                  />
                )
              )}
            </Box>
          </>
        ) : null}

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
        <PublishDialog
          openPublish={openPublish}
          setOpenPublish={setOpenPublish}
          isError={publishQuery.isError}
          isLoading={publishQuery.isLoading}
        />
        <BottomActionBar
          dataCollection={dataCollection}
          handleSave={handleSave}
          questionnaires={questionnaires}
          notSavedState={notSavedState}
          handlePublish={handlePublish}
        />
      </Main>
    );
  }
  return (
    <Main>
      <Typography variant="h2" fontWeight="xl">
        Request not found
      </Typography>
    </Main>
  );
};

export default DataCollectionDetails;
