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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import IntlTextInput from '@/components/shared/intlTextInput/IntlTextInput';
import { createIntlRecord } from '@/lib/utils/dataTransformation';
import { CollectionGroup } from '@/lib/model/collectionGroups';
import { UserAttributePair } from '@/lib/model/userAttributePair';
import OtherInfo from '@/components/shared/formComponents/otherInformations/OtherInfo';
import CodeList from '@/lib/model/codeList';
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

  const [anneeVisa, setAnneeVisa] = useState(() => {
    const result = dataCollectionState.userAttributePair.find(
      (userAttributeValue) =>
        userAttributeValue.attributeKey === 'extension:anneeVisa'
    );

    if (result) {
      const attributeValue = result.attributeValue as string;

      if (attributeValue !== 'NaN') {
        const date = new Date(attributeValue);

        if (!Number.isNaN(date.getTime())) {
          return date.toISOString();
        }
      }
    }

    return '';
  });
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
  const [dateParutionJO, setDateParutionJO] = useState(() => {
    const result = dataCollectionState.userAttributePair.find(
      (userAttribute) =>
        userAttribute.attributeKey === 'extension:dateParutionJO'
    );

    if (result) {
      const date = new Date(result.attributeValue as string);

      if (!Number.isNaN(date.getTime())) {
        return date.toISOString();
      }
    }

    return '';
  });
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

  const [qualityReport, setQualityReport] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) =>
          userAttribute.attributeKey === 'extension:qualityReport'
      )
    ].attributeValue
  );

  const [surveyStatus, setSurveyStatus] = useState<CodeList>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    CodeList.fromString(
      dataCollectionState.userAttributePair[
        dataCollectionState.userAttributePair.findIndex(
          (userAttribute) =>
            userAttribute.attributeKey === 'extension:surveyStatus'
        )
      ].attributeValue as string
    )
  );

  const [visaNumber, setVisaNumber] = useState(
    dataCollectionState.userAttributePair[
      dataCollectionState.userAttributePair.findIndex(
        (userAttribute) => userAttribute.attributeKey === 'extension:visaNumber'
      )
    ].attributeValue
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
    const dateJO = new Date(dateParutionJO);
    const formatedJO = `${dateJO.getFullYear()}/${(dateJO.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${dateJO.getDate().toString().padStart(2, '0')}`;
    console.log('DurveyStatus: ', surveyStatus);
    const dateVisa = new Date(anneeVisa);
    const formatedVisa = `${dateVisa.getFullYear()}`;
    const userAttributePair: (CollectionGroup | UserAttributePair)[] = [
      {
        attributeKey: 'extension:anneeVisa',
        attributeValue: formatedVisa,
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
        attributeValue: formatedJO,
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
      {
        attributeKey: 'extension:qualityReport',
        attributeValue: qualityReport.toString(),
      } as UserAttributePair,
      {
        attributeKey: 'extension:visaNumber',
        attributeValue: visaNumber.toString(),
      } as UserAttributePair,
      ...dataCollectionState.userAttributePair,
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
      fullWidth
      maxWidth="md"
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
              setQualityReport={() => {}}
              setSurveyStatus={() => {}}
              setVisaNumber={() => {}}
            />
          </Box>

          <Box
            component="div"
            className="LabelForm"
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
            component="div"
            className="DescriptionForm"
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
          <OtherInfo
            multiline
            rapport=""
            anneeVisa={anneeVisa}
            setAnneeVisa={setAnneeVisa}
            ministereTutelle={ministereTutelle.toString()}
            setMinistereTutelle={setMinistereTutelle}
            parutionJO={parutionJO}
            setParutionJO={setParutionJO}
            dateParutionJO={dateParutionJO}
            setDateParutionJO={setDateParutionJO}
            serviceCollecteurSignataireNom={serviceCollecteurSignataireNom.toString()}
            setServiceCollecteurSignataireNom={
              setServiceCollecteurSignataireNom
            }
            serviceCollecteurSignataireFonction={serviceCollecteurSignataireFonction.toString()}
            setServiceCollecteurSignataireFonction={
              setServiceCollecteurSignataireFonction
            }
            mailResponsableOperationel={mailResponsableOperationel.toString()}
            setMailResponsableOperationel={setMailResponsableOperationel}
            submitAttempt={false}
            qualityReport={qualityReport.toString()}
            surveyStatus={surveyStatus}
            visaNumber={visaNumber.toString()}
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
