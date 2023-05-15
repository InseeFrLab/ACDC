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

interface SaveDialogProps {
  openSave: boolean;
  setOpenSave: (open: boolean) => void;
  isLoading: boolean;
  isError: boolean;
}

const SaveDialog = (props: SaveDialogProps) => {
  const { t } = useTranslation(['dataCollectionDetails', 'form']);
  return (
    <Dialog open={props.openSave}>
      <DialogTitle>
        <Typography variant="h5">
          {t('saveDataCollection', { ns: 'dataCollectionDetails' })}
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
          {props.isLoading ? <CircularProgress /> : ''}
          {props.isError ? t('error', { ns: 'form' }) : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="customContained"
          onClick={() => {
            props.setOpenSave(false);
          }}
          autoFocus
        >
          {t('close', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveDialog;
