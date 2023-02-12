import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  Stack,
} from '@mui/material';
import IntlTextInput from '../intlTextInput/IntlTextInput';
import CollectionDatePicker from '../formComponents/collectionDatePicker/CollectionDatePicker';
import CollectionModeSelect from '../formComponents/collectionMode/collectionModeSelect';
import CollectionEvent from '../../../lib/model/collectionEvents';
import { DataCollection } from '../../../lib/model/dataCollection';
import { TypeOfModeOfCollection } from '../../../lib/model/typeOfModeOfCollection';

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
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: collectionEventState.label['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: collectionEventState.label['en-IE'],
    },
  ]);

  const [descriptionArray, setDescriptionArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: collectionEventState.description['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: collectionEventState.description['en-IE'],
    },
  ]);

  const handleSave = () => {
    console.log('Update CollectionEvent: ', collectionEventState);
    const modeOfCollection: TypeOfModeOfCollection[] = [];
    modeCollection.forEach((mode) => {
      modeOfCollection.push({
        type: mode,
      });
    });

    const label: Record<'fr-FR' | 'en-IE' | string, string> = labelArray.reduce(
      (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
        map[obj.language] = obj.value;
        return map;
      },
      {}
    );

    const description: Record<'fr-FR' | 'en-IE' | string, string> =
      descriptionArray.reduce(
        (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
          map[obj.language] = obj.value;
          return map;
        },
        {}
      );
    console.log('label Updated: ', label);
    props.setCollectionEventState({
      ...collectionEventState,
      typeOfModeOfCollection: modeOfCollection,
      dataCollectionDate: {
        startDate: formatISO(startDate),
        endDate: formatISO(endDate),
      },
      label,
      description,
    });

    console.log('Updated CollectionEvent: ', collectionEventState);
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
                disabled
                size="small"
                value={collectionEventState.collectionEventName[i18n.language]}
                sx={{
                  marginRight: 2,
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
                id={collectionEventState.collectionEventName[i18n.language]}
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingTop: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {t('label', { ns: 'form' })}*:
              </Typography>
            </Box>
            <IntlTextInput
              textArray={labelArray}
              setTextArray={setLabelArray}
            />
            <Box
              sx={{
                paddingTop: 2,
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {t('descriptionField', { ns: 'form' })}:
              </Typography>
            </Box>

            <IntlTextInput
              textArray={descriptionArray}
              setTextArray={setDescriptionArray}
              multiline
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {t('dataCollectionDate', { ns: 'collectionEvent' })}:
            </Typography>
          </Box>
          <Stack spacing={2} direction="row" sx={{ marginTop: 1 }}>
            <CollectionDatePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {t('modeOfCollection', { ns: 'collectionEvent' })}:{' '}
            </Typography>
          </Box>
          <CollectionModeSelect
            modeCollection={modeCollection}
            setModeCollection={setModeCollection}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 1 }}>
              {t('version', { ns: 'form' })}:{' '}
            </Typography>
            <Typography variant="h6">{collectionEventState.version}</Typography>
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
