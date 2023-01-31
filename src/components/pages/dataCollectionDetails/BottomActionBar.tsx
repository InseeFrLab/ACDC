import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataCollection } from '../../../lib/model/dataCollection';
import BottomBar from '../../shared/layout/BottomBar';

interface BottomActionBarProps {
  dataCollection: DataCollection;
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
        onClick={handleClickSave}
        sx={{
          mx: 1,
        }}
      >
        <Typography variant="subtitle1">{t('save')}</Typography>
      </Button>
      <Button
        variant="contained"
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
