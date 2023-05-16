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

interface PublishDialogProps {
  openPublish: boolean;
  setOpenPublish: (open: boolean) => void;
  isLoading: boolean;
  isError: boolean;
}

const PublishDialog = (props: PublishDialogProps) => {
  const { t } = useTranslation(['dataCollectionDetails', 'form']);
  return (
    <Dialog open={props.openPublish}>
      <DialogTitle>
        <Typography variant="h5">
          {t('publishDataCollection', { ns: 'dataCollectionDetails' })}
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
            props.setOpenPublish(false);
          }}
          autoFocus
        >
          {t('close', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishDialog;
