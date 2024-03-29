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
  Stack,
} from '@mui/material';
import QuestionnaireModelSelect from '@/components/shared/formComponents/questionnaireModel/questionnaireModelAutoComplete';
import { PoguesQuestionnaire } from '@/lib/model/poguesQuestionnaire';
import CollectionCommunicationSelect from '@/components/shared/formComponents/collectionCommunication/collectionCommunication';
import CollectionRow, {
	CollectionCommunication,
} from '@/lib/model/communicationCollectionEvent';

import {
  createIntlRecord,
  createCollectionCommunicationMode,
  createInstrumentReference,
} from '@/lib/utils/dataTransformation';
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
  questionnaires: PoguesQuestionnaire[];
  setNotSavedSate: (notSaved: boolean) => void;
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
  const [collectionEventNameArray, setCollectionEventNameArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: props.collectionEventState.collectionEventName['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: props.collectionEventState.collectionEventName['en-IE'],
    },
  ]);
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
  const [questionnaire, setQuestionnaire] = useState(
    props.collectionEventState.instrumentReference.id
  );
  const [questionnaireLabel, setQuestionnaireLabel] = useState(
    props.collectionEventState.instrumentReference.label
  );

  const [userAttributePairArray, setUserAttributePairArray] = useState(
    props.collectionEventState.userAttributePair.length > 0 &&
      Array.isArray(
        props.collectionEventState.userAttributePair[0].attributeValue
      )
      ? props.collectionEventState.userAttributePair[0].attributeValue.map(
          (pair, index) => {
            return {
              ...pair,
              id: index + 1,
              paperQuestionnaire: JSON.stringify(pair.paperQuestionnaire),
            };
          }
        )
      : []
  );

  const resetState = () => {
    setLabelArray([
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
    setDescriptionArray([
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
    setStartDate(
      new Date(props.collectionEventState.dataCollectionDate.startDate)
    );
    setEndDate(new Date(props.collectionEventState.dataCollectionDate.endDate));
    setModeCollectionCheck(
      typeMode.map((label) => {
        return {
          label: label.type,
          checked: props.collectionEventState.typeOfModeOfCollection.some(
            (i) => i.type === label.type
          ),
        };
      })
    );
    setQuestionnaire(props.collectionEventState.instrumentReference.id);
    setQuestionnaireLabel(props.collectionEventState.instrumentReference.label);
    setUserAttributePairArray(
      props.collectionEventState.userAttributePair.length > 0 &&
        Array.isArray(
          props.collectionEventState.userAttributePair[0].attributeValue
        )
        ? props.collectionEventState.userAttributePair[0].attributeValue.map(
            (pair, index) => {
              return {
                ...pair,
                id: index + 1,
                paperQuestionnaire: JSON.stringify(pair.paperQuestionnaire),
              };
            }
          )
        : []
    );
  };

  const handleCancel = () => {
    resetState();
    props.handleClose();
  };
  const handleSave = () => {
    const modeOfCollection: TypeOfModeOfCollection[] = modeCollectionCheck
      .filter((mode) => mode.checked === true)
      .map((mode) => {
        return { type: mode.label };
      });

    const collectionEventName = createIntlRecord(collectionEventNameArray);
    const label = createIntlRecord(labelArray);
    const description = createIntlRecord(descriptionArray);

    const instrument = createInstrumentReference(
      questionnaire,
      questionnaireLabel
    );

    const attributeValue: CollectionRow[] = createCollectionCommunicationMode(
      userAttributePairArray
    );
    const userAttributePairCollection: CollectionCommunication = {
      attributeKey: 'extension:CollectionCommunicationSteps',
      attributeValue,
    };
    console.log('UserAttribute', userAttributePairCollection);
    const userAttributePairCollectionArray: CollectionCommunication[] = [];
    userAttributePairCollectionArray.push(userAttributePairCollection);

    const updatedCollectionEvent: CollectionEvent = {
      ...props.collectionEventState,
      collectionEventName,
      label,
      description,
      dataCollectionDate: {
        startDate: formatISO(startDate),
        endDate: formatISO(endDate),
      },
      typeOfModeOfCollection: modeOfCollection,
      instrumentReference: instrument,
      userAttributePair: userAttributePairCollectionArray,
    };

    props.setCollectionEventState(updatedCollectionEvent);

    const updatedEvents = props.dataCollectionState.collectionEvents.map(
      (event) =>
        event.id === props.collectionEventState.id
          ? updatedCollectionEvent
          : event
    );

    console.log('Updated CollectionEvents: ', updatedEvents);
    setTimeout(() => {
      props.setDataCollectionState({
        ...props.dataCollectionState,
        collectionEvents: updatedEvents,
      });
      console.log(
        'Updated Data Collection with updated Collection Event: ',
        props.dataCollectionState
      );
    }, 200);
    props.setNotSavedSate(true);
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
          <Stack spacing={1}>
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingTop: 2,
                }}
              >
                <Typography variant="h6">
                  {t('name', { ns: 'form' })}*:
                </Typography>
              </Box>
              <IntlTextInput
                textArray={collectionEventNameArray}
                setTextArray={setCollectionEventNameArray}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingTop: 2,
                }}
              >
                <Typography variant="h6">
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
                <Typography variant="h6">
                  {t('descriptionField', { ns: 'form' })}:
                </Typography>
              </Box>

              <IntlTextInput
                textArray={descriptionArray}
                setTextArray={setDescriptionArray}
                multiline
              />
            </Box>
            <CollectionModeSelect
              modeCollectionCheck={modeCollectionCheck}
              setModeCollectionCheck={setModeCollectionCheck}
              textError={false}
            />{' '}
            <QuestionnaireModelSelect
              questionnaires={props.questionnaires}
              setQuestionnaire={setQuestionnaire}
              questionnaireLabel={questionnaireLabel}
              setQuestionnaireLabel={setQuestionnaireLabel}
              submitAttempt={false}
            />
            <Stack spacing={1} direction="row" sx={{ marginTop: 1 }}>
              <CollectionDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </Stack>
            <CollectionCommunicationSelect
              userAttributePair={userAttributePairArray}
              setUserAttributePair={setUserAttributePairArray}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('version', { ns: 'form' })}:{' '}
              </Typography>
              <Typography variant="h6">
                {props.collectionEventState.version}
              </Typography>
            </Box>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel} autoFocus>
          {t('close', { ns: 'form' })}
        </Button>

        <Button
          onClick={() => {
            handleSave();
          }}
          variant="customContained"
          sx={{ marginLeft: 2 }}
        >
          {t('save', { ns: 'dataCollectionDetails' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionEventDialog;
