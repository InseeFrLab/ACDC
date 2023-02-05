import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';

import CollectionEvent from '../../../lib/model/collectionEvents';
import { DataCollection } from '../../../lib/model/dataCollection';
import {
  TypeOfModeOfCollection,
  typeMode,
} from '../../../lib/model/typeOfModeOfCollection';

interface EditCollectionEventDialogProps {
  open: boolean;
  handleClose: () => void;
  collectionEventState: CollectionEvent;
  setCollectionEventState: (collectionEvent: CollectionEvent) => void;
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
}

const EditCollectionEventDialog = (props: EditCollectionEventDialogProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'collectionEvent',
    'form',
  ]);
  const { open, handleClose, collectionEventState } = props;

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(collectionEventState.dataCollectionDate.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(collectionEventState.dataCollectionDate.endDate)
  );
  const [modeCollection, setModeCollection] = useState<string[]>(
    collectionEventState.typeOfModeOfCollection.map((mode) => mode.type)
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.setCollectionEventState({
      ...collectionEventState,
      collectionEventName: {
        ...collectionEventState.collectionEventName,
        [i18n.language]: event.target.value,
      },
    });
  };
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
      description: {
        ...collectionEventState.description,
        [i18n.language]: event.target.value,
      },
    });
  };

  const handleModeCollectionChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setModeCollection(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSave = () => {
    console.log('Update CollectionEvent: ', collectionEventState);
    const modeOfCollection: TypeOfModeOfCollection[] = [];
    modeCollection.forEach((mode) => {
      modeOfCollection.push({
        type: mode,
      });
    });
    props.setCollectionEventState({
      ...collectionEventState,
      typeOfModeOfCollection: modeOfCollection,
    });
    props.setCollectionEventState({
      ...collectionEventState,
      dataCollectionDate: {
        startDate: formatISO(startDate),
        endDate: formatISO(endDate),
      },
    });
    props.setCollectionEventState({
      ...collectionEventState,
      version: collectionEventState.version + 1,
    });
    const now = Date.now();
    const today: string = new Date(now).toISOString();
    const index = props.dataCollectionState.collectionEvents.findIndex(
      (x) => x.id === collectionEventState.id
    );
    props.setDataCollectionState({
      ...props.dataCollectionState,
      versionDate: today,
      collectionEvents: [
        ...props.dataCollectionState.collectionEvents.filter(
          (event) => event.id !== collectionEventState.id
        ),
        (props.dataCollectionState.collectionEvents[index] =
          collectionEventState),
      ],
    });
    console.log(
      'Updated Data Collection with new Collection Event: ',
      props.dataCollectionState
    );

    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" color="text.secondary">
          {t('editEvent', { ns: 'dataCollectionDetails' })}
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
            <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
              <TextField
                required
                size="small"
                value={collectionEventState.collectionEventName[i18n.language]}
                sx={{
                  marginRight: 2,
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
                onChange={handleNameChange}
                id={collectionEventState.collectionEventName[i18n.language]}
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
              {t('description', { ns: 'form' })}:{' '}
            </Typography>
            <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
              <TextField
                required
                size="small"
                label={t('description', { ns: 'form' })}
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
              {t('dataCollectionDate', { ns: 'collectionEvent' })}:
            </Typography>
          </Box>
          <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
            <DatePicker
              label={t('collectionStartDate', { ns: 'collectionEvent' })}
              value={startDate}
              onChange={(date) => date && setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label={t('collectionEndDate', { ns: 'collectionEvent' })}
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
              {t('modeOfCollection', { ns: 'collectionEvent' })}:{' '}
            </Typography>
          </Box>
          <FormControl size="small" fullWidth>
            <Select
              labelId="multiple-mode-label"
              sx={{
                width: 200,
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
              notched
              multiple
              // @ts-expect-error mui types are wrong for multiple select
              value={modeCollection}
              onChange={handleModeCollectionChange}
              input={<OutlinedInput label="Name" />}
            >
              {typeMode.map((mode) => (
                <MenuItem key={mode.type} value={mode.type}>
                  {mode.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {collectionEventState.version}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          {t('close', { ns: 'form' })}
        </Button>
        <Button
          onClick={() => {
            handleSave();
          }}
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
          {t('save', { ns: 'dataCollectionDetails' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionEventDialog;
