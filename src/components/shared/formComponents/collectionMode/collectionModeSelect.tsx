import { Box, Checkbox, Typography, Card } from '@mui/material';
import { typeMode } from '../../../../lib/model/typeOfModeOfCollection';

interface CollectionModeSelectProps {
  modeCollectionCheck: any[];
  setModeCollectionCheck: (modeCollectionCheck: any[]) => void;
  width?: string;
}

const CollectionModeSelect = (props: CollectionModeSelectProps) => {
  return (
    <>
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
                  const newModeCollectionCheck = [...props.modeCollectionCheck];
                  newModeCollectionCheck[index].checked = e.target.checked;
                  props.setModeCollectionCheck(newModeCollectionCheck);
                  console.log('ModeCollectionCheck', props.modeCollectionCheck);
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
    </>
  );
};

export default CollectionModeSelect;
