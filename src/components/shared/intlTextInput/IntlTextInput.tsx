/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';

const IntlTextInput = (props: any) => {
  const { textArray } = props;

  const handleTextChange = (e: any): void => {
    e.preventDefault();
    const index = e.target.id;
    props.setTextArray((s: any) => {
      const newText: Record<'id' | 'language' | 'value', string>[] = s.slice();
      newText[index].value = e.target.value;
      return newText;
    });
  };

  const handleTextLanguageChange = (e: SelectChangeEvent, index: number) => {
    e.preventDefault();
    props.setTextArray((s: any) => {
      const newText: Record<'id' | 'language' | 'value', string>[] = s.slice();
      newText[index].language = e.target.value;
      return newText;
    });
  };

  return (
    <>
      {textArray.map(
        (label: Record<'id' | 'language' | 'value', string>, index: number) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
              key={label.id}
            >
              <FormControl fullWidth size="small">
                <TextField
                  required
                  error={label.value === '' && props.submitAttempt}
                  size="small"
                  multiline={props.multiline}
                  // label={t('label')}
                  value={label.value}
                  sx={{ paddingRight: 2, width: '99%', marginTop: 1 }}
                  onChange={handleTextChange}
                  id={index.toString()}
                />
              </FormControl>
              <FormControl size="small">
                <Select
                  color="primary"
                  disabled
                  value={label.language}
                  onChange={(e) => handleTextLanguageChange(e, index)}
                  id={index.toString()}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                    width: 70,
                    marginLeft: 1,
                    marginTop: 1,
                  }}
                  notched
                >
                  <MenuItem value="fr-FR">🇫🇷</MenuItem>
                  <MenuItem value="en-IE">🇬🇧</MenuItem>
                </Select>
              </FormControl>
            </Box>
          );
        }
      )}
    </>
  );
};

export default IntlTextInput;
