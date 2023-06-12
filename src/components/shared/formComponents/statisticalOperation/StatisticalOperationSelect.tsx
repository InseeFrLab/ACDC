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
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { transformLabels } from '@/lib/utils/magmaUtils';
import { getSerieOperation } from '@/lib/api/mock/mockSeries';
import { getQualityReport } from '@/lib/api/remote/dataCollectionApiFetch';
import StatisticalSeries from '../../../../lib/model/statisticalSeries';
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
  submitAttempt: boolean;
  setRapport: (rapport: string) => void;
}

const StatisticalOperationSelect = (props: StatisticalOperationSelectProps) => {
  const { t, i18n } = useTranslation(['dataCollectionForm', 'form']);
  const [operationDisabled, setOperationDisabled] = useState(true);
  const [addInfo, setAddInfo] = useState<boolean>(false);
  const [serieId, setSerieId] = useState<string>(
    props.groupReference.id.length > 0 ? props.groupReference.id : 's1002'
  );
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

  const [operationSerie, qualityReportSerie] = useQueries({
    queries: [
      {
        queryKey: ['operationSerie', serieId],
        queryFn: () => {
          console.log('Fetch serie operation: ', serieId);
          return getSerieOperation(serieId);
        },
      },
      {
        queryKey: ['qualitySerie', serieId],
        queryFn: () => {
          return getQualityReport('2088');
        },
        enabled: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onSuccess(data: unknown) {
          console.log('Fetch quality report success: ', data);
        },
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (operationSerie.isSuccess) {
      setIsLoading(false);
      const newOperations: StatisticalSeries[] = operationSerie.data.map(
        (serie: any) => ({
          id: serie.id,
          label: transformLabels(serie.label),
          altLabel: serie.altLabel
            ? transformLabels(serie.altLabel)
            : { 'fr-FR': '', 'en-IE': '' },
        })
      );
      setOperations(newOperations);
      console.log('Associated series Operations: ', newOperations);
      console.log('Submit attempt: ', props.submitAttempt);
      setOperationDisabled(false);
    }
  }, [operationSerie.isSuccess, operationSerie.data, props.submitAttempt]);

  useEffect(() => {
    if (qualityReportSerie.isSuccess) {
      setIsLoading(false);
      console.log('Quality report: ', qualityReportSerie.data);
      props.setRapport(qualityReportSerie.data);
    }
  }, [qualityReportSerie.isSuccess, qualityReportSerie.data, props]);

  const handlegroupReferenceChange = (event: any, newValue: any) => {
    const {
      target: { value },
    } = event;
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
    qualityReportSerie.refetch();
  };

  return (
    <Stack spacing={1}>
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
          blurOnSelect
          size="small"
          id="select-statistical-operation-series"
          options={props.series}
          onChange={handlegroupReferenceChange}
          getOptionLabel={(option) => {
            return `${option.label[i18n.language]}`;
          }}
          value={
            {
              id: '',
              label: props.groupReference.label,
              altLabel: {
                'fr-FR': '',
                'en-IE': '',
              },
            } as StatisticalSeries
          }
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                key={option.id}
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
              error={
                props.submitAttempt &&
                props.studyUnitReference.groupReference.id.length < 1
              }
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
          blurOnSelect
          disabled={operationDisabled}
          loading={isLoading}
          size="small"
          id="select-statistical-operation"
          options={operations}
          onChange={handleStudyUnitReferenceChange}
          getOptionLabel={(option) => {
            return `${option.label[i18n.language]}`;
          }}
          value={
            {
              id: '',
              label: props.studyUnitReference.label,
              altLabel: {
                'fr-FR': '',
                'en-IE': '',
              },
            } as StatisticalSeries
          }
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
              error={
                props.submitAttempt && props.studyUnitReference.id.length < 1
              }
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
