import { Box, Checkbox, Typography, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { typeMode } from '../../../../lib/model/typeOfModeOfCollection';

interface CollectionModeSelectProps {
  modeCollectionCheck: any[];
  setModeCollectionCheck: (modeCollectionCheck: any[]) => void;
  width?: string;
}

const CollectionModeSelect = (props: CollectionModeSelectProps) => {
  const { t } = useTranslation(['collectionEvent', 'form']);
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
          {t('modeOfCollection', { ns: 'collectionEvent' })}:*
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        {typeMode.map((item, index) => (
          <Card
            key={item.type}
            sx={{
              mx: 1,
              width: props.width ? props.width : '45%',
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
                  checked={props.modeCollectionCheck[index].checked}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                  onChange={(e) => {
                    const newModeCollectionCheck = [
                      ...props.modeCollectionCheck,
                    ];
                    newModeCollectionCheck[index].checked = e.target.checked;
                    props.setModeCollectionCheck(newModeCollectionCheck);
                    console.log(
                      'ModeCollectionCheck',
                      props.modeCollectionCheck
                    );
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ marginLeft: 1 }}
                >
                  {`${props.modeCollectionCheck[index].label} `}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default CollectionModeSelect;
