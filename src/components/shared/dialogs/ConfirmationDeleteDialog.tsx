import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogContentText,
  Button,
} from '@mui/material';

interface ConfirmationDeleteDialogProps {
  openConfirmationDelete: boolean;
  setConfirmationDelete: (open: boolean) => void;
  handleDeleteFunction: (id?: string) => void;
  id?: string;
}

const ConfirmationDeleteDialog = (props: ConfirmationDeleteDialogProps) => {
  const { t } = useTranslation(['dataCollectionDetails', 'form']);
  return (
    <Dialog open={props.openConfirmationDelete}>
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
          <Typography variant="body1">
            {t('confirmationDeleteMessage', { ns: 'form' })}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="customContained"
          onClick={() => props.setConfirmationDelete(false)}
          autoFocus
        >
          {t('cancel', { ns: 'form' })}
        </Button>
        <Button
          variant="outlined"
          onClick={
            props.id
              ? () => props.handleDeleteFunction(props.id)
              : () => props.handleDeleteFunction()
          }
          autoFocus
        >
          {t('confirm', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDeleteDialog;
