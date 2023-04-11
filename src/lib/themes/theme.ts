import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    fontFamily: ['Barlow', 'Regular', '"Frank Ruhl Libre"'].join(','),
    h2: {
      fontFamily: 'Barlow, Regular',
    },
    button: {
      fontFamily: 'Barlow, Regular',
    },
  },
});

export default customTheme;
