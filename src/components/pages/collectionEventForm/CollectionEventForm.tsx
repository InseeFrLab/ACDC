/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { formatISO } from 'date-fns';
import {
  Typography,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  Box,
  DialogTitle,
  SelectChangeEvent,
  OutlinedInput,
  InputLabel,
  Autocomplete,
} from '@mui/material';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import CollectionDatePicker from '../../shared/formComponents/collectionDatePicker/CollectionDatePicker';
import CollectionCommunicationSelect from '../../shared/formComponents/collectionCommunication/collectionCommunication';
import CollectionModeSelect from '../../shared/formComponents/collectionMode/collectionModeSelect';
import CollectionEvent from '../../../lib/model/collectionEvents';
import {
  TypeOfModeOfCollection,
  typeMode,
} from '../../../lib/model/typeOfModeOfCollection';

import InstrumentReference from '../../../lib/model/instrumentReference';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { PoguesQuestionnaire } from '../../../lib/model/poguesQuestionnaire';
import {
  UserAttributePairCollection,
  UserAttributePairCollectionRow,
} from '../../../lib/model/userAttributePairCollection';

interface DataCollectionProps {
  DataCollectionApi?: DataCollectionApi;
  questionnaires?: PoguesQuestionnaire[];
}
const EventForm = (props: DataCollectionProps) => {
  // TODO: Refactor tout ça pour que ce soit plus propre
  const { t } = useTranslation(['collectionEvent', 'form']);
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);
  const [dataCollectionState, setDataCollectionState] =
    useState<DataCollectionApi>(props.DataCollectionApi);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [modeCollectionCheck, setModeCollectionCheck] = useState(
    typeMode.map((item) => {
      return { label: item.type, checked: false };
    })
  );
  const [questionnaire, setQuestionnaire] = useState<string>('');
  const [questionnaireLabel, setQuestionnaireLabel] = useState<string>('');
  const [userAttributePairArray, setUserAttributePairArray] = useState([
    {
      id: 1,
      type: 'Opening',
      media: 'Email',
      paperQuestionnaire: 'false',
    },
  ]);
  const [collectionEventNameArray, setCollectionEventNameArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: '',
    },
    {
      id: 2,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: '',
    },
    {
      id: 2,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [descriptionArray, setDescriptionArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: '',
    },
    {
      id: 2,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [textError, setTextError] = useState(false);

  const handleQuestionnaireChange = (
    event: any,
    newValue: PoguesQuestionnaire
  ) => {
    const {
      target: { value },
    } = event;
    setQuestionnaire(newValue.id);
    setQuestionnaireLabel(newValue.label);
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log('dataCollectionState: ', dataCollectionState);
  };

  const handleClose = () => {
    setOpen(false);
    const dataCollection = dataCollectionState.json;
    navigate(`/collection/${dataCollectionState.id}`, {
      state: { dataCollection },
    });
  };

  const checkValidation = () => {
    console.log('Check validation');
    console.log('labelArray: ', labelArray);
    console.log('descriptionArray: ', descriptionArray);
    console.log('collectionEventNameArray: ', collectionEventNameArray);
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');

    const collectionEventNameArrayFiltered = collectionEventNameArray.filter(
      (obj) => obj.value !== ''
    );
    if (
      labelArrayFiltered.length === 2 &&
      collectionEventNameArrayFiltered.length === 2
    ) {
      setTextError(false);
      return true;
    }
    setTextError(true);
    return false;
  };

  const createCollectionEventObject = () => {
    const instrument: InstrumentReference = {
      id: questionnaire,
      agency: 'fr.insee',
      version: 1,
      typeOfObject: 'Instrument',
      label: questionnaireLabel,
    };

    const modeOfCollection: TypeOfModeOfCollection[] = modeCollectionCheck
      .filter((mode) => mode.checked === true)
      .map((mode) => {
        return { type: mode.label };
      });

    const collectionEventName: Record<'fr-FR' | 'en-IE' | string, string> =
      collectionEventNameArray.reduce(
        (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
          map[obj.language] = obj.value;
          return map;
        },
        {}
      );
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
    const attributeValue: UserAttributePairCollectionRow[] = [];
    // TODO: Replace for each
    userAttributePairArray.forEach((obj) => {
      attributeValue.push({
        id: uuidv4(),
        type: obj.type,
        media: obj.media,
        paperQuestionnaire: JSON.parse(obj.paperQuestionnaire),
      });
    });
    const userAttributePairCollection: UserAttributePairCollection = {
      attributeKey: 'extension:CollectionCommunicationSteps',
      attributeValue,
    };
    const userAttributePairCollectionArray: UserAttributePairCollection[] = [];
    userAttributePairCollectionArray.push(userAttributePairCollection);

    console.log('attributeValue: ', userAttributePairCollectionArray);
    const data: CollectionEvent = {
      id: uuidv4(),
      agency: 'fr.insee',
      version: 1,
      collectionEventName,
      label,
      description,
      instrumentReference: instrument,
      typeOfModeOfCollection: modeOfCollection,
      dataCollectionDate: {
        startDate: formatISO(startDate),
        endDate: formatISO(endDate),
      },
      userAttributePair: userAttributePairCollectionArray,
    };
    const now = Date.now();
    const today: string = new Date(now).toISOString();
    props.DataCollectionApi.json.collectionEvents.push(data);
    props.DataCollectionApi.json.versionDate = today;

    const updatedDataCollection: DataCollectionApi = {
      id: props.DataCollectionApi?.id,
      json: props.DataCollectionApi.json,
    };

    console.log(
      'Updated Data Collection with new Collection Event: ',
      updatedDataCollection
    );

    mutate(updatedDataCollection);
    setDataCollectionState(updatedDataCollection);
    handleClickOpen();
  };
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    checkValidation()
      ? createCollectionEventObject()
      : console.log('Field Validation Error');
  };

  return (
    <>
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h6">{t('name', { ns: 'form' })}*:</Typography>
        </Box>
        <IntlTextInput
          textArray={collectionEventNameArray}
          setTextArray={setCollectionEventNameArray}
          multiline={false}
        />

        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">{t('label', { ns: 'form' })}*:</Typography>
        </Box>
        <IntlTextInput textArray={labelArray} setTextArray={setLabelArray} />
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('descriptionField', { ns: 'form' })}:
          </Typography>
        </Box>

        <IntlTextInput
          textArray={descriptionArray}
          setTextArray={setDescriptionArray}
          multiline
        />
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('modeOfCollection', { ns: 'collectionEvent' })}:*
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
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('questionnaireModel', { ns: 'collectionEvent' })}
          </Typography>
        </Box>
        <FormControl size="small" fullWidth>
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={props.questionnaires}
            onChange={handleQuestionnaireChange}
            getOptionLabel={(option) => option.label}
            renderOption={(pr, option) => {
              return (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...pr}
                >
                  {option.label} - ({option.date})
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('questionnaireModel', { ns: 'collectionEvent' })}
              />
            )}
          />
        </FormControl>

        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('dataCollectionDate', { ns: 'collectionEvent' })}:
          </Typography>
        </Box>
        <Stack spacing={2} direction="row">
          <CollectionDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Stack>
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('collectionCommunication', { ns: 'collectionEvent' })}:
          </Typography>
        </Box>

        <CollectionCommunicationSelect
          userAttributePair={userAttributePairArray}
          setUserAttributePair={setUserAttributePairArray}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            paddingTop: 2,
            borderColor: 'divider',
          }}
        >
          <Button
            variant="outlined"
            sx={{ marginRight: 2 }}
            onClick={handleClose}
          >
            <Typography variant="subtitle1">
              {t('cancel', { ns: 'form' })}
            </Typography>
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            <Typography variant="subtitle1">
              {t('submit', { ns: 'form' })}
            </Typography>
          </Button>
          {textError && (
            <Typography
              variant="subtitle1"
              marginLeft={2}
              fontWeight="bold"
              color="error"
            >
              {t('textFieldError', { ns: 'collectionEvent' })}
            </Typography>
          )}
        </Box>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h5">{t('descriptionForm')}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess ? t('successForm', { ns: 'collectionEvent' }) : ''}
            {isLoading ? t('loading', { ns: 'form' }) : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventForm;
