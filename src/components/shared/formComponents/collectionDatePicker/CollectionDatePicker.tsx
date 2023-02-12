import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { formatISO } from 'date-fns';

interface CollectionDatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const CollectionDatePicker = (props: CollectionDatePickerProps) => {
  const { t } = useTranslation(['collectionEvent', 'form']);
  return (
    <>
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
    </>
  );
};

export default CollectionDatePicker;
