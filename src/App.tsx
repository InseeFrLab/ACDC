import './App.css';
import { useTranslation } from 'react-i18next';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Root from './components/shared/layout/Root';
import RoutesWebs from './lib/routes/routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
      <QueryClientProvider client={queryClient}>
        <Root
          sx={{
            height: '100vh',
          }}
        >
          <RoutesWebs />
        </Root>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default App;
