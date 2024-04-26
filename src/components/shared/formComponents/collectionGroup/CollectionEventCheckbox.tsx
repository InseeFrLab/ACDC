import { Box, Card, Checkbox, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageRecord from '@/lib/model/languageRecord';
import CollectionEvent from '../../../../lib/model/collectionEvents';

interface CollectionEventCheckBoxProps {
  collectionEvents: CollectionEvent[];
  collectionEventCheck: any;
  setCollectionEventCheck: (collectionEventCheck: any) => void;
}

const CollectionEventCheckBox = (props: CollectionEventCheckBoxProps) => {
  const { t, i18n } = useTranslation(['userAttributeForm', 'form']);
  const { collectionEvents } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {' '}
      <Box
        sx={{
          paddingTop: 2,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h6">
          {t('collectionEventReference', { ns: 'userAttributeForm' })}:
        </Typography>
      </Box>
      {collectionEvents.map((item, index) => (
        <Card
          key={item.id}
          sx={{
            p: 1,
            my: 1,
            // width: '48%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Checkbox
                checked={props.collectionEventCheck[index][item.id]}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                onChange={(e) => {
                  const newCollectionEventCheck = [
                    ...props.collectionEventCheck,
                  ];
                  newCollectionEventCheck[index][item.id] = e.target.checked;
                  props.setCollectionEventCheck(newCollectionEventCheck);
                  console.log(
                    'collectionEventCheck',
                    props.collectionEventCheck
                  );
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.secondary"
                sx={{ marginLeft: 1 }}
              >
                {`${
                  item.collectionEventName[
                    i18n.language as keyof LanguageRecord
                  ]
                } `}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Typography variant="body1" fontWeight="xl">
                {`${item.label[i18n.language as keyof LanguageRecord]} `}
              </Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default CollectionEventCheckBox;
