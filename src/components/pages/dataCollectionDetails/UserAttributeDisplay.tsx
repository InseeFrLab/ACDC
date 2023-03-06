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
import StyledCardActionArea from '@/components/shared/styled/CardActionArea';
import { DataCollection } from '../../../lib/model/dataCollection';
import { UserAttributePairValue } from '../../../lib/model/collectionGroups';
import EditCollectionGroupDialog from './updateDataForm/EditCollectionGroup';

interface UserAttributeDisplayProps {
  attributeValue: UserAttributePairValue;
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

const UserAttributeDisplay = (props: UserAttributeDisplayProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'userAttributeForm',
    'form',
  ]);
  console.log('Language', i18n.language);
  const {
    attributeValue,
    dataCollectionState,
    setDataCollectionState,
    handleDeleteUserAttribute,
    setNotSavedState,
  } = props;
  const [collectionEvents, setCollectionEvents] = useState(
    dataCollectionState.collectionEvents
  );
  const [attributeValueState, setAttributeValueState] =
    useState(attributeValue);
  console.log('attributeValueState: ', attributeValueState);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteClick = (id: string) => {
    handleDeleteUserAttribute(id);
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
                  onClick={() => {
                    console.log('edit');
                  }}
                  variant="contained"
                  sx={{ marginLeft: 2 }}
                >
                  <Typography variant="body1" fontWeight="xl">
                    {t('edit', { ns: 'dataCollectionDetails' })}
                  </Typography>
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    handleDeleteClick(attributeValueState.id);
                  }}
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
    </>
  );
};

export default UserAttributeDisplay;
