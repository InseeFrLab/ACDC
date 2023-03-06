import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Typography,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  IconButtonProps,
  Collapse,
} from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import StatisticalSeries from '@/lib/model/statisticalSeries';
import { DataCollection } from '../../../lib/model/dataCollection';
import DataCollectionDetailsDialog from './updateDataForm/DataCollectionDetailsDialog';

interface DataCollectionDisplayProps {
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  series: StatisticalSeries[];
  setNotSavedState: (notSaved: boolean) => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

const DataCollectionDisplay = (props: DataCollectionDisplayProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'collectionEvent',
    'form',
    'userAttributeForm',
  ]);
  const { dataCollectionState, setDataCollectionState, series } = props;
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.secondary">
            {`${dataCollectionState.label[i18n.language]} `}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Typography variant="h6" fontWeight="xl">
            {`${dataCollectionState.studyUnitReference.label[i18n.language]} `}
          </Typography>
        </Box>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FiChevronRight fontSize={30} />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            ID:{' '}
          </Typography>
          <Typography variant="subtitle1">{dataCollectionState.id}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('label', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.label[i18n.language]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('description', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.description[i18n.language]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('statisticalOperation', { ns: 'dataCollectionForm' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {
              dataCollectionState.studyUnitReference.groupReference.label[
                i18n.language
              ]
            }
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('statisticalOperationSeries', { ns: 'dataCollectionForm' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.studyUnitReference.label[i18n.language]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('lastUpdate', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {moment(dataCollectionState.versionDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            {t('version', { ns: 'form' })}:{' '}
          </Typography>
          <Typography variant="subtitle1">
            {dataCollectionState.version}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            sx={{ marginLeft: 2 }}
          >
            <Typography variant="subtitle1" fontWeight="xl">
              {t('edit', { ns: 'dataCollectionDetails' })}
            </Typography>
          </Button>
        </Box>
      </Collapse>
      <DataCollectionDetailsDialog
        open={open}
        setOpen={setOpen}
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
        setNotSavedState={props.setNotSavedState}
        series={series}
      />
    </>
  );
};

export default DataCollectionDisplay;
