/* eslint-disable @typescript-eslint/no-explicit-any */
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
import CodeList from '@/lib/model/codeList';
import Rapport2088 from '@/assets/mockData/rapport2088.json';
import LanguageRecord from '@/lib/model/languageRecord';
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
  setQualityReport: (qualityReport: string) => void;
  setSurveyStatus: (surveyStatus: CodeList) => void;
  setVisaNumber: (visaNumber: string) => void;
}

const StatisticalOperationSelect = (props: StatisticalOperationSelectProps) => {
  const { t, i18n } = useTranslation(['dataCollectionForm', 'form']);

  const [operationDisabled, setOperationDisabled] = useState(true);
  // const [addInfo, setAddInfo] = useState<boolean>(false);
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
        onSuccess: (data: any): void => {
          console.log('data : ', data);
          const rapportData = data.length > 10 ? JSON.parse(data) : Rapport2088;
          const i63 = rapportData.rubriques.find((r: any) => r.id === 'I.6.3');

          const i64 = rapportData.rubriques.find((r: any) => r.id === 'I.6.4');
          props.setQualityReport(rapportData.label[0].contenu);
          props.setSurveyStatus({
            label: i63.codes[0].label[0].contenu,
            code: i63.codes[0].id,
          });
          props.setVisaNumber(i64?.label[0].contenu.replace(/<\/?p>/g, ''));

          props.setRapport(rapportData);
          console.log('Rapport:', rapportData);
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
      setOperationDisabled(false);
    }
  }, [operationSerie.isSuccess, operationSerie.data, props.submitAttempt]);

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

    qualityReportSerie.refetch();
  };

  return (
    <Stack spacing={1}>
      <Box
        component="div"
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
            return `${option.label[i18n.language as keyof LanguageRecord]}`;
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
                {`${option.label[i18n.language as keyof LanguageRecord]}`}
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
                props.groupReference.label[
                  i18n.language as keyof LanguageRecord
                ]
                  ? props.groupReference.label[
                      i18n.language as keyof LanguageRecord
                    ]
                  : ''
              }
            />
          )}
        />
      </FormControl>
      <Box
        component="div"
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
            return `${option.label[i18n.language as keyof LanguageRecord]}`;
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
                {`${option.label[i18n.language as keyof LanguageRecord]}`}
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
