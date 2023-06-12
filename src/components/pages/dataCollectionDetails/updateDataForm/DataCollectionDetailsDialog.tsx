import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import IntlTextInput from '@/components/shared/intlTextInput/IntlTextInput';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { DataCollection } from '../../../../lib/model/dataCollection';
import StatisticalOperationSelect from '../../../shared/formComponents/statisticalOperation/StatisticalOperationSelect';
import StatisticalSeries from '../../../../lib/model/statisticalSeries';

interface DataCollectionDetailsDialogProps {
  open: boolean;
  dataCollectionState: DataCollection;
  setOpen: (open: boolean) => void;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  series: StatisticalSeries[];
  setNotSavedState: (notSaved: boolean) => void;
}
const DataCollectionDetailsDialog = (
  props: DataCollectionDetailsDialogProps
) => {
  const { t } = useTranslation(['dataCollectionDetails', 'form']);
  const navigate = useNavigate();
  const { open, dataCollectionState, series } = props;
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: dataCollectionState.label['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: dataCollectionState.label['en-IE'],
    },
  ]);
  const [descriptionArray, setDescriptionArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: dataCollectionState.description['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: dataCollectionState.description['en-IE'],
    },
  ]);
  const [studyUnitReference, setStudyUnitReference] = useState(
    dataCollectionState.studyUnitReference
  );

  const [groupReference, setGroupReference] = useState(
    dataCollectionState.studyUnitReference.groupReference
  );

  const resetState = () => {
    setLabelArray([
      {
        id: 1,
        language: 'fr-FR',
        value: dataCollectionState.label['fr-FR'],
      },
      {
        id: 2,
        language: 'en-IE',
        value: dataCollectionState.label['en-IE'],
      },
    ]);
    setDescriptionArray([
      {
        id: 1,
        language: 'fr-FR',
        value: dataCollectionState.description['fr-FR'],
      },
      {
        id: 2,
        language: 'en-IE',
        value: dataCollectionState.description['en-IE'],
      },
    ]);
    setStudyUnitReference(dataCollectionState.studyUnitReference);
    setGroupReference(dataCollectionState.studyUnitReference.groupReference);
  };

  const handleClose = () => {
    props.setOpen(false);

    const label = createIntlRecord(labelArray);
    const description = createIntlRecord(descriptionArray);
    const updatedDataCollection: DataCollection = {
      ...dataCollectionState,
      label,
      description,
      studyUnitReference,
    };
    console.log('updatedDataCollection: ', updatedDataCollection);
    props.setDataCollectionState(updatedDataCollection);
    props.setNotSavedState(true);
    const dataCollectionLink = dataCollectionState;
    navigate(`/collection/${dataCollectionLink.id}`, {
      state: { dataCollection: dataCollectionLink },
    });
  };

  const handleCloseCancel = () => {
    resetState();
    props.setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" color="text.secondary" fontWeight="bold">
          {t('dataCollectionDetails')}
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
            <Typography variant="body1">{dataCollectionState.id}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              marginTop: 1,
            }}
          >
            <StatisticalOperationSelect
              groupReference={groupReference}
              setgroupReference={setGroupReference}
              studyUnitReference={studyUnitReference}
              setStudyUnitReference={setStudyUnitReference}
              series={series}
              submitAttempt={false}
              setRapport={() => {}}
            />
          </Box>

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
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 1,
              paddingTop: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
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
              {dataCollectionState.version}
            </Typography>
          </Box>
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
              {t('lastUpdate', { ns: 'form' })}:{' '}
            </Typography>
            <Typography variant="body1">
              {moment(dataCollectionState.versionDate).format(
                'DD/MM/YYYYHH:mm'
              )}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseCancel} autoFocus>
          {t('cancel', { ns: 'form' })}
        </Button>
        <Button variant="customContained" onClick={handleClose} autoFocus>
          {t('submit', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataCollectionDetailsDialog;
