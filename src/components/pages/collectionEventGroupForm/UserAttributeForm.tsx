/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { DataCollection } from '../../../lib/model/dataCollection';
import { updateDataCollection } from '../../../lib/api/remote/dataCollectionApiFetch';
import IntlTextInput from '../../shared/intlTextInput/IntlTextInput';
import CollectionEventCheckBox from '../../shared/formComponents/collectionGroup/CollectionEventCheckbox';
import DataCollectionApi from '../../../lib/model/dataCollectionApi';
import { UserAttributePairValue } from '../../../lib/model/collectionGroups';

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
  const [dataCollectionState, setDataCollectionState] =
    useState<DataCollection>(dataCollection);

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

  const handleClose = useCallback(() => {
    setOpen(false);
    navigate(`/collection/${dataCollectionState.id}`, {
      state: { dataCollection: dataCollectionState },
    });
  }, [dataCollectionState, navigate]);

  const checkValidation = () => {
    const labelArrayFiltered = labelArray.filter((obj) => obj.value !== '');
    const collectionEventCheckedLength = collectionEventCheck.filter(
      (obj) => Object.values(obj)[0] === true
    ).length;
    if (labelArrayFiltered.length === 2 && collectionEventCheckedLength > 0) {
      setTextError(false);
      return true;
    }
    setTextError(true);
    return false;
  };

  const createUserAttributeObject = () => {
    const now = Date.now();
    const today = new Date(now);

    const label = createIntlRecord(labelArray);
    const collectionEventsChecked = collectionEventCheck.filter(
      (obj) => Object.values(obj)[0] === true
    );

    const collectionEventReference: Record<'id', string>[] =
      collectionEventsChecked.map((obj) => {
        return { id: Object.keys(obj)[0] };
      });

    console.log('collectionEventReferences', collectionEventReference);

    const userAttributePairValue: UserAttributePairValue = {
      id: uuidv4(),
      label,
      collectionEventReference,
    };
    const dataCollectionUpdated: DataCollection = {
      versionDate: today.toISOString(),
      ...dataCollection,
    };
    dataCollectionUpdated.userAttributePair[0].attributeValue.push(
      userAttributePairValue
    );
    console.log('dataCollectionUpdated', dataCollectionUpdated);
    const updatedDataCollection: DataCollectionApi = {
      id: dataCollection.id,
      json: dataCollectionUpdated,
    };
    mutate(updatedDataCollection);
    setDataCollectionState(dataCollectionUpdated);
    handleClickOpen();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    checkValidation()
      ? createUserAttributeObject()
      : console.log('Field Validation Error');
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

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
            <Typography variant="h6">
              {t('label', { ns: 'form' })}* :
            </Typography>
          </Box>
          <IntlTextInput textArray={labelArray} setTextArray={setLabelArray} />

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
                {t('textFieldError', { ns: 'userAttributeForm' })}
              </Typography>
            )}
          </Box>
        </Stack>
      </FormControl>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h5">
            {t('descriptionForm', { ns: 'userAttributeForm' })}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <DialogContentText>
              <CircularProgress />{' '}
            </DialogContentText>
          ) : (
            <DialogContentText> </DialogContentText>
          )}
          {isError ? (
            <>
              <DialogContentText>
                {t('error', { ns: 'form' })}
              </DialogContentText>
              <DialogActions>
                <Button variant="contained" onClick={handleClose} autoFocus>
                  {t('close', { ns: 'form' })}
                </Button>
              </DialogActions>
            </>
          ) : (
            <DialogContentText />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAttributeForm;