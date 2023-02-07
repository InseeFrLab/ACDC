/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CollectionCommunicationSelectProps {
  userAttributePair: any;
  setUserAttributePair: any;
}
const CollectionCommunicationSelect = (
  props: CollectionCommunicationSelectProps
) => {
  const { t } = useTranslation(['userAttributeForm', 'form']);
  console.log('props: ', props);
  const { userAttributePair } = props;
  console.log('userAttributePair: ', userAttributePair);
  const addCommunicationLabel = () => {
    const lastTextId: number =
      userAttributePair[userAttributePair.length - 1].id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return props.setUserAttributePair([
      ...userAttributePair,
      {
        id: lastTextId + 1,
        type: 'Opening',
        media: 'Email',
      },
    ]);
  };

  const handleUserAttributeTypeChange = (
    e: SelectChangeEvent,
    index: number
  ) => {
    e.preventDefault();
    props.setUserAttributePair((s: any) => {
      const newText: Record<'id' | 'type' | 'media', string>[] = s.slice();
      newText[index].type = e.target.value;
      console.log('newText: ', newText);
      return newText;
    });
  };

  const handleUserAttributeMediaChange = (
    e: SelectChangeEvent,
    index: number
  ) => {
    e.preventDefault();
    props.setUserAttributePair((s: any) => {
      const newText: Record<'id' | 'type' | 'media', string>[] = s.slice();
      newText[index].media = e.target.value;
      console.log('newText: ', newText);
      return newText;
    });
  };

  return (
    <>
      {userAttributePair.map(
        (label: { id: number; type: string; media: string }, index: number) => {
          console.log('label: ', label);
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
                <Select
                  color="primary"
                  size="small"
                  // label={t('label')}
                  value={label.type}
                  onChange={(e) => handleUserAttributeMediaChange(e, index)}
                  id={index.toString()}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
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
              </FormControl>
              <FormControl size="small" fullWidth>
                <Select
                  color="primary"
                  value={label.media}
                  onChange={(e) => handleUserAttributeTypeChange(e, index)}
                  id={index.toString()}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                    marginLeft: 1,
                  }}
                  notched
                >
                  <MenuItem value="Opening">
                    {t('opening', { ns: 'userAttributeForm' })}
                  </MenuItem>
                  <MenuItem value="Remind">
                    {t('emind', { ns: 'userAttributeForm' })}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          );
        }
      )}

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
