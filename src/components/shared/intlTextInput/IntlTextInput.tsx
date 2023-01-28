import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const IntlTextInput = (props: any) => {
  const { t } = useTranslation(['dataCollectionForm']);
  const textArray: Record<'id' | 'language' | 'value', string>[] =
    props.textArray;
  const addTextLabel = () => {
    const lastTextId = textArray[textArray.length - 1].id;
    return props.setTextArray([
      ...textArray,
      {
        id: lastTextId + 1,
        language: 'en-IE',
        value: '',
      },
    ]);
  };

  const handleTextChange = (e: any) => {
    e.preventDefault();
    const index = e.target.id;
    props.setTextArray((s: any) => {
      const newText = s.slice();
      newText[index].value = e.target.value;
      return newText;
    });
  };

  const handleTextLanguageChange = (e: any, index: number) => {
    e.preventDefault();
    props.setTextArray((s: any) => {
      const newText = s.slice();
      newText[index].language = e.target.value;
      return newText;
    });
  };

  return (
    <>
      {textArray.map((label, index) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
            key={label.id}
          >
            <TextField
              required
              size="small"
              label={t('label')}
              value={label.value}
              sx={{ marginRight: 2, width: '100%' }}
              onChange={handleTextChange}
              id={index.toString()}
            />
            <Select
              color="primary"
              value={label.language}
              onChange={(e) => handleTextLanguageChange(e, index)}
              id={index.toString()}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
              notched={true}
            >
              <MenuItem value="fr-FR">🇫🇷</MenuItem>
              <MenuItem value="en-IE">🇬🇧</MenuItem>
            </Select>
          </Box>
        );
      })}

      <Box
        component="form"
        className="CollectionForm"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Button variant="outlined" size="small" onClick={addTextLabel}>
          <Typography>{t('addLanguage')}</Typography>
        </Button>
      </Box>
    </>
  );
};

export default IntlTextInput;
