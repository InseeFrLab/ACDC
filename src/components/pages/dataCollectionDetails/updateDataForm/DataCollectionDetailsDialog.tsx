import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
  TextField,
  FormControl,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { deleteDataCollection } from '../../../../lib/api/remote/dataCollectionApiFetch';
import { DataCollection } from '../../../../lib/model/dataCollection';

interface DataCollectionDetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
}
const DataCollectionDetailsDialog = (
  props: DataCollectionDetailsDialogProps
) => {
  const { t, i18n } = useTranslation(['dataCollectionDetails', 'form']);
  const navigate = useNavigate();
  const { open, handleClose, dataCollectionState } = props;
  console.log(dataCollectionState.studyUnitReference);
  const [openDelete, setOpenDelete] = useState(false);
  const { isLoading, isError, isSuccess, mutate } =
    useMutation(deleteDataCollection);

  const handleCloseDelete = () => {
    setOpenDelete(false);
    navigate('/');
  };
  const handleDelete = (id: string) => {
    console.log(`Delete data collection with id: ${id}`);
    mutate(id);
    setOpenDelete(true);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.setDataCollectionState({
      ...dataCollectionState,
      label: {
        ...dataCollectionState.label,
        [i18n.language]: event.target.value,
      },
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    props.setDataCollectionState({
      ...dataCollectionState,
      description: {
        ...dataCollectionState.description,
        [i18n.language]: event.target.value,
      },
    });
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant="h5" color="text.secondary">
            {t('dataCollectionDetails')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                ID:{' '}
              </Typography>
              <Typography variant="body1">{dataCollectionState.id}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('statisticalOperation', { ns: 'dataCollectionForm' })}:{' '}
              </Typography>
              <Typography variant="body1">GroupeRef</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('statisticalOperationSeries', { ns: 'dataCollectionForm' })}:{' '}
              </Typography>
              <Typography variant="body1">
                {dataCollectionState.studyUnitReference.label[i18n.language]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 1,
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('label', { ns: 'form' })}:{' '}
              </Typography>
              <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
                <TextField
                  required
                  size="small"
                  label={t('label', { ns: 'form' })}
                  value={dataCollectionState.label[i18n.language]}
                  sx={{ marginRight: 2, width: '100%' }}
                  onChange={handleLabelChange}
                  id={dataCollectionState.label[i18n.language]}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 1,
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {t('description', { ns: 'form' })}:{' '}
              </Typography>
              <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
                <TextField
                  required
                  size="small"
                  label={t('description', { ns: 'form' })}
                  multiline
                  maxRows={4}
                  value={dataCollectionState.description[i18n.language]}
                  sx={{ marginRight: 2, width: '100%' }}
                  onChange={handleDescriptionChange}
                  id={dataCollectionState.description[i18n.language]}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 1,
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('version', { ns: 'form' })}:{' '}
              </Typography>
              <Typography variant="body1">
                {dataCollectionState.version}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 1,
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('lastUpdate', { ns: 'form' })}:{' '}
              </Typography>
              <Typography variant="body1">
                {moment(dataCollectionState.versionDate).format(
                  'DD/MM/YYYYHH:mm'
                )}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(dataCollectionState.id);
            }}
            variant="outlined"
            sx={{ marginLeft: 2 }}
          >
            <Typography variant="body1" fontWeight="xl">
              {t('delete', { ns: 'form' })}
            </Typography>
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h5">{t('deleteCollectionEvent')}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess ? t('successEvent') : ''}
            {isLoading ? t('loading') : ''}
            {isError ? t('error') : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDelete} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataCollectionDetailsDialog;
