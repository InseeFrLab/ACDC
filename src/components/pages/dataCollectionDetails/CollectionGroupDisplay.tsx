import { useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
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
import ConfirmationDeleteDialog from '@/components/shared/dialogs/ConfirmationDeleteDialog';
import { FiChevronDown, FiTrash, FiEdit, FiCopy } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import StyledCardActionArea from '@/components/shared/styled/CardActionArea';
import { DataCollection } from '../../../lib/model/dataCollection';
import { CollectionGroupValue } from '../../../lib/model/collectionGroups';
import EditCollectionGroupDialog from './updateDataForm/EditCollectionGroup';

interface CollectionGroupDisplayProps {
  attributeValue: CollectionGroupValue;
  handleDeleteUserAttribute: (id: string) => void;
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
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

const CollectionGroupDisplay = (props: CollectionGroupDisplayProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'userAttributeForm',
    'form',
  ]);
  const {
    attributeValue,
    dataCollectionState,
    setDataCollectionState,
    handleDeleteUserAttribute,
    setNotSavedState,
  } = props;
  const [collectionEvents] = useState(dataCollectionState.collectionEvents);
  const [attributeValueState, setAttributeValueState] =
    useState(attributeValue);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteClick = () => {
    handleDeleteUserAttribute(attributeValue.id);
  };
  const handleDuplicateClick = () => {
    console.log('Duplicate CollectionGroup with id: ', attributeValue.id);
    const duplicateCollectionGroup = {
      ...attributeValue,
      id: uuidv4(),
      label: {
        'fr-FR': `${attributeValue.label['fr-FR']} (copie)`,
        'en-IE': `${attributeValue.label['en-IE']} (copy)`,
      },
    } as CollectionGroupValue;
    const newDataCollectionState = dataCollectionState;
    newDataCollectionState.userAttributePair[0].attributeValue.push(
      duplicateCollectionGroup
    );
    console.log(
      'newDataCollectionState with duplicated collectionEvent:',
      newDataCollectionState
    );
    setDataCollectionState(newDataCollectionState);
    setNotSavedState(true);
  };
  return (
    <>
      <Card
        key={attributeValueState.id}
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
            '& .MuiCardActionArea-focusHighlight': {
              background: 'transparent',
              border: 'transparent',
              outline: 'transparent',
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
                key={attributeValueState.label[i18n.language]}
                sx={{ ml: 0.5 }}
              >
                {attributeValueState.label[i18n.language]}{' '}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
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
                <Typography variant="body1">
                  {attributeValueState.id}
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
                  {t('collectionEventReference', {
                    ns: 'userAttributeForm',
                  })}
                  :{' '}
                </Typography>
              </Box>
              <Stack sx={{ alignItems: 'flex-start' }}>
                {attributeValueState.collectionEventReference.map((event) => {
                  return (
                    <Typography
                      variant="body1"
                      key={event.id}
                      sx={{ marginRight: 1 }}
                    >
                      •{' '}
                      {
                        collectionEvents.find(
                          (collectionEvent) => collectionEvent.id === event.id
                        ).collectionEventName[i18n.language]
                      }
                    </Typography>
                  );
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
                  onClick={() => setOpenConfirmationDelete(true)}
                  variant="outlined"
                  sx={{ marginLeft: 2 }}
                  startIcon={<FiTrash />}
                >
                  <Typography variant="body1" fontWeight="xl">
                    {t('delete', { ns: 'form' })}
                  </Typography>
                </Button>
                <Button
                  size="small"
                  onClick={handleDuplicateClick}
                  variant="contained"
                  sx={{ marginLeft: 2 }}
                  startIcon={<FiCopy />}
                >
                  <Typography variant="body1" fontWeight="xl">
                    {t('duplicate', { ns: 'dataCollectionDetails' })}
                  </Typography>
                </Button>
                <Button
                  size="small"
                  onClick={() => setOpen(true)}
                  variant="contained"
                  sx={{ marginLeft: 2 }}
                  startIcon={<FiEdit />}
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
      <EditCollectionGroupDialog
        open={open}
        handleClose={handleClose}
        attributeValueState={attributeValueState}
        setAttributeValueState={setAttributeValueState}
        dataCollectionState={dataCollectionState}
        setDataCollectionState={setDataCollectionState}
        collectionEvents={collectionEvents}
        setNotSavedSate={setNotSavedState}
      />
      <ConfirmationDeleteDialog
        openConfirmationDelete={openConfirmationDelete}
        setConfirmationDelete={setOpenConfirmationDelete}
        handleDeleteFunction={handleDeleteClick}
      />
    </>
  );
};

export default CollectionGroupDisplay;
