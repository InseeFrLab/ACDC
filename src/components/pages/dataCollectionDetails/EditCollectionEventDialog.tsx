import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { DatePicker } from '@mui/x-date-pickers';
import { formatISO } from 'date-fns';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';

import CollectionEvent from '../../../lib/model/collectionEvents';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';

interface EditCollectionEventDialogProps {
  open: boolean;
  handleClose: () => void;
  collectionEventState: CollectionEvent;
  setCollectionEventState: (collectionEvent: CollectionEvent) => void;
}

const EditCollectionEventDialog = (props: EditCollectionEventDialogProps) => {
  const { t, i18n } = useTranslation(['dataCollectionDetails']);
  const navigate = useNavigate();
  const { open, handleClose, collectionEventState } = props;

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.setCollectionEventState({
      ...collectionEventState,
      label: {
        ...collectionEventState.label,
        [i18n.language]: event.target.value,
      },
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    props.setCollectionEventState({
      ...collectionEventState,
      label: {
        ...collectionEventState.description,
        [i18n.language]: event.target.value,
      },
    });
  };

  const handleSave = () => {
    console.log('Update CollectionEvent: ', collectionEventState);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" color="text.secondary">
          {t('editEvent')}
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
            <Typography variant="body1">{collectionEventState.id}</Typography>
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
              {t('label')}:{' '}
            </Typography>
            <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
              <TextField
                required
                size="small"
                label={t('label')}
                value={collectionEventState.label[i18n.language]}
                sx={{ marginRight: 2, width: '100%' }}
                onChange={handleLabelChange}
                id={collectionEventState.label[i18n.language]}
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
              {t('description')}:{' '}
            </Typography>
            <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
              <TextField
                required
                size="small"
                label={t('description')}
                multiline
                maxRows={4}
                value={collectionEventState.description[i18n.language]}
                sx={{ marginRight: 2, width: '100%' }}
                onChange={handleDescriptionChange}
                id={collectionEventState.description[i18n.language]}
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
              {t('dataCollectionDate')}:
            </Typography>
          </Box>
          <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
            <DatePicker
              label={t('collectionStartDate')}
              value={startDate}
              onChange={(date) => date && setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label={t('collectionEndDate')}
              value={endDate}
              minDate={startDate}
              onChange={(date) => date && setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>

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
              {t('modeOfCollection')}:{' '}
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
              {t('version')}:{' '}
            </Typography>
            <Typography variant="body1">
              {collectionEventState.version}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSave();
          }}
          variant="outlined"
          sx={{ marginLeft: 2 }}
        >
          <Typography variant="body1" fontWeight="xl">
            {t('save')}
          </Typography>
        </Button>
        <Button variant="contained" onClick={handleClose} autoFocus>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionEventDialog;
