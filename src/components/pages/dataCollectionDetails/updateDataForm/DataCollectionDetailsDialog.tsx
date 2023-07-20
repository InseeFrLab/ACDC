import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
  Stack,
  FormControl,
  Checkbox,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import IntlTextInput from '@/components/shared/intlTextInput/IntlTextInput';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { DatePicker } from '@mui/x-date-pickers';
import { CollectionGroup } from '@/lib/model/collectionGroups';
import { UserAttributePair } from '@/lib/model/userAttributePair';
import { DataCollection } from '../../../../lib/model/dataCollection';
import StatisticalOperationSelect from '../../../shared/formComponents/statisticalOperation/StatisticalOperationSelect';
import StatisticalSeries from '../../../../lib/model/statisticalSeries';

interface DataCollectionDetailsDialogProps {
  open: boolean;
  dataCollectionState: DataCollection;
  setOpen: (open: boolean) => void;
  setDataCollectionState: (dataCollection: DataCollection) => void;
  series: StatisticalSeries[];
  setNotSavedState: (notSaved: boolean) => void;
}
const DataCollectionDetailsDialog = (
  props: DataCollectionDetailsDialogProps
) => {
  const { t } = useTranslation(['dataCollectionDetails', 'form']);
  const navigate = useNavigate();
  const { open, dataCollectionState, series } = props;
  const [labelArray, setLabelArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: dataCollectionState.label['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: dataCollectionState.label['en-IE'],
    },
  ]);
  const [descriptionArray, setDescriptionArray] = useState([
    {
      id: 1,
      language: 'fr-FR',
      value: dataCollectionState.description['fr-FR'],
    },
    {
      id: 2,
      language: 'en-IE',
      value: dataCollectionState.description['en-IE'],
    },
  ]);
  const [studyUnitReference, setStudyUnitReference] = useState(
    dataCollectionState.studyUnitReference
  );

  const [groupReference, setGroupReference] = useState(
    dataCollectionState.studyUnitReference.groupReference
  );

  const [anneeVisa, setAnneeVisa] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) => userAttribute.attributeKey === 'extension:anneeVisa'
      )
    ]
      ? dataCollectionState.userAttributePair[
          dataCollectionState.userAttributePair.findIndex(
            (userAttribute) =>
              userAttribute.attributeKey === 'extension:anneeVisa'
          )
        ].attributeValue
      : ''
  );
  const [ministereTutelle, setMinistereTutelle] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) =>
          userAttribute.attributeKey === 'extension:ministereTutelle'
      )
    ]
      ? dataCollectionState.userAttributePair[
          dataCollectionState.userAttributePair.findIndex(
            (userAttribute) =>
              userAttribute.attributeKey === 'extension:ministereTutelle'
          )
        ].attributeValue
      : ''
  );
  const [parutionJO, setParutionJO] = useState<boolean>(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) => userAttribute.attributeKey === 'extension:parutionJO'
      )
    ]
      ? (JSON.parse(
          dataCollectionState.userAttributePair[
            dataCollectionState.userAttributePair.findIndex(
              (userAttribute) =>
                userAttribute.attributeKey === 'extension:parutionJO'
            )
          ].attributeValue.toString()
        ) as boolean)
      : false
  );
  const [dateParutionJO, setDateParutionJO] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) =>
          userAttribute.attributeKey === 'extension:dateParutionJO'
      )
    ]
      ? dataCollectionState.userAttributePair[
          dataCollectionState.userAttributePair.findIndex(
            (userAttribute) =>
              userAttribute.attributeKey === 'extension:dateParutionJO'
          )
        ].attributeValue
      : ''
  );
  const [serviceCollecteurSignataireNom, setServiceCollecteurSignataireNom] =
    useState(
      dataCollectionState.userAttributePair[
        dataCollectionState.userAttributePair.findIndex(
          (userAttribute) =>
            userAttribute.attributeKey ===
            'extension:serviceCollecteurSignataireNom'
        )
      ]
        ? dataCollectionState.userAttributePair[
            dataCollectionState.userAttributePair.findIndex(
              (userAttribute) =>
                userAttribute.attributeKey ===
                'extension:serviceCollecteurSignataireNom'
            )
          ].attributeValue
        : ''
    );
  const [
    serviceCollecteurSignataireFonction,
    setServiceCollecteurSignataireFonction,
  ] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) =>
          userAttribute.attributeKey ===
          'extension:serviceCollecteurSignataireFonction'
      )
    ]
      ? dataCollectionState.userAttributePair[
          dataCollectionState.userAttributePair.findIndex(
            (userAttribute) =>
              userAttribute.attributeKey ===
              'extension:serviceCollecteurSignataireFonction'
          )
        ].attributeValue
      : ''
  );
  const [mailResponsableOperationel, setMailResponsableOperationel] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) =>
          userAttribute.attributeKey === 'extension:mailResponsableOperationel'
      )
    ]
      ? dataCollectionState.userAttributePair[
          dataCollectionState.userAttributePair.findIndex(
            (userAttribute) =>
              userAttribute.attributeKey ===
              'extension:mailResponsableOperationel'
          )
        ].attributeValue
      : ''
  );

  const resetState = () => {
    setLabelArray([
      {
        id: 1,
        language: 'fr-FR',
        value: dataCollectionState.label['fr-FR'],
      },
      {
        id: 2,
        language: 'en-IE',
        value: dataCollectionState.label['en-IE'],
      },
    ]);
    setDescriptionArray([
      {
        id: 1,
        language: 'fr-FR',
        value: dataCollectionState.description['fr-FR'],
      },
      {
        id: 2,
        language: 'en-IE',
        value: dataCollectionState.description['en-IE'],
      },
    ]);
    setStudyUnitReference(dataCollectionState.studyUnitReference);
    setGroupReference(dataCollectionState.studyUnitReference.groupReference);
  };

  const handleClose = () => {
    props.setOpen(false);

    const label = createIntlRecord(labelArray);
    const description = createIntlRecord(descriptionArray);
    const userAttributePair: (CollectionGroup | UserAttributePair)[] = [
      {
        attributeKey: 'extension:anneeVisa',
        attributeValue: anneeVisa,
      } as UserAttributePair,
      {
        attributeKey: 'extension:ministereTutelle',
        attributeValue: ministereTutelle,
      } as UserAttributePair,
      {
        attributeKey: 'extension:parutionJO',
        attributeValue: parutionJO.toString(),
      } as UserAttributePair,
      {
        attributeKey: 'extension:dateParutionJO',
        attributeValue: dateParutionJO,
      } as UserAttributePair,
      {
        attributeKey: 'extension:serviceCollecteurSignataireNom',
        attributeValue: serviceCollecteurSignataireNom,
      } as UserAttributePair,
      {
        attributeKey: 'extension:serviceCollecteurSignataireFonction',
        attributeValue: serviceCollecteurSignataireFonction,
      } as UserAttributePair,
      {
        attributeKey: 'extension:mailResponsableOperationel',
        attributeValue: mailResponsableOperationel,
      } as UserAttributePair,
    ];
    const collectionGroupIndex =
      dataCollectionState.userAttributePair?.findIndex(
        (userAttribute) =>
          userAttribute.attributeKey === 'extension:CollectionEventGroup'
      );
    if (collectionGroupIndex !== undefined && collectionGroupIndex !== -1) {
      userAttributePair.unshift(
        dataCollectionState.userAttributePair[collectionGroupIndex]
      );
    } else {
      userAttributePair.unshift({
        attributeKey: 'extension:CollectionEventGroup',
        attributeValue: [],
      } as CollectionGroup);
    }
    const updatedDataCollection: DataCollection = {
      ...dataCollectionState,
      label,
      description,
      userAttributePair,
      studyUnitReference,
    };
    console.log('updatedDataCollection: ', updatedDataCollection);
    props.setDataCollectionState(updatedDataCollection);
    props.setNotSavedState(true);
    const dataCollectionLink = dataCollectionState;
    navigate(`/collection/${dataCollectionLink.id}`, {
      state: { dataCollection: dataCollectionLink },
    });
  };

  const handleCloseCancel = () => {
    resetState();
    props.setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" color="text.secondary" fontWeight="bold">
          {t('dataCollectionDetails')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
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
            <Typography variant="body1">{dataCollectionState.id}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              marginTop: 1,
            }}
          >
            <StatisticalOperationSelect
              groupReference={groupReference}
              setgroupReference={setGroupReference}
              studyUnitReference={studyUnitReference}
              setStudyUnitReference={setStudyUnitReference}
              series={series}
              submitAttempt={false}
              setRapport={() => {}}
            />
          </Box>

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 2,
              marginTop: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('label', { ns: 'form' })}* :
            </Typography>
          </Box>
          <IntlTextInput
            textArray={labelArray}
            setTextArray={setLabelArray}
            multiline={false}
          />
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('descriptionField', { ns: 'form' })} :
            </Typography>
          </Box>

          <IntlTextInput
            textArray={descriptionArray}
            setTextArray={setDescriptionArray}
            multiline
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 1,
              paddingTop: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
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
              {dataCollectionState.version}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 1,
            }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ marginRight: 1 }}
            >
              {t('lastUpdate', { ns: 'form' })}:{' '}
            </Typography>
            <Typography variant="body1">
              {moment(dataCollectionState.versionDate).format(
                'DD/MM/YYYYHH:mm'
              )}
            </Typography>
          </Box>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('visaYear', { ns: 'dataCollectionForm' })} :
            </Typography>
          </Box>
          <FormControl size="small" sx={{ marginTop: 1 }}>
            <DatePicker
              label={t('visaYear', { ns: 'dataCollectionForm' })}
              openTo="year"
              value={anneeVisa}
              views={['year']}
              onChange={(date) => date && setAnneeVisa(date.toString())}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('ministry', { ns: 'dataCollectionForm' })} :
            </Typography>
          </Box>
          <FormControl size="small" sx={{ marginTop: 1 }}>
            <TextField
              id="ministry"
              name="ministry"
              variant="outlined"
              size="small"
              fullWidth
              value={ministereTutelle}
              onChange={(e) => setMinistereTutelle(e.target.value)}
            />
          </FormControl>
          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            {' '}
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormControl size="small">
                <Checkbox
                  checked={parutionJO}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                  onChange={(e) => setParutionJO(e.target.checked)}
                />
              </FormControl>
              <Typography variant="h6">
                {t('parutionJO', { ns: 'dataCollectionForm' })}
              </Typography>
            </Stack>
          </Box>

          {parutionJO && (
            <FormControl size="small" sx={{ marginTop: 1 }}>
              <DatePicker
                label={t('dateParutionJO', { ns: 'dataCollectionForm' })}
                disabled={!parutionJO}
                openTo="year"
                views={['year']}
                value={dateParutionJO}
                onChange={(date) => date && setDateParutionJO(date.toString())}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          )}

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('serviceCollecteurSignataireName', {
                ns: 'dataCollectionForm',
              })}{' '}
              :
            </Typography>
          </Box>
          <FormControl size="small" sx={{ marginTop: 1 }}>
            <TextField
              id="serviceCollecteurSignataireName"
              name="serviceCollecteurSignataireName"
              variant="outlined"
              size="small"
              fullWidth
              value={serviceCollecteurSignataireNom}
              onChange={(e) =>
                setServiceCollecteurSignataireNom(e.target.value)
              }
            />
          </FormControl>

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('serviceCollecteurSignataireFunction', {
                ns: 'dataCollectionForm',
              })}{' '}
              :
            </Typography>
          </Box>
          <FormControl size="small" sx={{ marginTop: 1 }}>
            <TextField
              id="serviceCollecteurSignataireFonction"
              name="serviceCollecteurSignataireFonction"
              variant="outlined"
              size="small"
              fullWidth
              value={serviceCollecteurSignataireFonction}
              onChange={(e) =>
                setServiceCollecteurSignataireFonction(e.target.value)
              }
            />
          </FormControl>

          <Box
            component="form"
            className="CollectionForm"
            sx={{
              paddingTop: 2,
              marginTop: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">
              {t('mailResponsableOperationnel', {
                ns: 'dataCollectionForm',
              })}{' '}
              :
            </Typography>
          </Box>
          <FormControl size="small" sx={{ marginTop: 1 }}>
            <TextField
              id="mailResponsableOperationel"
              name="mailResponsableOperationel"
              variant="outlined"
              size="small"
              fullWidth
              value={mailResponsableOperationel}
              onChange={(e) => setMailResponsableOperationel(e.target.value)}
              label="Email"
              type="email"
              inputProps={{
                pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
                title: 'Please enter a valid email address',
              }}
            />
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseCancel} autoFocus>
          {t('cancel', { ns: 'form' })}
        </Button>
        <Button variant="customContained" onClick={handleClose} autoFocus>
          {t('submit', { ns: 'form' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataCollectionDetailsDialog;
