import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatISO } from 'date-fns';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  TextField,
  Stack,
} from '@mui/material';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { DataCollection } from '@/lib/model/dataCollection';
import CollectionEvent from '@/lib/model/collectionEvents';
import {
  UserAttributePair,
  UserAttributePairValue,
} from '@/lib/model/collectionGroups';
import IntlTextInput from '../../../shared/intlTextInput/IntlTextInput';
import CollectionEventCheckBox from '../../collectionEventGroupForm/CollectionEventCheckbox';

interface EditCollectionGroupDialogProps {
  open: boolean;
  handleClose: () => void;
  collectionEvents: CollectionEvent[];
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  attributeValueState: UserAttributePairValue;
  setAttributeValueState: (attributeValue: UserAttributePairValue) => void;
  setNotSavedSate: (notSaved: boolean) => void;
}

const EditCollectionGroupDialog = (props: EditCollectionGroupDialogProps) => {
  const { t, i18n } = useTranslation([
    'dataCollectionDetails',
    'collectionEvent',
    'form',
  ]);

  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: props.attributeValueState.label['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: props.attributeValueState.label['en-IE'],
    },
  ]);

  const [collectionEventCheck, setCollectionEventCheck] = useState(
    props.collectionEvents.map((item) => {
      return props.attributeValueState.collectionEventReference.some(
        (ref) => ref.id === item.id
      )
        ? { [item.id]: true }
        : { [item.id]: false };
    })
  );

  const handleSave = () => {
    console.log('Update CollectionGroup: ', props.attributeValueState);

    const label = createIntlRecord(labelArray);
    const collectionEventsChecked = collectionEventCheck.filter(
      (obj) => Object.values(obj)[0] === true
    );

    const collectionEventReference: Record<'id', string>[] =
      collectionEventsChecked.map((obj) => {
        return { id: Object.keys(obj)[0] };
      });
    const userAttributePairValue: UserAttributePairValue = {
      ...props.attributeValueState,
      label,
      collectionEventReference,
    };

    props.setAttributeValueState(userAttributePairValue);

    const updatedUserAttributePair = {
      ...props.dataCollectionState.userAttributePair,
      attributeValue:
        props.dataCollectionState.userAttributePair[0].attributeValue.map(
          (item) => {
            if (item.id === props.attributeValueState.id) {
              return userAttributePairValue;
            }
            return item;
          }
        ),
    };

    const updatedDataCollection = {
      ...props.dataCollectionState,
      userAttributePair: updatedUserAttributePair,
    };

    setTimeout(() => {
      props.setDataCollectionState(updatedDataCollection);
      console.log(
        'Updated Data Collection with updated Collection Group: ',
        props.dataCollectionState
      );
    }, 200);
    props.setNotSavedSate(true);
    props.handleClose();
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" color="text.secondary">
          {t('editEvent', { ns: 'dataCollectionDetails' })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack spacing={2}>
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
                {props.attributeValueState.id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingTop: 2,
                }}
              >
                <Typography variant="h6">
                  {t('label', { ns: 'form' })}*:
                </Typography>
              </Box>
              <IntlTextInput
                textArray={labelArray}
                setTextArray={setLabelArray}
              />
            </Box>
            <CollectionEventCheckBox
              collectionEvents={props.collectionEvents}
              collectionEventCheck={collectionEventCheck}
              setCollectionEventCheck={setCollectionEventCheck}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose} autoFocus>
          {t('close', { ns: 'form' })}
        </Button>

        <Button
          onClick={() => {
            handleSave();
          }}
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
          {t('save', { ns: 'dataCollectionDetails' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionGroupDialog;
