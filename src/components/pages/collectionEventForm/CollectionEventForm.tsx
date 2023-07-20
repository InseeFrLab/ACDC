/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { formatISO } from 'date-fns';
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Stack,
  Box,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import {
  createIntlRecord,
  createCollectionCommunicationMode,
  createInstrumentReference,
  CommunicationMode,
} from '@/lib/utils/dataTransformation';
import getCurrentDate from '@/lib/utils/otherUtils';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import CollectionDatePicker from '../../shared/formComponents/collectionDatePicker/CollectionDatePicker';
import CollectionCommunicationSelect from '../../shared/formComponents/collectionCommunication/collectionCommunication';
import CollectionModeSelect from '../../shared/formComponents/collectionMode/collectionModeSelect';
import QuestionnaireModelSelect from '../../shared/formComponents/questionnaireModel/questionnaireModelAutoComplete';
import CollectionEvent from '../../../lib/model/collectionEvents';

import {
  TypeOfModeOfCollection,
  typeMode,
} from '../../../lib/model/typeOfModeOfCollection';

import InstrumentReference from '../../../lib/model/instrumentReference';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { PoguesQuestionnaire } from '../../../lib/model/poguesQuestionnaire';
import { CollectionCommunication } from '../../../lib/model/communicationCollectionEvent';

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
  const [userAttributePairArray, setUserAttributePairArray] = useState<
    CommunicationMode[]
  >([
    {
      id: 1,
      type: '',
      media: '',
      paperQuestionnaire: '',
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

  const [submitAttempt, setSubmitAttempt] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const checkValidation = () => {
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');
    const collectionEventNameArrayFiltered = collectionEventNameArray.filter(
      (obj) => obj.value !== ''
    );

    const isValid =
      labelArrayFiltered.length === 2 &&
      collectionEventNameArrayFiltered.length === 2;

    setTextError(!isValid);

    return isValid;
  };

  const createCollectionEventObject = () => {
    const instrument: InstrumentReference = createInstrumentReference(
      questionnaire,
      questionnaireLabel
    );
    const modeOfCollection: TypeOfModeOfCollection[] =
      modeCollectionCheck.reduce<TypeOfModeOfCollection[]>((acc, mode) => {
        if (mode.checked) {
          acc.push({ type: mode.label });
        }
        return acc;
      }, []);

    const collectionEventName = createIntlRecord(collectionEventNameArray);
    const label = createIntlRecord(labelArray);
    const description = createIntlRecord(descriptionArray);

    const attributeValue = createCollectionCommunicationMode(
      userAttributePairArray
    );

    const userAttributePairCollection: CollectionCommunication = {
      attributeKey: 'extension:CollectionCommunicationSteps',
      attributeValue,
    };
    const userAttributePairCollectionArray: CollectionCommunication[] = [];
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
    props.DataCollectionApi.json.versionDate = getCurrentDate();

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
    setSubmitAttempt(true);
    checkValidation()
      ? createCollectionEventObject()
      : console.log('Field Validation Error');
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      navigate(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <Stack spacing={1}>
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
          submitAttempt={submitAttempt}
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
        <IntlTextInput
          textArray={labelArray}
          setTextArray={setLabelArray}
          submitAttempt={submitAttempt}
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
            {t('descriptionField', { ns: 'form' })}:
          </Typography>
        </Box>
        <IntlTextInput
          textArray={descriptionArray}
          setTextArray={setDescriptionArray}
          multiline
          submitAttempt={false}
        />
        <CollectionModeSelect
          modeCollectionCheck={modeCollectionCheck}
          setModeCollectionCheck={setModeCollectionCheck}
          textError={textError}
        />{' '}
        <QuestionnaireModelSelect
          questionnaires={props.questionnaires}
          setQuestionnaire={setQuestionnaire}
          questionnaireLabel={questionnaireLabel}
          setQuestionnaireLabel={setQuestionnaireLabel}
          submitAttempt={submitAttempt}
        />
        <CollectionDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
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
            alignItems: 'baseline',
          }}
        >
          <Button
            variant="outlined"
            sx={{ marginRight: 2 }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <Typography variant="subtitle1">
              {t('cancel', { ns: 'form' })}
            </Typography>
          </Button>
          <Button variant="customContained" onClick={handleSubmit}>
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

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <Typography variant="h5">{t('descriptionForm')}</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogContentText>
            {isLoading ? <CircularProgress /> : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="customContained"
            onClick={() => {
              setOpen(false);
            }}
            autoFocus
          >
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventForm;
