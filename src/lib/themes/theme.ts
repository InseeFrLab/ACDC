import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Lato, sans-serif',
    },
    h2: {
      fontFamily: 'Oswald, sans-serif',
    },
  },
});

export default customTheme;
