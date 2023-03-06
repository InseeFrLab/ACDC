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
  CircularProgress,
} from '@mui/material';
import { FiTrash } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import IntlTextInput from '@/components/shared/intlTextInput/IntlTextInput';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { deleteDataCollection } from '../../../../lib/api/remote/dataCollectionApiFetch';
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
  const { t, i18n } = useTranslation(['dataCollectionDetails', 'form']);
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
  const [openDelete, setOpenDelete] = useState(false);
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

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    deleteDataCollection,
    {
      onError: (error) => {
        console.log('Error:', error);
      },
    }
  );

  const handleCloseDelete = () => {
    setOpenDelete(false);
    navigate('/');
  };
  const handleDelete = (id: string) => {
    console.log(`Delete data collection with id: ${id}`);
    mutate(id);
    setOpenDelete(true);
  };

  return (
    <>
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
          <Button
            onClick={() => {
              handleDelete(dataCollectionState.id);
            }}
            variant="outlined"
            sx={{ marginLeft: 2 }}
            startIcon={<FiTrash />}
          >
            <Typography variant="body1" fontWeight="xl">
              {t('delete', { ns: 'form' })}
            </Typography>
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          <Typography variant="h5">
            {t('deleteDataCollection', { ns: 'dataCollectionDetails' })}
          </Typography>
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
            {isSuccess ? t('successEvent') : ''}
            {isLoading ? <CircularProgress /> : ''}
            {isError ? t('error') : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDelete} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataCollectionDetailsDialog;
