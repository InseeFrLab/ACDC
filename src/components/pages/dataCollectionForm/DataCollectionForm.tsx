/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { Typography, FormControl, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import OtherInfo from '@/components/shared/formComponents/otherInformations/OtherInfo';
import CreateDataCollectionDialog from './CreateDataCollectionDialog';
import { DataCollection } from '../../../lib/model/dataCollection';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import {
  GroupReference,
  StudyUnitReference,
} from '../../../lib/model/studyUnitReference';
import StatisticalOperationSelect from '../../shared/formComponents/statisticalOperation/StatisticalOperationSelect';

interface CollectionFormProps {
  series: StatisticalSeries[];
}

const CollectionForm = (props: CollectionFormProps) => {
  const { t } = useTranslation(['dataCollectionForm', 'form']);
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);
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
  const [groupReference, setgroupReference] = useState<GroupReference>({
    id: '',
    label: {
      'fr-FR': '',
      'en-IE': '',
    },
    typeOfObject: 'Group',
  } as GroupReference);
  const [studyUnitReference, setStudyUnitReference] =
    useState<StudyUnitReference>({
      id: '',
      label: {
        'fr-FR': '',
        'en-IE': '',
      },
      typeOfObject: 'StudyUnit',
      groupReference,
    } as StudyUnitReference);

  const [rapport, setRapport] = useState('');

  const [submitAttempt, setSubmitAttempt] = useState(false);

  const handleClickOpen = (dataCollection: DataCollectionApi) => {
    mutate(dataCollection);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(`/collection/${dataCollectionState.id}`, {
      state: { dataCollection: dataCollectionState, notSaved: false },
    });
  };

  const checkValidation = () => {
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');
    const studyUnitReferenceFiltered = !!Object.keys(studyUnitReference).length;
    const groupReferenceFiltered = !!Object.keys(groupReference).length;

    const isValid =
      labelArrayFiltered.length === 2 &&
      studyUnitReferenceFiltered &&
      groupReferenceFiltered;
    setTextError(!isValid);

    return isValid;
  };

  const createDataCollectionObject = () => {
    const now = Date.now();
    const today = new Date(now);
    const id = uuidv4();
    const label = createIntlRecord(labelArray);
    const description = createIntlRecord(descriptionArray);

    const data: DataCollection = {
      id,
      agency: 'fr.insee',
      version: 1,
      versionDate: today.toISOString(),
      label,
      description,
      collectionEvents: [],
      userAttributePair: [
        {
          attributeKey: 'extension:CollectionEventGroup',
          attributeValue: [],
        },
      ],
      studyUnitReference,
    };

    const dataCollection: DataCollectionApi = {
      id,
      json: data,
    };
    setDataCollectionState(data);
    handleClickOpen(dataCollection);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitAttempt(true);
    checkValidation()
      ? createDataCollectionObject()
      : console.log('Field Validation Error');
  };

  return (
    <>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <StatisticalOperationSelect
          groupReference={groupReference}
          setgroupReference={setgroupReference}
          studyUnitReference={studyUnitReference}
          setStudyUnitReference={setStudyUnitReference}
          series={props.series}
          submitAttempt={submitAttempt}
          setRapport={setRapport}
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
          submitAttempt={submitAttempt}
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
          submitAttempt={false}
        />

        <OtherInfo multiline rapport={rapport} />

        <Box
          component="form"
          className="CollectionForm"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderTop: '1px solid',
            marginTop: 2,
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
