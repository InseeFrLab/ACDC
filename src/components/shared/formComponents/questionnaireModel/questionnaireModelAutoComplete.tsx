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
  questionnaires: PoguesQuestionnaire[];
  setQuestionnaire: (questionnaire: string) => void;
  questionnaireLabel: string;
  setQuestionnaireLabel: (questionnaireLabel: string) => void;
  submitAttempt: boolean;
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
        <Typography variant="h6">
          {t('questionnaireModel', { ns: 'collectionEvent' })}* :
        </Typography>
      </Box>
      <FormControl size="small" fullWidth>
        <Autocomplete
          blurOnSelect
          disablePortal
          size="small"
          id="select-questionnaire-model"
          disabled={props.questionnaires.length === 0}
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
              error={props.questionnaireLabel.length < 1 && props.submitAttempt}
              {...params}
              label={t('questionnaireModel', { ns: 'collectionEvent' })}
            />
          )}
          value={
            {
              id: '',
              date: null,
              label: props.questionnaireLabel,
            } as PoguesQuestionnaire
          }
        />
      </FormControl>
    </>
  );
};

export default QuestionnaireModelSelect;
