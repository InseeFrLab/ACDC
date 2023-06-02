import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Collapse,
  Typography,
  Stack,
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import ExpandMore from '@/components/shared/styled/ExpandMore';
import Rapport2088 from '@/assets/mockData/rapport2088.json';

interface OtherInfoProps {
  multiline: boolean;
}
// Hardcoded data for now
const OtherInfo = (props: OtherInfoProps) => {
  const [addInfo, setAddInfo] = useState(false);
  const { t, i18n } = useTranslation(['dataCollectionForm', 'form']);
  const i63 = Rapport2088.rubriques.find((r) => r.id === 'I.6.3');
  const i64 = Rapport2088.rubriques.find((r) => r.id === 'I.6.4');
  console.log('i63', i63);
  console.log('i64', i64);
  return (
    <>
      <ExpandMore
        expand={false}
        onClick={() => {
          setAddInfo(!addInfo);
        }}
        aria-expanded={addInfo}
        aria-label="show more"
        sx={{ marginTop: 2 }}
      >
        <Typography variant="subtitle1">
          {t('addInfo', { ns: 'form' })}:
        </Typography>
      </ExpandMore>

      <Collapse in={addInfo} timeout="auto" unmountOnExit>
        <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="h6">
            {t('qualityReport', { ns: 'dataCollectionForm' })} :
          </Typography>
          <FormControl size="small" fullWidth>
            <TextField
              disabled
              size="small"
              multiline={props.multiline}
              value={Rapport2088.label[0].contenu}
              sx={{ paddingRight: 2, width: '99%', marginTop: 0 }}
            />
          </FormControl>
        </Stack>
        <Stack spacing={0.5} sx={{ alignItems: 'flex-start', marginTop: 1 }}>
          <Typography variant="subtitle1">{i63?.titre[0].contenu} :</Typography>
          <FormControl size="small" fullWidth>
            <TextField
              disabled
              size="small"
              multiline={props.multiline}
              value={i63?.codes[0].label[0].contenu}
              sx={{ paddingRight: 2, width: '99%', marginTop: 0 }}
            />
          </FormControl>
          <Typography variant="subtitle1">{i64?.titre[0].contenu} :</Typography>
          <FormControl size="small" fullWidth>
            <TextField
              disabled
              size="small"
              multiline={props.multiline}
              value={i64?.label[0].contenu.replace(/<\/?p>/g, '')}
              sx={{ paddingRight: 2, width: '99%', marginTop: 0 }}
            />
          </FormControl>
        </Stack>
      </Collapse>
    </>
  );
};

export default OtherInfo;
