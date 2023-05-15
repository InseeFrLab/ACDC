import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    customContained: true;
  }
}

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0E417A',
    },
    text: {
      // primary: '#0E417A',
      secondary: '#3467AE',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Lato, sans-serif',
    },
    h2: {
      fontFamily: 'Oswald, sans-serif',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'customContained' },
          style: {
            backgroundColor: '#0E417A',
            borderRadius: '5px',
            padding: '0.5rem 0.9rem',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FFC303',
              color: '#263238',
            },
            '&:disabled': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              boxShadow: 'none',
            },
            boxShadow:
              '0px 1px 1px -1px rgba(0, 0, 0, 0.1), 0px 3px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 6px 0px rgba(0, 0, 0, 0.05)',
          },
        },
      ],
    },
  },
});

export default customTheme;
