import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Typography,
  Box,
  Button,
  Divider,
  Collapse,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { FiChevronRight, FiTrash } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import ExpandMore from '@/components/shared/styled/ExpandMore';
import { deleteDataCollection } from '@/lib/api/remote/dataCollectionApiFetch';
import ConfirmationDeleteDialog from '@/components/shared/dialogs/ConfirmationDeleteDialog';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionDetailsDialog from './updateDataForm/DataCollectionDetailsDialog';

interface DataCollectionDisplayProps {
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  series: StatisticalSeries[];
  setNotSavedState: (notSaved: boolean) => void;
}

const DataCollectionDisplay = (props: DataCollectionDisplayProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'collectionEvent',
    'form',
    'userAttributeForm',
  ]);
  const navigate = useNavigate();
  const { dataCollectionState, setDataCollectionState, series } = props;
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
  const handleDeleteClick = () => {
    console.log(`Delete data collection with id: ${dataCollectionState.id}`);
    mutate(dataCollectionState.id);
    setOpenDelete(true);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.secondary">
            {`${dataCollectionState.label[i18n.language]} `}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Typography variant="h6" fontWeight="xl">
            {`${dataCollectionState.studyUnitReference.label[i18n.language]} `}
          </Typography>
        </Box>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FiChevronRight fontSize={30} />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            ID:{' '}
          </Typography>
          <Typography variant="subtitle1">{dataCollectionState.id}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('label', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.label[i18n.language]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('description', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.description[i18n.language]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('statisticalOperationSeries', { ns: 'dataCollectionForm' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {
              dataCollectionState.studyUnitReference.groupReference.label[
                i18n.language
              ]
            }
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('statisticalOperation', { ns: 'dataCollectionForm' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.studyUnitReference.label[i18n.language]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('lastUpdate', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {moment(dataCollectionState.versionDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('version', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.version}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={() => setOpenConfirmationDelete(true)}
            variant="outlined"
            sx={{ marginLeft: 2 }}
            startIcon={<FiTrash />}
          >
            <Typography variant="body1" fontWeight="xl">
              {t('delete', { ns: 'form' })}
            </Typography>
          </Button>
          <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            sx={{ marginLeft: 2 }}
          >
            <Typography variant="subtitle1" fontWeight="xl">
              {t('edit', { ns: 'dataCollectionDetails' })}
            </Typography>
          </Button>
        </Box>
      </Collapse>
      <DataCollectionDetailsDialog
        open={open}
        setOpen={setOpen}
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
        setNotSavedState={props.setNotSavedState}
        series={series}
      />
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
            {isSuccess ? t('successEventDC') : ''}
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
      <ConfirmationDeleteDialog
        openConfirmationDelete={openConfirmationDelete}
        setConfirmationDelete={setOpenConfirmationDelete}
        handleDeleteFunction={handleDeleteClick}
      />
    </>
  );
};

export default DataCollectionDisplay;
