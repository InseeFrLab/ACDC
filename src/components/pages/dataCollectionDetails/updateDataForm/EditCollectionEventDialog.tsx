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
import IntlTextInput from '../../../shared/intlTextInput/IntlTextInput';
import CollectionDatePicker from '../../../shared/formComponents/collectionDatePicker/CollectionDatePicker';
import CollectionModeSelect from '../../../shared/formComponents/collectionMode/collectionModeSelect';
import CollectionEvent from '../../../../lib/model/collectionEvents';
import { DataCollection } from '../../../../lib/model/dataCollection';
import {
  TypeOfModeOfCollection,
  typeMode,
} from '../../../../lib/model/typeOfModeOfCollection';

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

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(props.collectionEventState.dataCollectionDate.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(props.collectionEventState.dataCollectionDate.endDate)
  );
  const [modeCollectionCheck, setModeCollectionCheck] = useState(
    typeMode.map((label) => {
      return {
        label: label.type,
        checked: props.collectionEventState.typeOfModeOfCollection.some(
          (i) => i.type === label.type
        ),
      };
    })
  );
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: props.collectionEventState.label['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: props.collectionEventState.label['en-IE'],
    },
  ]);

  const [descriptionArray, setDescriptionArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: props.collectionEventState.description['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: props.collectionEventState.description['en-IE'],
    },
  ]);

  const handleSave = () => {
    console.log('Update CollectionEvent: ', props.collectionEventState);
    const modeOfCollection: TypeOfModeOfCollection[] = modeCollectionCheck
      .filter((mode) => mode.checked === true)
      .map((mode) => {
        return { type: mode.label };
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

    console.log('label: ', label);
    console.log('description: ', description);
    const updatedCollectionEvent: CollectionEvent = {
      id: props.collectionEventState.id,
      collectionEventName: props.collectionEventState.collectionEventName,
      agency: props.collectionEventState.agency,
      version: props.collectionEventState.version,
      label,
      description,
      dataCollectionDate: {
        startDate: formatISO(startDate),
        endDate: formatISO(endDate),
      },
      typeOfModeOfCollection: modeOfCollection,
      instrumentReference: props.collectionEventState.instrumentReference,
      userAttributePair: props.collectionEventState.userAttributePair,
    };
    console.log(
      'Updated CollectionEvent before assignment: ',
      updatedCollectionEvent
    ); // Working
    props.setCollectionEventState(updatedCollectionEvent);

    console.log(
      'Updated CollectionEvent State version: ',
      props.collectionEventState
    ); // Not working
    const index = props.dataCollectionState.collectionEvents.findIndex(
      (x) => x.id === props.collectionEventState.id
    );

    // const newCollectionEvents: CollectionEvent[] = [
    //   ...props.dataCollectionState.collectionEvents.filter(
    //     (event) => event.id !== collectionEventState.id
    //   ),
    // ];

    // newCollectionEvents.push(collectionEventState);
    // console.log('New CollectionEvents: ', newCollectionEvents);
    setTimeout(() => {
      props.setDataCollectionState({
        ...props.dataCollectionState,
        collectionEvents: [
          ...props.dataCollectionState.collectionEvents.filter(
            (event) => event.id !== props.collectionEventState.id
          ),
          (props.dataCollectionState.collectionEvents[index] =
            updatedCollectionEvent),
        ],
      });
      console.log(
        'Updated Data Collection with updated Collection Event: ',
        props.dataCollectionState
      );
    }, 1000);

    props.handleClose();
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth>
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
            <Typography variant="body1">
              {props.collectionEventState.id}
            </Typography>
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
                value={
                  props.collectionEventState.collectionEventName[i18n.language]
                }
                sx={{
                  marginRight: 2,
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
                id={
                  props.collectionEventState.collectionEventName[i18n.language]
                }
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CollectionModeSelect
              modeCollectionCheck={modeCollectionCheck}
              setModeCollectionCheck={setModeCollectionCheck}
            />{' '}
          </Box>
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
            <Typography variant="h6">
              {props.collectionEventState.version}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose} autoFocus>
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