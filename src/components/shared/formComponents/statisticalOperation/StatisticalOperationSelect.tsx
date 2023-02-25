/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { transformLabels } from '@/lib/utils/magmaUtils';
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
  const [serieId, setSerieId] = useState<string>('s1004');
  const [operations, setOperations] = useState<StatisticalSeries[]>([
    {
      id: '',
      label: {
        'fr-FR': '',
        'en-IE': '',
      },
      altLabel: {
        'fr-FR': '',
        'en-IE': '',
      },
    },
  ]);

  const { data, isSuccess } = useQuery(['operationSerie', serieId], () => {
    console.log('Fetch serie operation: ', serieId);
    return getSeriesOperation(serieId);
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
      const newOperations: StatisticalSeries[] = [];
      data.forEach((serie: any) => {
        const dataSerie: StatisticalSeries = {
          id: serie.id,
          label: transformLabels(serie.label),
          altLabel: serie.altLabel
            ? transformLabels(serie.altLabel)
            : {
                'fr-FR': '',
                'en-IE': '',
              },
        };
        newOperations.push(dataSerie);
      });
      setOperations(newOperations);
      console.log('Associated series Operations: ', newOperations);
      setOperationDisabled(false);
    }
  }, [isSuccess, data]);

  const handlegroupReferenceChange = (event: any, newValue: any) => {
    const {
      target: { value },
    } = event;
    console.log('New Statistical serie: ', newValue);
    props.setgroupReference({
      id: newValue.id,
      label: newValue.label,
      typeOfObject: 'Group',
    } as GroupReference);
    setSerieId(newValue.id);
    setIsLoading(true);
    // reset Statistical Operation
    props.setStudyUnitReference({
      id: '',
      label: {
        'fr-FR': '',
        'en-IE': '',
      },
      typeOfObject: 'StudyUnit',
      groupReference: props.groupReference,
    } as StudyUnitReference);
  };

  const handleStudyUnitReferenceChange = (event: any, newValue: any) => {
    const {
      target: { value },
    } = event;
    console.log('New Statistical Operation: ', newValue);
    props.setStudyUnitReference({
      id: newValue.id,
      label: newValue.label,
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
            return `${option.label[i18n.language]}`;
          }}
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...pr}
              >
                {option.label[i18n.language]}
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
          loading={isLoading}
          size="small"
          id="select-statistical-operation"
          options={operations}
          onChange={handleStudyUnitReferenceChange}
          getOptionLabel={(option) => {
            return `${option.label[i18n.language]}`;
          }}
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...pr}
              >
                {option.label[i18n.language]}
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
