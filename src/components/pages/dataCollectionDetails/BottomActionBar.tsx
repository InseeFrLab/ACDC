import { Button, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataCollection } from '../../../lib/model/dataCollection';
import BottomBar from '../../shared/layout/BottomBar';
import { PoguesQuestionnaire } from '../../../lib/model/poguesQuestionnaire';

interface BottomActionBarProps {
  dataCollection: DataCollection;
  handleSave: () => void;
  notSavedState: boolean;
  questionnaires: PoguesQuestionnaire[];
}
const BottomActionBar = (props: BottomActionBarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['dataCollectionDetails']);
  const { dataCollection, questionnaires } = props;
  const handleClick = () => {
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
          variant="contained"
          onClick={handleClick}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('createButton')}</Typography>
        </Button>
        <Button
          variant="contained"
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
          variant="contained"
          disabled={!props.notSavedState}
          onClick={handleClickSave}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('save')}</Typography>
        </Button>
        <Button
          variant="contained"
          onClick={handleClickVisualize}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('visualize')}</Typography>
        </Button>
        <Button
          variant="contained"
          disabled
          onClick={() => {
            console.log('Publish Button');
          }}
          sx={{
            mx: 1,
          }}
        >
          <Typography variant="subtitle1">{t('publish')}</Typography>
        </Button>
      </Box>
    </BottomBar>
  );
};

export default BottomActionBar;
