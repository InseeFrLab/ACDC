import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueries } from '@tanstack/react-query';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import getQuestionnaires from '@/lib/api/remote/poguesQuestionnaires';
import {
  PoguesQuestionnaire,
  PoguesQuestionnaireResponse,
} from '@/lib/model/poguesQuestionnaire';
import { getAllSeries } from '@/lib/api/remote/magmaSeries';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import CollectionEventDisplay from './CollectionEvent';
import BottomActionBar from './BottomActionBar';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import UserAttributeDisplay from './UserAttributeDisplay';
import DataCollectionDisplay from './DataCollectionDisplay';
import { transformLabels } from '../../../lib/utils/magmaUtils';

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
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const questionnaires: PoguesQuestionnaire[] = [];
  const series: StatisticalSeries[] = [];

  const [questionnaireQuery, seriesQuery] = useQueries({
    queries: [
      { queryKey: ['allQuestionnaires'], queryFn: getQuestionnaires },
      { queryKey: ['allSeries'], queryFn: getAllSeries },
    ],
  });
  // TODO : Loading & error indicator somewhere in the page
  questionnaireQuery.isSuccess
    ? questionnaireQuery.data.forEach(
        (questionnaire: PoguesQuestionnaireResponse) => {
          const dateQuestionnaire = new Date(questionnaire.lastUpdatedDate);
          const dataQuestionnaire: PoguesQuestionnaire = {
            id: questionnaire.id,
            label: questionnaire.Label[0],
            date: dateQuestionnaire.toLocaleDateString(),
          };
          questionnaires.push(dataQuestionnaire);
        }
      )
    : null;
  seriesQuery.isSuccess
    ? seriesQuery.data.forEach((serie: any) => {
        const dataSerie: StatisticalSeries = {
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
        series.push(dataSerie);
      })
    : null;

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
        {dataCollectionState.userAttributePair.map((attribute) => {
          return (
            <UserAttributeDisplay
              key={attribute.attributeKey}
              userAttribute={attribute}
              dataCollectionState={dataCollectionState}
              setDataCollectionState={setDataCollectionState}
              handleDeleteUserAttribute={() => console.log('delete')}
            />
          );
        })}
      </Box>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h5">
            {t('deleteDataCollection', { ns: 'dataCollectionDetails' })}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogContentText>
            {isSuccess
              ? t('successEvent', { ns: 'dataCollectionDetails' })
              : ''}
            {isLoading ? <CircularProgress /> : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDelete} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSave}>
        <DialogTitle>
          <Typography variant="h5">
            {t('saveDataCollection', { ns: 'dataCollectionDetails' })}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogContentText>
            {isLoading ? <CircularProgress /> : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenSave(false);
            }}
            autoFocus
          >
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
      <BottomActionBar
        dataCollection={dataCollection}
        dataCollectionState={dataCollectionState}
        handleSave={handleSave}
        questionnaires={questionnaires}
      />
    </Main>
  );
};

export default DataCollectionDetails;
