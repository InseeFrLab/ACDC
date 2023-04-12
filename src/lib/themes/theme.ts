import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Barlow, Regular',
    },
    h2: {
      fontFamily: 'Barlow, Regular',
    },
    button: {
      fontFamily: 'Barlow, Regular',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '& h1': {
            fontFamily: 'Barlow, Regular',
          },
          '& h2': {
            fontFamily: 'Barlow, Regular',
          },
        },
      },
    },
  },
});

export default customTheme;
