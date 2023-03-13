import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogContentText,
  Button,
  CircularProgress,
} from '@mui/material';

interface DeleteDialogProps {
  openDelete: boolean;
  handleCloseDelete: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const DeleteDialog = (props: DeleteDialogProps) => {
  const { t } = useTranslation(['dataCollectionDetails', 'form']);
  return (
    <Dialog open={props.openDelete} onClose={props.handleCloseDelete}>
      <DialogTitle>
        <Typography variant="h5">{t('delete', { ns: 'form' })}</Typography>
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
          {props.isSuccess ? t('deleteSuccess', { ns: 'form' }) : ''}
          {props.isLoading ? <CircularProgress /> : ''}
          {props.isError ? t('error', { ns: 'form' }) : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={props.handleCloseDelete} autoFocus>
          {t('close', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
