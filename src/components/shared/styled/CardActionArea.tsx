import styled from '@emotion/styled';
import { CardActionArea } from '@mui/material';

const StyledCardActionArea = styled(CardActionArea)(
  ({ theme }) => `
    .MuiCardActionArea-root {
      background: transparent;
      border: none;
      outline: none;
    },
    .MuiCardActionArea-focusHighlight {
        background: transparent;
        border: none;
        outline: none;
    },
    .Mui-focusVisible {
      background: transparent;
      border: none;
      outline: none;
    }
`
);

export default StyledCardActionArea;
