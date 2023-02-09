import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Typography,
  Box,
  Button,
  Card,
  Divider,
  CardActions,
  IconButton,
  IconButtonProps,
  Collapse,
  CardContent,
  Stack,
} from '@mui/material';
import { FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import CollectionEvent from '../../../lib/model/collectionEvents';
import { DataCollection } from '../../../lib/model/dataCollection';
import EditCollectionEventDialog from '../../shared/updateDataForm/EditCollectionEventDialog';

interface CollectionEventDisplayProps {
  collectionEvent: CollectionEvent;
  handleDeleteCollectionEvent: (id: string) => void;
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
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

const CollectionEventDisplay = (props: CollectionEventDisplayProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'collectionEvent',
    'form',
    'userAttributeForm',
  ]);
  const { collectionEvent, dataCollectionState, setDataCollectionState } =
    props;
  const [collectionEventState, setCollectionEventState] =
    useState(collectionEvent);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    console.log('delete');
    props.handleDeleteCollectionEvent(collectionEvent.id);
  };
  return (
    <>
      <Card
        key={collectionEvent.id}
        sx={{
          px: 1,
          my: 1,
        }}
      >
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
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.secondary"
              sx={{ marginLeft: 1 }}
            >
              {`${collectionEvent.collectionEventName[i18n.language]} `}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            <Typography variant="body1" fontWeight="xl">
              {`${collectionEvent.label[i18n.language]} `}
            </Typography>
          </Box>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <FiChevronDown />
            </ExpandMore>
          </CardActions>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                ID:{' '}
              </Typography>
              <Typography variant="body1">{collectionEvent.id}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('label', { ns: 'form' })}:{' '}
              </Typography>
              <Typography variant="body1">
                {collectionEvent.label[i18n.language]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('description', { ns: 'form' })}:{' '}
              </Typography>
              <Typography variant="body1">
                {collectionEvent.description[i18n.language]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('version', { ns: 'form' })}:{' '}
              </Typography>
              <Typography variant="body1">{collectionEvent.version}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('modeOfCollection', { ns: 'collectionEvent' })}:{' '}
              </Typography>

              {collectionEvent.typeOfModeOfCollection.map((mode) => {
                return (
                  <Typography variant="body1" key={mode.type} sx={{ ml: 0.5 }}>
                    {mode.type}{' '}
                  </Typography>
                );
              })}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('instrumentReference', { ns: 'collectionEvent' })}:{' '}
              </Typography>
              <Typography variant="body1">
                {collectionEvent.instrumentReference.label}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginRight: 1 }}
              >
                {t('title', { ns: 'userAttributeForm' })}:
              </Typography>
            </Box>
            <Stack sx={{ alignItems: 'flex-start' }}>
              {collectionEvent.userAttributePair.map((pair) => {
                return pair.attributeValue.map((value) => {
                  return (
                    <>
                      <Typography
                        variant="body1"
                        key={value.id}
                        sx={{ ml: 0.5, alignItems: 'flex-start', mt: 1.5 }}
                      >
                        • {t('type', { ns: 'userAttributeForm' })} :{' '}
                        {value.type}
                      </Typography>
                      <Typography
                        variant="body1"
                        key={value.id}
                        sx={{ ml: 0.5, alignItems: 'flex-start' }}
                      >
                        • {t('media', { ns: 'userAttributeForm' })} :{' '}
                        {value.media}
                      </Typography>
                      <Typography
                        variant="body1"
                        key={value.id}
                        sx={{ ml: 0.5, alignItems: 'flex-start' }}
                      >
                        •{' '}
                        {t('paperQuestionnaire', {
                          ns: 'userAttributeForm',
                        })}{' '}
                        : {value.paperQuestionnaire.toString()}
                      </Typography>
                    </>
                  );
                });
              })}
            </Stack>

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
                <Typography variant="body1" fontWeight="xl">
                  {t('edit', { ns: 'dataCollectionDetails' })}
                </Typography>
              </Button>
              <Button
                size="small"
                onClick={handleDeleteClick}
                variant="outlined"
                sx={{ marginLeft: 2 }}
              >
                <Typography variant="body1" fontWeight="xl">
                  {t('delete', { ns: 'form' })}
                </Typography>
              </Button>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
      <EditCollectionEventDialog
        open={open}
        handleClose={handleClose}
        collectionEventState={collectionEventState}
        setCollectionEventState={setCollectionEventState}
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
      />
    </>
  );
};

export default CollectionEventDisplay;
