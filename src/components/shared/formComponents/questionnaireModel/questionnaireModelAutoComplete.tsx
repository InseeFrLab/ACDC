import {
  FormControl,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PoguesQuestionnaire } from '../../../../lib/model/poguesQuestionnaire';

interface QuestionnaireModelSelectProps {
  questionnaires: any;
  setQuestionnaire: (questionnaire: string) => void;
  setQuestionnaireLabel: (questionnaireLabel: string) => void;
}

const QuestionnaireModelSelect = (props: QuestionnaireModelSelectProps) => {
  const { t } = useTranslation(['questionnaireModel', 'form']);

  const handleQuestionnaireChange = (
    event: any,
    newValue: PoguesQuestionnaire
  ) => {
    const {
      target: { value },
    } = event;
    props.setQuestionnaire(newValue.id);
    props.setQuestionnaireLabel(newValue.label);
  };

  return (
    <>
      <Box
        sx={{
          paddingTop: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {t('questionnaireModel', { ns: 'collectionEvent' })}
        </Typography>
      </Box>
      <FormControl size="small" fullWidth>
        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={props.questionnaires}
          onChange={handleQuestionnaireChange}
          getOptionLabel={(option) => option.label}
          renderOption={(pr, option) => {
            return (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...pr}
              >
                {option.label} - ({option.date})
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('questionnaireModel', { ns: 'collectionEvent' })}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default QuestionnaireModelSelect;
