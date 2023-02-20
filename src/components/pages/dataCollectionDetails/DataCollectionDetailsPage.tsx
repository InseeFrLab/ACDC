import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Main from '../../shared/layout/Main';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import DataCollectionDetailsDialog from './updateDataForm/DataCollectionDetailsDialog';
import CollectionEventDisplay from './CollectionEvent';
import BottomActionBar from './BottomActionBar';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import UserAttributeDisplay from './UserAttributeDisplay';

const DataCollectionDetails = () => {
  const { t, i18n } = useTranslation([
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

  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseSave = () => {
    setOpenSave(false);
    const dataCollectionLink = dataCollectionState;
    navigate(`/collection/${dataCollectionLink.id}`, {
      state: { dataCollection: dataCollectionLink },
    });
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

  return (
    <Main sx={{ justifyContent: 'flex-start' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h3" fontWeight="xl">
          {dataCollection.label[i18n.language]}
        </Typography>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
          <Typography variant="body1" fontWeight="xl">
            {t('showDetails', { ns: 'dataCollectionDetails' })}
          </Typography>
        </Button>
      </Box>

      <DataCollectionDetailsDialog
        open={open}
        setOpen={setOpen}
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
      />
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
        <Typography variant="h5">
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
        <Typography variant="h5">
          {t('title', { ns: 'userAttributeForm' })}:
        </Typography>
      </Box>
      <Box>
        {dataCollectionState.userAttributePair.map((attribute) => {
          return (
            <UserAttributeDisplay
              key={attribute.attributeKey}
              userAttribute={attribute}
              dataCollectionState={dataCollectionState}
              setDataCollectionState={setDataCollectionState}
              handleDeleteUserAttribute={() => {
                console.log('Delete');
              }}
            />
          );
        })}
      </Box>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h5">
            {t('deleteCollectionEvent', { ns: 'dataCollectionDetails' })}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess
              ? t('successEvent', { ns: 'dataCollectionDetails' })
              : ''}
            {isLoading ? t('loading', { ns: 'form' }) : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDelete} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSave} onClose={handleCloseSave}>
        <DialogTitle>
          <Typography variant="h5">
            {t('saveDataCollection', { ns: 'dataCollectionDetails' })}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess
              ? t('successDataCollection', { ns: 'dataCollectionDetails' })
              : ''}
            {isLoading ? t('loading', { ns: 'form' }) : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseSave} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
      <BottomActionBar
        dataCollection={dataCollection}
        dataCollectionState={dataCollectionState}
        handleSave={handleSave}
      />
    </Main>
  );
};

export default DataCollectionDetails;
