/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Typography,
  FormControl,
  Button,
  Stack,
  Box,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import CreateDataCollectionDialog from './CreateDataCollectionDialog';
import { DataCollection } from '../../../lib/model/dataCollection';
import { createDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';

const CollectionForm = () => {
  const { t } = useTranslation(['dataCollectionForm', 'form']);
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, mutate } =
    useMutation(createDataCollection);
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: '',
    },
    {
      id: 1,
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
  const [textError, setTextError] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataCollectionState, setDataCollectionState] =
    useState<DataCollection>({} as DataCollection);

  const statisticalOperationSeries = [
    {
      id: 1,
      label: 'Serie 1',
    },
    {
      id: 2,
      label: 'Serie 2',
    },
    {
      id: 3,
      label: 'Serie 3',
    },
  ];

  const statisticalOperation = [
    {
      id: 1,
      label: 'Operation 1',
    },
    {
      id: 2,
      label: 'Operation 2',
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(`/collection/${dataCollectionState.id}`, {
      state: { dataCollection: dataCollectionState },
    });
  };

  const checkValidation = () => {
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');
    if (labelArrayFiltered.length === 2) {
      setTextError(false);
      return true;
    }
    setTextError(true);
    return false;
  };

  const createDataCollectionObject = () => {
    const now = Date.now();
    const today = new Date(now);
    const id = uuidv4();
    const label: Record<'fr-FR' & 'en-IE', string> = labelArray.reduce(
      (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
        map[obj.language] = obj.value;
        return map;
      },
      {}
    );
    const description: Record<('fr-FR' & 'en-IE') | string, string> =
      descriptionArray.reduce(
        (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
          map[obj.language] = obj.value;
          return map;
        },
        {}
      );

    const data: DataCollection = {
      id,
      agency: 'fr.insee',
      version: 1,
      versionDate: today.toISOString(),
      label,
      description,
      collectionEvents: [],
      userAttributePair: [],
    };

    const dataCollection: DataCollectionApi = {
      id,
      json: data,
    };
    setDataCollectionState(data);
    mutate(dataCollection);
    handleClickOpen();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    checkValidation()
      ? createDataCollectionObject()
      : console.log('Field Validation Error');
  };

  return (
    <>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Stack spacing={2}>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('statisticalOperationSeries', { ns: 'dataCollectionForm' })}* :
            </Typography>
          </Box>
          <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
            <Autocomplete
              disablePortal
              size="small"
              id="select-statistical-operation-series"
              options={statisticalOperationSeries}
              onChange={() =>
                console.log('Statistical Operation Series Change')
              }
              getOptionLabel={(option) => option.label}
              renderOption={(pr, option) => {
                return (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...pr}
                  >
                    {option.label}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('statisticalOperationSeries', {
                    ns: 'dataCollectionForm',
                  })}
                />
              )}
            />
          </FormControl>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('statisticalOperation', { ns: 'dataCollectionForm' })}* :
              (TODO: Create a new react-query object to fetch data when the user
              has chosen a series)
            </Typography>
          </Box>
          <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
            <Autocomplete
              disablePortal
              disabled
              size="small"
              id="select-statistical-operation"
              options={statisticalOperation}
              onChange={() =>
                console.log('Statistical Operation Series Change')
              }
              getOptionLabel={(option) => option.label}
              renderOption={(pr, option) => {
                return (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...pr}
                  >
                    {option.label}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('statisticalOperation', {
                    ns: 'dataCollectionForm',
                  })}
                />
              )}
            />
          </FormControl>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 2,
            }}
          >
            <Typography variant="h6">
              {t('label', { ns: 'form' })}* :
            </Typography>
          </Box>
          <IntlTextInput
            textArray={labelArray}
            setTextArray={setLabelArray}
            multiline={false}
          />
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('descriptionField', { ns: 'form' })} :
            </Typography>
          </Box>

          <IntlTextInput
            textArray={descriptionArray}
            setTextArray={setDescriptionArray}
            multiline
          />

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              paddingTop: 2,
              borderColor: 'divider',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={() => navigate('/')}
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
                {t('generalFieldErrorMessage', { ns: 'form' })}
              </Typography>
            )}
          </Box>
        </Stack>
      </FormControl>

      <CreateDataCollectionDialog
        open={open}
        handleClose={handleClose}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </>
  );
};

export default CollectionForm;
