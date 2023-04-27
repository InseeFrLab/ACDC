import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, TextField, Stack, Typography, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface CollectionDatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const CollectionDatePicker = (props: CollectionDatePickerProps) => {
  const { t } = useTranslation(['collectionEvent', 'form']);
  return (
    <Box
      sx={{
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderTop: '1px solid',
        borderColor: 'divider',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="h6">
        {t('dataCollectionDate', { ns: 'collectionEvent' })}:
      </Typography>

      <Stack spacing={1} direction="row" sx={{ paddingTop: 2 }}>
        <FormControl size="small">
          <DatePicker
            label={t('collectionStartDate', { ns: 'collectionEvent' })}
            value={props.startDate}
            onChange={(date) => date && props.setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
        <FormControl size="small">
          <DatePicker
            label={t('collectionEndDate', { ns: 'collectionEvent' })}
            value={props.endDate}
            minDate={props.startDate}
            onChange={(date) => date && props.setEndDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default CollectionDatePicker;
