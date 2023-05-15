import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { DataCollection } from '@/lib/model/dataCollection';
import CollectionEvent from '@/lib/model/collectionEvents';
import {
  CollectionGroup,
  CollectionGroupValue,
} from '@/lib/model/collectionGroups';
import IntlTextInput from '../../../shared/intlTextInput/IntlTextInput';
import CollectionEventCheckBox from '../../../shared/formComponents/collectionGroup/CollectionEventCheckbox';

interface EditCollectionGroupDialogProps {
  open: boolean;
  handleClose: () => void;
  collectionEvents: CollectionEvent[];
  dataCollectionState: DataCollection;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  attributeValueState: CollectionGroupValue;
  setAttributeValueState: (attributeValue: CollectionGroupValue) => void;
  setNotSavedSate: (notSaved: boolean) => void;
}

const EditCollectionGroupDialog = (props: EditCollectionGroupDialogProps) => {
  const { t } = useTranslation([
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

  const resetState = () => {
    setLabelArray([
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
    setCollectionEventCheck(
      props.collectionEvents.map((item) => {
        return props.attributeValueState.collectionEventReference.some(
          (ref) => ref.id === item.id
        )
          ? { [item.id]: true }
          : { [item.id]: false };
      })
    );
  };

  const handleCancel = () => {
    resetState();
    props.handleClose();
  };
  const handleSave = () => {
    const label = createIntlRecord(labelArray);
    const collectionEventsChecked = collectionEventCheck.filter(
      (obj) => Object.values(obj)[0] === true
    );

    const collectionEventReference: Record<'id', string>[] =
      collectionEventsChecked.map((obj) => {
        return { id: Object.keys(obj)[0] };
      });
    const userAttributePairValue: CollectionGroupValue = {
      ...props.attributeValueState,
      label,
      collectionEventReference,
    };

    props.setAttributeValueState(userAttributePairValue);

    const { attributeValue } = props.dataCollectionState.userAttributePair[0];
    const updatedUserAttributePair: CollectionGroup = {
      attributeKey: props.dataCollectionState.userAttributePair[0].attributeKey,
      attributeValue: Array.isArray(attributeValue)
        ? attributeValue.map((item) => {
            if (item.id === props.attributeValueState.id) {
              return userAttributePairValue;
            }
            return item;
          })
        : [{} as CollectionGroupValue],
    };
    console.log('Updated User Attribute Pair: ', updatedUserAttributePair); // GOOD

    const updatedDataCollection = {
      ...props.dataCollectionState,
      userAttributePair: [updatedUserAttributePair],
    }; // GOOD
    props.setDataCollectionState(updatedDataCollection);
    props.setNotSavedSate(true);
    props.handleClose();
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" color="text.secondary">
          {t('editGroup', { ns: 'dataCollectionDetails' })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack spacing={1}>
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
        <Button variant="outlined" onClick={handleCancel} autoFocus>
          {t('close', { ns: 'form' })}
        </Button>

        <Button
          onClick={() => {
            handleSave();
          }}
          variant="customContained"
          sx={{ marginLeft: 2 }}
        >
          {t('save', { ns: 'dataCollectionDetails' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionGroupDialog;
