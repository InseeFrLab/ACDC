import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

interface CreateDataCollectionDialogProps {
  open: boolean;
  handleClose: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const CreateDataCollectionDialog = (props: CreateDataCollectionDialogProps) => {
  const { t } = useTranslation(['dataCollectionForm', 'form']);
  const { open, handleClose, isSuccess, isLoading, isError } = props;

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">
          {t('title', { ns: 'dataCollectionForm' })}
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
          {isLoading ? <CircularProgress /> : ''}
          {isError ? t('error', { ns: 'form' }) : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} autoFocus>
          {t('close', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDataCollectionDialog;
