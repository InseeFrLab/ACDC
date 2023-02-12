import { useTranslation } from 'react-i18next';
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { typeMode } from '../../../../lib/model/typeOfModeOfCollection';

interface CollectionModeSelectProps {
  modeCollection: string[];
  setModeCollection: (modeCollection: string[]) => void;
}

const CollectionModeSelect = (props: CollectionModeSelectProps) => {
  const { t } = useTranslation(['collectionEvent']);
  const handleModeCollectionChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    props.setModeCollection(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="select-mode-label">
        {t('modeOfCollection', { ns: 'collectionEvent' })}
      </InputLabel>
      <Select
        labelId="select-mode-label"
        sx={{
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
        }}
        notched
        multiple
        // @ts-expect-error mui types are wrong for multiple select
        value={props.modeCollection}
        onChange={handleModeCollectionChange}
        input={<OutlinedInput label="Name" />}
      >
        {typeMode.map((mode) => (
          <MenuItem key={mode.type} value={mode.type}>
            {mode.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CollectionModeSelect;
