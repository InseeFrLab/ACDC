import { Button, Typography, Alert, Box } from '@mui/material';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publishDataCollection } from '@/lib/api/remote/dataCollectionApiFetch';
import { ContactSupport } from '@mui/icons-material';
import replaceLabel from '@/lib/utils/mailUtils';
import { DataCollection } from '../../../lib/model/dataCollection';
import BottomBar from '../../shared/layout/BottomBar';
import { PoguesQuestionnaire } from '../../../lib/model/poguesQuestionnaire';

interface BottomActionBarProps {
  dataCollection: DataCollection;
  handleSave: () => void;
  notSavedState: boolean;
  questionnaires: PoguesQuestionnaire[];
  handlePublish: () => void;
}
const BottomActionBar = (props: BottomActionBarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['dataCollectionDetails']);
  const { dataCollection, questionnaires } = props;

  const handleClick = () => {
    console.log(
      'Create New CollectionGroup with questionnaires:',
      questionnaires
    );
    navigate(`/collection/new/${dataCollection.id}`, {
      state: { dataCollection, questionnaires },
    });
  };
  const handleClickUserAttribute = () => {
    navigate(`/collection/${dataCollection.id}/attribute/new`, {
      state: { dataCollection },
    });
  };
  const handleClickVisualize = () => {
    window.open(`/collection/${dataCollection.id}/visualize`, '_blank');
  };
  const handleClickSave = () => {
    props.handleSave();
  };
  const handleClickMail = () => {
    const xmlString = replaceLabel(dataCollection.label['fr-FR']).then(
      (res) => {
        navigate(`/mail/${dataCollection.id}`, {
          state: { xmlString: res.toString() },
        });
      }
    );
    // navigate(`/mail`, { state: { xmlString } });
  };
  return (
    <BottomBar>
      {props.notSavedState ? (
        <Alert
          severity="error"
          sx={{
            mr: 2,
          }}
        >
          {t('unsavedChanges')}
        </Alert>
      ) : null}
      <Box>
        <Button
          variant="customContained"
          disabled={questionnaires.length < 1}
          onClick={handleClick}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
        <Button
          variant="customContained"
          onClick={handleClickUserAttribute}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">
            {t('createUserAttribute')}
          </Typography>
        </Button>
        <Button
          variant="customContained"
          disabled={!props.notSavedState}
          onClick={handleClickSave}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('save')}</Typography>
        </Button>
        <Button
          variant="customContained"
          onClick={handleClickVisualize}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('visualize')}</Typography>
        </Button>
        <Button
          variant="customContained"
          disabled={props.notSavedState}
          onClick={props.handlePublish}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('publish')}</Typography>
        </Button>
        <Button
          variant="customContained"
          onClick={handleClickMail}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('mail')}</Typography>
        </Button>
      </Box>
    </BottomBar>
  );
};

export default BottomActionBar;
