import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Main from '../../shared/layout/Main';
import DataGridHomePage from './DataTable';
import { dataCollectionApiMock } from '../../../lib/api/mock/dataCollectionApiMock';
const Home = () => {
  const { t } = useTranslation(['home']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new');
  };
  //TODO: Responsive table height
  return (
    <Main>
      <Typography variant="h2" fontWeight="xl">
        {t('title')}
      </Typography>

      <Typography variant="subtitle1" fontWeight="xl">
        {t('description')}
      </Typography>
      <DataGridHomePage rows={dataCollectionApiMock} heightTable={400} />
      <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleClick}>
        <Typography variant="subtitle1">{t('createButton')}</Typography>
      </Button>
    </Main>
  );
};

export default Home;
