/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Typography,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Stack,
  Box,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { DataCollection } from '../../../lib/model/dataCollection';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import CollectionEventCheckBox from './CollectionEventCheckbox';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import {
  UserAttributePair,
  UserAttributePairValue,
} from '../../../lib/model/userAttributePair';

interface UserAttributeFormProps {
  dataCollection: DataCollection;
}

const UserAttributeForm = (props: UserAttributeFormProps) => {
  const { t } = useTranslation(['userAttributeForm', 'form']);
  const navigate = useNavigate();
  const { dataCollection } = props;
  const [collectionEvents, setCollectionEvents] = useState(
    dataCollection.collectionEvents
  );
  console.log('collectionEvents', collectionEvents);

  const [collectionEventCheck, setCollectionEventCheck] = useState(
    collectionEvents.map((item) => {
      return { [item.id]: false };
    })
  );
  const { isLoading, isError, isSuccess, mutate } =
    useMutation(updateDataCollection);
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: '',
    },
    {
      id: 1,
      language: 'en-IE',
      value: '',
    },
  ]);
  const [textError, setTextError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const checkValidation = () => {
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');
    if (labelArrayFiltered.length === 2) {
      setTextError(false);
      return true;
    }
    setTextError(true);
    return false;
  };

  const createUserAttributeObject = () => {
    const now = Date.now();
    const today = new Date(now);

    const label: Record<'fr-FR' & 'en-IE', string> = labelArray.reduce(
      (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
        map[obj.language] = obj.value;
        return map;
      },
      {}
    );
    const collectionEventsChecked = collectionEventCheck.filter(
      (obj) => Object.values(obj)[0] === true
    );

    const collectionEventReference: Record<'id', string>[] =
      collectionEventsChecked.map((obj) => {
        return { id: Object.keys(obj)[0] };
      });

    console.log('collectionEventReferences', collectionEventReference);

    const userAttributePairValue: UserAttributePairValue = {
      label,
      collectionEventReference,
    };

    const userAttributePair: UserAttributePair = {
      attributeKey: 'extension:CollectionEventGroup',
      attributeValue: [userAttributePairValue],
    };

    const dataCollectionUpdated: DataCollection = {
      versionDate: today.toISOString(),
      ...dataCollection,
    };
    dataCollectionUpdated.userAttributePair.push(userAttributePair);
    console.log('dataCollectionUpdated', dataCollectionUpdated);
    const updatedDataCollection: DataCollectionApi = {
      id: dataCollection.id,
      json: dataCollectionUpdated,
    };
    mutate(updatedDataCollection);
    handleClickOpen();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    checkValidation()
      ? createUserAttributeObject()
      : console.log('Field Validation Error');
  };

  return (
    <>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Stack spacing={2}>
          <Box
            component="form"
            className="AttributeForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 2,
            }}
          >
            <Typography variant="h6">{t('label', { ns: 'form' })}:</Typography>
          </Box>
          <IntlTextInput textArray={labelArray} setTextArray={setLabelArray} />
          <Box
            sx={{
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('collectionEventReference', { ns: 'userAttributeForm' })}:
            </Typography>
          </Box>

          <CollectionEventCheckBox
            collectionEvents={collectionEvents}
            collectionEventCheck={collectionEventCheck}
            setCollectionEventCheck={setCollectionEventCheck}
          />
          <Box
            component="form"
            className="AttributeForm"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              paddingTop: 2,
              borderColor: 'divider',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={handleClose}
            >
              <Typography variant="subtitle1">
                {t('cancel', { ns: 'form' })}
              </Typography>
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              <Typography variant="subtitle1">
                {t('submit', { ns: 'form' })}
              </Typography>
            </Button>
            {textError && (
              <Typography
                variant="subtitle1"
                marginLeft={2}
                fontWeight="bold"
                color="error"
              >
                {t('textFieldError', { ns: 'form' })}
              </Typography>
            )}
          </Box>
        </Stack>
      </FormControl>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h5">{t('submitmessage')}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess ? t('successForm', { ns: 'userAttributeForm' }) : ''}
            {isLoading ? t('loading', { ns: 'form' }) : ''}
            {isError ? t('error', { ns: 'form' }) : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            {t('close', { ns: 'form' })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserAttributeForm;
