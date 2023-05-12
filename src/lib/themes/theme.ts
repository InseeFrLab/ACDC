import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    test: true;
  }
}

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0E417A',
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
          props: { variant: 'test' },
          style: {
            backgroundColor: '#0E417A',
            borderRadius: '10px',
            padding: '0.5rem 1rem',
            color: '#fff',
          },
        },
      ],
    },
  },
});

export default customTheme;
