import { useState } from 'react';
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
import styled from '@emotion/styled';
import { FiChevronDown, FiTrash } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import StyledCardActionArea from '@/components/shared/styled/CardActionArea';
import { CollectionRow } from '@/lib/model/communicationCollectionEvent';
import CollectionEvent from '../../../lib/model/collectionEvents';
import { DataCollection } from '../../../lib/model/dataCollection';
import EditCollectionEventDialog from './updateDataForm/EditCollectionEventDialog';
import { PoguesQuestionnaire } from '../../../lib/model/poguesQuestionnaire';

interface CollectionEventDisplayProps {
  collectionEvent: CollectionEvent;
  handleDeleteCollectionEvent: (id: string) => void;
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  questionnaires: PoguesQuestionnaire[];
  setNotSavedState: (notSavedState: boolean) => void;
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
  const {
    collectionEvent,
    dataCollectionState,
    setDataCollectionState,
    questionnaires,
  } = props;
  const [collectionEventState, setCollectionEventState] =
    useState(collectionEvent);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const listOfIds = dataCollectionState.userAttributePair
    .flatMap((userAttribute) =>
      userAttribute.attributeValue.flatMap((attributeValue) =>
        attributeValue.collectionEventReference.map(
          (collectionEventReference) => collectionEventReference.id
        )
      )
    )
    .filter((id, index, arr) => arr.indexOf(id) === index);

  const [deletable] = useState(listOfIds.includes(collectionEvent.id));

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
    console.log('Delete CollectionEvent in Component');
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
        <StyledCardActionArea
          onClick={handleExpandClick}
          disableRipple
          disableTouchRipple
          sx={{
            '&.root': {
              '&:hover $focusHighlight': {
                opacity: 0,
              },
            },
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
            <CardActions
              disableSpacing
              sx={{
                '& .MuiCardActionArea-focusHighlight': {
                  background: 'transparent',
                  border: 'none',
                },
                '& .MuiCardActionArea-focusVisible': {
                  background: 'transparent',
                  border: 'none',
                },
                ':focus': {
                  background: 'transparent',
                  border: 'none',
                },
              }}
            >
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
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
                  {' '}
                  {t('dataCollectionDate', { ns: 'collectionEvent' })}:
                </Typography>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  {moment(collectionEvent.dataCollectionDate.startDate).format(
                    'DD/MM/YYYY'
                  )}{' '}
                  -{' '}
                  {moment(collectionEvent.dataCollectionDate.endDate).format(
                    'DD/MM/YYYY'
                  )}
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
                  {t('modeOfCollection', { ns: 'collectionEvent' })}:{' '}
                </Typography>

                {collectionEvent.typeOfModeOfCollection.map((mode) => {
                  return (
                    <Typography
                      variant="body1"
                      key={mode.type}
                      sx={{ ml: 0.5 }}
                    >
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
                  {t('collectionCommunication', { ns: 'collectionEvent' })}:
                </Typography>
              </Box>
              <Stack sx={{ alignItems: 'flex-start' }}>
                {collectionEvent.userAttributePair.map((pair) => {
                  return pair.attributeValue.map((value: CollectionRow) => {
                    return (
                      <>
                        <Typography
                          variant="body1"
                          key={value.id}
                          sx={{ ml: 1.5, alignItems: 'flex-start' }}
                        >
                          •{' '}
                          <strong>
                            {t('type', { ns: 'userAttributeForm' })} :
                          </strong>{' '}
                          {t(`${value.type}`, { ns: 'collectionEvent' })}
                        </Typography>
                        <Typography
                          variant="body1"
                          key={value.id}
                          sx={{ ml: 1.5, alignItems: 'flex-start' }}
                        >
                          •{' '}
                          <strong>
                            {t('media', { ns: 'userAttributeForm' })} :{' '}
                          </strong>{' '}
                          {t(`${value.media}`, { ns: 'collectionEvent' })}
                        </Typography>
                        <Typography
                          variant="body1"
                          key={value.id}
                          sx={{ ml: 1.5, alignItems: 'flex-start' }}
                        >
                          •{' '}
                          <strong>
                            {t('paperQuestionnaire', {
                              ns: 'userAttributeForm',
                            })}
                          </strong>{' '}
                          :{' '}
                          {t(`${value.paperQuestionnaire.toString()}`, {
                            ns: 'collectionEvent',
                          })}
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
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ marginRight: 1 }}
                >
                  {t('version', { ns: 'form' })}:{' '}
                </Typography>
                <Typography variant="body1">
                  {collectionEvent.version}
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
                  onClick={handleDeleteClick}
                  variant="outlined"
                  sx={{ marginLeft: 2 }}
                  disabled={deletable}
                  startIcon={<FiTrash />}
                >
                  <Typography variant="body1" fontWeight="xl">
                    {t('delete', { ns: 'form' })}
                  </Typography>
                </Button>
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
              </Box>
            </CardContent>
          </Collapse>
        </StyledCardActionArea>
      </Card>
      <EditCollectionEventDialog
        open={open}
        handleClose={handleClose}
        collectionEventState={collectionEventState}
        setCollectionEventState={setCollectionEventState}
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
        questionnaires={questionnaires}
        setNotSavedSate={props.setNotSavedState}
      />
    </>
  );
};

export default CollectionEventDisplay;
