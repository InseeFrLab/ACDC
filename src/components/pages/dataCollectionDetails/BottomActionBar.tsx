import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataCollection } from '../../../lib/model/dataCollection';
import BottomBar from '../../shared/layout/BottomBar';

interface BottomActionBarProps {
  dataCollection: DataCollection;
  dataCollectionState: DataCollection;
  handleSave: () => void;
}
const BottomActionBar = (props: BottomActionBarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['dataCollectionDetails']);
  const { dataCollection } = props;
  const handleClick = () => {
    navigate(`/collection/new/${dataCollection.id}`, {
      state: { dataCollection },
    });
  };
  const handleClickUserAttribute = () => {
    navigate(`/collection/${dataCollection.id}/attribute/new`, {
      state: { dataCollection },
    });
  };
  const handleClickSave = () => {
    props.handleSave();
  };
  return (
    <BottomBar>
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
        <Typography variant="subtitle1">{t('createUserAttribute')}</Typography>
      </Button>
      <Button
        variant="contained"
        disabled={props.dataCollectionState === props.dataCollection}
        onClick={handleClickSave}
        sx={{
          mx: 1,
        }}
      >
        <Typography variant="subtitle1">{t('save')}</Typography>
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
    </BottomBar>
  );
};

export default BottomActionBar;
