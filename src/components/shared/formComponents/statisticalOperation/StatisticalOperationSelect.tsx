/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from 'react';
import {
  Box,
  FormControl,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { transformLabels } from '@/lib/utils/magmaUtils';
import jsonData from '../../../../lib/api/mock/mockSeries';
import StatisticalSeries from '../../../../lib/model/statisticalSeries';
import {
  getSeriesOperation,
  SeriesId,
} from '../../../../lib/api/mock/serieOperation';
import {
  GroupReference,
  StudyUnitReference,
} from '../../../../lib/model/studyUnitReference';

interface StatisticalOperationSelectProps {
  groupReference: GroupReference;
  setgroupReference: (groupReference: GroupReference) => void;
  studyUnitReference: StudyUnitReference;
  setStudyUnitReference: (studyUnitReference: StudyUnitReference) => void;
  series: StatisticalSeries[];
}

const StatisticalOperationSelect = (props: StatisticalOperationSelectProps) => {
  const { t, i18n } = useTranslation(['dataCollectionForm', 'form']);
  const [operationDisabled, setOperationDisabled] = useState(true);
  const [statisticalOperationsList, setStatisticalOperationsList] = useState([
    {
      altLabel: [
        {
          langue: 'fr',
        },
        {
          langue: 'en',
        },
      ],
      label: [
        {
          langue: 'fr',
          contenu: 'Enquête Logement Mayotte 2013',
        },
        {
          langue: 'en',
          contenu: 'Mayotte Housing Survey 2013',
        },
      ],
      uri: 'http://bauhaus/operations/operation/s1448',
      serie: {
        id: 's1004',
        label: [
          {
            langue: 'fr',
            contenu: 'Enquête Logement',
          },
          {
            langue: 'en',
            contenu: 'Housing survey',
          },
        ],
        uri: 'http://bauhaus/operations/serie/s1004',
      },
      id: 's1448',
    },
  ]);
  console.log('Series list: ', props.series);

  const handlegroupReferenceChange = (event: any, newValue: any) => {
    const {
      target: { value },
    } = event;
    console.log('New Statistical serie: ', newValue);
    props.setgroupReference({
      id: newValue.id,
      label: transformLabels(newValue.label),
      typeOfObject: 'Group',
    } as GroupReference);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setStatisticalOperationsList(getSeriesOperation(newValue.id));
    console.log('Associated series Operations: ', statisticalOperationsList);
    // Temp timeout until I get the API token
    setTimeout(() => {
      setOperationDisabled(false);
    });
  };

  const handleStudyUnitReferenceChange = (event: any, newValue: any) => {
    const {
      target: { value },
    } = event;
    console.log('New Statistical Operation: ', newValue);
    props.setStudyUnitReference({
      id: newValue.id,
      label: transformLabels(newValue.label),
      typeOfObject: 'StudyUnit',
      groupReference: props.groupReference,
    } as unknown as StudyUnitReference);

    console.log(
      'Assembled StudyUnitReference Object : ',
      props.studyUnitReference
    );
  };

  return (
    <Stack spacing={2}>
      <Box
        component="form"
        className="CollectionForm"
        sx={{
          paddingTop: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6">
          {t('statisticalOperationSeries', { ns: 'dataCollectionForm' })}* :
        </Typography>
      </Box>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Autocomplete
          disablePortal
          size="small"
          id="select-statistical-operation-series"
          options={props.series}
          onChange={handlegroupReferenceChange}
          getOptionLabel={(option) => {
            return `${option.label[i18n.language]} - (${
              option.altLabel[i18n.language]
            })`;
          }}
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...pr}
              >
                {option.label[i18n.language]} - {option.altLabel[i18n.language]}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('statisticalOperationSeries', {
                ns: 'dataCollectionForm',
              })}
              value={
                props.groupReference.label[i18n.language]
                  ? props.groupReference.label[i18n.language]
                  : ''
              }
            />
          )}
        />
      </FormControl>
      <Box
        component="form"
        className="CollectionForm"
        sx={{
          paddingTop: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6">
          {t('statisticalOperation', { ns: 'dataCollectionForm' })}* :
        </Typography>
      </Box>
      <FormControl size="small" fullWidth sx={{ marginTop: 3 }}>
        <Autocomplete
          disablePortal
          disabled={operationDisabled}
          size="small"
          id="select-statistical-operation"
          options={statisticalOperationsList}
          onChange={handleStudyUnitReferenceChange}
          getOptionLabel={(option) => {
            return `${option.label[0].contenu} - (${option.label[1].contenu})`;
          }}
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...pr}
              >
                {option.label[0].contenu} - ({option.label[1].contenu})
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('statisticalOperation', {
                ns: 'dataCollectionForm',
              })}
            />
          )}
        />
      </FormControl>
    </Stack>
  );
};

export default StatisticalOperationSelect;
