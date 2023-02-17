/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography, FormControl, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import CreateDataCollectionDialog from './CreateDataCollectionDialog';
import { DataCollection } from '../../../lib/model/dataCollection';
import { createDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import {
  GroupReference,
  StudyUnitReference,
} from '../../../lib/model/studyUnitReference';
import StatisticalOperationSelect from '../../shared/formComponents/statisticalOperation/StatisticalOperationSelect';

const CollectionForm = () => {
  const { t, i18n } = useTranslation(['dataCollectionForm', 'form']);
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
  const [groupReference, setGroupReference] = useState<GroupReference>(
    {} as GroupReference
  );
  const [studyUnitReference, setStudyUnitReference] =
    useState<StudyUnitReference>({} as StudyUnitReference);

  const [statisticalOperationsList, setStatisticalOperationsList] = useState([
    {
      altLabel: [
        {
          langue: 'fr',
        },
        {
          langue: 'en',
        },
      ],
      label: [
        {
          langue: 'fr',
          contenu: 'Enquête Logement Mayotte 2013',
        },
        {
          langue: 'en',
          contenu: 'Mayotte Housing Survey 2013',
        },
      ],
      uri: 'http://bauhaus/operations/operation/s1448',
      serie: {
        id: 's1004',
        label: [
          {
            langue: 'fr',
            contenu: 'Enquête Logement',
          },
          {
            langue: 'en',
            contenu: 'Housing survey',
          },
        ],
        uri: 'http://bauhaus/operations/serie/s1004',
      },
      id: 's1448',
    },
  ]);

  const [operationDisabled, setOperationDisabled] = useState(true);
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
    const studyUnitReferenceFiltered =
      Object.keys(studyUnitReference).length !== 0;
    if (labelArrayFiltered.length === 2 && studyUnitReferenceFiltered) {
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
      studyUnitReference,
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
        <StatisticalOperationSelect
          groupReference={groupReference}
          setGroupReference={setGroupReference}
          studyUnitReference={studyUnitReference}
          setStudyUnitReference={setStudyUnitReference}
          statisticalOperationsList={statisticalOperationsList}
          setStatisticalOperationsList={setStatisticalOperationsList}
          operationDisabled={operationDisabled}
          setOperationDisabled={setOperationDisabled}
        />
        <Box
          component="form"
          className="CollectionForm"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            paddingTop: 2,
            marginTop: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">{t('label', { ns: 'form' })}* :</Typography>
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
            marginTop: 2,
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
