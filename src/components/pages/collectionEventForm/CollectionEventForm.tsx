/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { DatePicker } from '@mui/x-date-pickers';
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
} from '@mui/material';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import CollectionEvent from '../../../lib/model/collectionEvents';
import {
  TypeOfModeOfCollection,
  typeMode,
} from '../../../lib/model/typeOfModeOfCollection';

import InstrumentReference from '../../../lib/model/instrumentReference';

import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';

interface DataCollectionProps {
  DataCollectionApi?: DataCollectionApi;
}
const EventForm = (props: DataCollectionProps) => {
  // TODO: Refactor tout ça pour que ce soit plus propre
  const { t } = useTranslation(['collectionEvent', 'form']);
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [modeCollection, setModeCollection] = useState<string[]>([]);
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

  const handleModeCollectionChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setModeCollection(typeof value === 'string' ? value.split(',') : value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log('Start date: ', startDate);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const checkValidation = () => {
    console.log('Check validation');
    console.log('labelArray: ', labelArray);
    console.log('descriptionArray: ', descriptionArray);
    console.log('collectionEventNameArray: ', collectionEventNameArray);
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');
    const descriptionArrayFiltered = descriptionArray.filter(
      (obj) => obj.value !== ''
    );
    const collectionEventNameArrayFiltered = collectionEventNameArray.filter(
      (obj) => obj.value !== ''
    );
    if (
      labelArrayFiltered.length === 2 &&
      descriptionArrayFiltered.length === 2 &&
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
      id: '493f8b38-1198-4e45-99d2-531ac8a48a48',
      agency: 'fr.insee',
      version: 1,
      typeOfObject: 'Instrument',
    };

    const modeOfCollection: TypeOfModeOfCollection[] = [];
    modeCollection.forEach((mode) => {
      modeOfCollection.push({
        type: mode,
      });
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
    };
    const now = Date.now();
    const today: string = new Date(now).toISOString();
    props.DataCollectionApi.json.collectionEvents.push(data);
    props.DataCollectionApi.json.version += 1;
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
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h6">{t('name', { ns: 'form' })}:</Typography>
          </Box>
          <IntlTextInput
            textArray={collectionEventNameArray}
            setTextArray={setCollectionEventNameArray}
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
              {t('modeOfCollection', { ns: 'collectionEvent' })}:
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
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">{t('label', { ns: 'form' })}:</Typography>
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
              {t('dataCollectionDate', { ns: 'collectionEvent' })}:
            </Typography>
          </Box>
          <Stack spacing={2} direction="row">
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
                {t('textFieldError', { ns: 'form' })}
              </Typography>
            )}
          </Box>
        </Stack>
      </FormControl>

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
