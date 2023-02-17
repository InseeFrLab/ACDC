import {
  Box,
  FormControl,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import jsonData from '../../../../lib/api/mock/mockSeries';
import {
  GroupReference,
  StudyUnitReference,
} from '../../../../lib/model/studyUnitReference';

interface StatisticalOperationSelectProps {
  groupReference: GroupReference;
  setGroupReference: (groupReference: GroupReference) => void;
  studyUnitReference: StudyUnitReference;
  setStudyUnitReference: (studyUnitReference: StudyUnitReference) => void;
}

const StatisticalOperationSelect = (props: StatisticalOperationSelectProps) => {
  const { t } = useTranslation(['dataCollectionForm', 'form']);
  const statisticalOperation = [
    {
      id: 1,
      label: 'Operation 1',
    },
    {
      id: 2,
      label: 'Operation 2',
    },
  ];

  const handleGroupReferenceChange = (event: any, newValue: any) => {
    const {
      target: { value },
    } = event;
    console.log('newValue', newValue);
    props.setGroupReference({
      id: newValue.id,
      label: {
        'fr-FR': newValue.label[0],
        'en-IE': newValue.label[1],
      },
      typeOfObject: 'Group',
    } as GroupReference);
    console.log('Updated groupReference: ', props.groupReference.id);
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
          options={jsonData}
          onChange={handleGroupReferenceChange}
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
              label={t('statisticalOperationSeries', {
                ns: 'dataCollectionForm',
              })}
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
          disabled
          size="small"
          id="select-statistical-operation"
          options={statisticalOperation}
          onChange={() => console.log('Statistical Operation Series Change')}
          getOptionLabel={(option) => option.label}
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...pr}
              >
                {option.label}
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
