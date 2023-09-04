/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Collapse,
  Typography,
  Stack,
  FormControl,
  TextField,
  Box,
  Checkbox,
} from '@mui/material';
import ExpandMore from '@/components/shared/styled/ExpandMore';
import Rapport2088 from '@/assets/mockData/rapport2088.json';
import { DatePicker } from '@mui/x-date-pickers';
import CodeList from '@/lib/model/codeList';
import LanguageRecord from '@/lib/model/languageRecord';

interface OtherInfoProps {
  multiline: boolean;
  rapport: string;
  anneeVisa: string;
  setAnneeVisa: (value: string) => void;
  ministereTutelle: string;
  setMinistereTutelle: (value: string) => void;
  parutionJO: boolean;
  setParutionJO: (value: boolean) => void;
  dateParutionJO: string;
  setDateParutionJO: (value: string) => void;
  serviceCollecteurSignataireNom: string;
  setServiceCollecteurSignataireNom: (value: string) => void;
  serviceCollecteurSignataireFonction: string;
  setServiceCollecteurSignataireFonction: (value: string) => void;
  mailResponsableOperationel: string;
  setMailResponsableOperationel: (value: string) => void;
  submitAttempt: boolean;
  qualityReport: string;
  surveyStatus: CodeList;
  visaNumber: string;
}
// Hardcoded data for now

// TODO: Proper Interface
const OtherInfo = (props: OtherInfoProps) => {
  const [addInfo, setAddInfo] = useState(false);
  const { t, i18n } = useTranslation(['dataCollectionForm', 'form']);
  const rapportData =
    props.rapport?.length > 10 ? JSON.parse(props.rapport) : Rapport2088;
  const i63 = rapportData.rubriques.find((r: any) => r.id === 'I.6.3');
  const i64 = rapportData.rubriques.find((r: any) => r.id === 'I.6.4');

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
        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('visaYear', { ns: 'dataCollectionForm' })} :
          </Typography>
          <FormControl size="small" sx={{ marginTop: 1 }} fullWidth>
            <DatePicker
              label={t('visaYear', { ns: 'dataCollectionForm' })}
              openTo="year"
              value={new Date(props.anneeVisa)}
              views={['year']}
              format="yyyy"
              onChange={(date) =>
                date && props.setAnneeVisa(date.toISOString())
              }
              slotProps={{
                textField: { variant: 'outlined', required: false },
                actionBar: {},
              }}
            />
          </FormControl>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('ministry', { ns: 'dataCollectionForm' })} :
          </Typography>
          <FormControl size="small" sx={{ marginTop: 1 }} fullWidth>
            <TextField
              id="ministry"
              name="ministry"
              variant="outlined"
              size="small"
              fullWidth
              value={props.ministereTutelle}
              onChange={(e) => props.setMinistereTutelle(e.target.value)}
            />
          </FormControl>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {' '}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl size="small" fullWidth>
              <Checkbox
                checked={props.parutionJO}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                onChange={(e) => props.setParutionJO(e.target.checked)}
              />
            </FormControl>
            <Typography variant="h6">
              {t('parutionJO', { ns: 'dataCollectionForm' })}
            </Typography>
          </Box>
          {props.parutionJO && (
            <FormControl size="small" sx={{ marginTop: 1 }} fullWidth>
              <DatePicker
                label={t('dateParutionJO', { ns: 'dataCollectionForm' })}
                disabled={!props.parutionJO}
                value={new Date(props.dateParutionJO)}
                onChange={(date) =>
                  date && props.setDateParutionJO(date.toISOString())
                }
                format="dd/MM/yyyy"
                slotProps={{
                  textField: { variant: 'outlined' },
                  actionBar: {},
                  // paperContent: {},
                }}
              />
            </FormControl>
          )}
        </Stack>

        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('serviceCollecteurSignataireName', {
              ns: 'dataCollectionForm',
            })}{' '}
            :
          </Typography>
          <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
            <TextField
              id="serviceCollecteurSignataireName"
              name="serviceCollecteurSignataireName"
              variant="outlined"
              size="small"
              fullWidth
              value={props.serviceCollecteurSignataireNom}
              onChange={(e) =>
                props.setServiceCollecteurSignataireNom(e.target.value)
              }
            />
          </FormControl>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('serviceCollecteurSignataireFunction', {
              ns: 'dataCollectionForm',
            })}{' '}
            :
          </Typography>
          <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
            <TextField
              id="serviceCollecteurSignataireFonction"
              name="serviceCollecteurSignataireFonction"
              variant="outlined"
              size="small"
              fullWidth
              value={props.serviceCollecteurSignataireFonction}
              onChange={(e) =>
                props.setServiceCollecteurSignataireFonction(e.target.value)
              }
            />
          </FormControl>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('mailResponsableOperationnel', {
              ns: 'dataCollectionForm',
            })}{' '}
            :
          </Typography>
          <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
            <TextField
              id="mailResponsableOperationel"
              name="mailResponsableOperationel"
              variant="outlined"
              size="small"
              fullWidth
              value={props.mailResponsableOperationel}
              onChange={(e) =>
                props.setMailResponsableOperationel(e.target.value)
              }
              error={
                props.submitAttempt && props.mailResponsableOperationel === ''
              }
              label="Email"
              type="email"
              inputProps={{
                pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
                title: 'Please enter a valid email address',
              }}
            />
          </FormControl>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            paddingTop: 2,
            marginTop: 2,
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">
            {t('qualityReport', { ns: 'dataCollectionForm' })} :
          </Typography>
          <FormControl size="small" fullWidth>
            <TextField
              disabled
              size="small"
              multiline={props.multiline}
              value={props.qualityReport}
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
              value={props.surveyStatus?.label ? props.surveyStatus.label : ''}
              sx={{ paddingRight: 2, width: '99%', marginTop: 0 }}
            />
          </FormControl>
          <Typography variant="subtitle1">{i64?.titre[0].contenu} :</Typography>
          <FormControl size="small" fullWidth>
            <TextField
              disabled
              size="small"
              multiline={props.multiline}
              value={props.visaNumber}
              sx={{ paddingRight: 2, width: '99%', marginTop: 0 }}
            />
          </FormControl>
        </Stack>
      </Collapse>
    </>
  );
};

export default OtherInfo;
