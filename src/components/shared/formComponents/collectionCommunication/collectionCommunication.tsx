/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  SelectChangeEvent,
  FormControl,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { CommunicationMode } from '@/lib/utils/dataTransformation';

interface CollectionCommunicationSelectProps {
  userAttributePair: any;
  setUserAttributePair: any;
}
const CollectionCommunicationSelect = (
  props: CollectionCommunicationSelectProps
) => {
  const { t } = useTranslation(['userAttributeForm', 'form']);
  const addCommunicationLabel = () => {
    console.log(props.userAttributePair);
    const lastTextId: number =
      props.userAttributePair.length > 0
        ? props.userAttributePair[props.userAttributePair.length - 1].id
        : 0;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return props.setUserAttributePair([
      ...props.userAttributePair,
      {
        id: lastTextId + 1,
        type: 'Opening',
        media: 'Mail',
        paperQuestionnaire: 'false',
      },
    ]);
  };

  const deleteCommunicationLabel = (index: number) => {
    props.setUserAttributePair((s: any) => {
      const newText: CommunicationMode[] = s.slice();
      newText.splice(index, 1);
      return newText;
    });
  };

  const handleUserAttributeTypeChange = (
    e: SelectChangeEvent,
    index: number
  ) => {
    props.setUserAttributePair((s: any) => {
      const newText: CommunicationMode[] = s.slice();
      newText[index].type = e.target.value;
      return newText;
    });
  };

  const handleUserAttributeMediaChange = (
    e: SelectChangeEvent,
    index: number
  ) => {
    props.setUserAttributePair((s: any) => {
      const newText: CommunicationMode[] = s.slice();
      newText[index].media = e.target.value;
      return newText;
    });
  };

  const handleUserAttributePaperChange = (
    e: SelectChangeEvent<boolean>,
    index: number
  ) => {
    e.preventDefault();
    props.setUserAttributePair((s: any) => {
      const newText: Record<
        'id' | 'type' | 'media' | 'paperQuestionnaire',
        string | boolean
      >[] = s.slice();
      newText[index].paperQuestionnaire = e.target.value;
      return newText;
    });
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
          {t('collectionCommunication', { ns: 'collectionEvent' })}:
        </Typography>
      </Box>
      {props.userAttributePair.map((attribute: any, index: number) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            key={attribute.id}
          >
            <FormControl size="small" fullWidth>
              <Select
                labelId="select-media-label"
                value={attribute.type}
                onChange={(e) => handleUserAttributeTypeChange(e, index)}
                id={index.toString()}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
                notched
              >
                <MenuItem value="Opening">
                  {t('opening', { ns: 'userAttributeForm' })}
                </MenuItem>
                <MenuItem value="Remind">
                  {t('remind', { ns: 'userAttributeForm' })}
                </MenuItem>
              </Select>
              <FormHelperText>{t('media', { ns: 'form' })}</FormHelperText>
            </FormControl>
            <FormControl fullWidth size="small">
              <Select
                labelId="select-type-label"
                color="primary"
                size="small"
                // label={t('label')}
                value={attribute.media}
                onChange={(e) => handleUserAttributeMediaChange(e, index)}
                id={index.toString()}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                  marginLeft: 1,
                }}
                notched
              >
                <MenuItem value="Email">
                  {t('email', { ns: 'userAttributeForm' })}
                </MenuItem>
                <MenuItem value="Mail">
                  {t('mail', { ns: 'userAttributeForm' })}
                </MenuItem>
              </Select>
              <FormHelperText>{t('type', { ns: 'form' })}</FormHelperText>
            </FormControl>
            <FormControl size="small" fullWidth>
              <Select
                color="primary"
                value={attribute.paperQuestionnaire}
                onChange={(e) => handleUserAttributePaperChange(e, index)}
                id={index.toString()}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                  marginLeft: 1,
                }}
                notched
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
              <FormHelperText>
                {t('paperQuestionnaire', { ns: 'form' })}
              </FormHelperText>
            </FormControl>
            <IconButton
              disabled={props.userAttributePair.length === 1}
              color="error"
              onClick={() => {
                deleteCommunicationLabel(index);
              }}
            >
              <FiX />
            </IconButton>
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
        <Button variant="outlined" size="small" onClick={addCommunicationLabel}>
          <Typography>{t('addCommunication', { ns: 'form' })}</Typography>
        </Button>
      </Box>
    </>
  );
};

export default CollectionCommunicationSelect;
