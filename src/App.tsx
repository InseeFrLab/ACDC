import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material';
import Root from './components/shared/layout/Root';
import RoutesWebs from './lib/routes/routes';
import createApiClient from './lib/api/remote/apiClient';
import createApiMockClient from './lib/api/mock/apiMockClient';
import ApiContext from './lib/api/context/apiContext';
import customTheme from './lib/themes/theme';

const queryClient = new QueryClient();

const App = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const apiClient = apiUrl ? createApiClient(apiUrl) : createApiMockClient();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
      <QueryClientProvider client={queryClient} contextSharing>
        <ApiContext.Provider value={apiClient}>
          <ThemeProvider theme={customTheme}>
            <Root
              sx={{
                height: '100vh',
              }}
            >
              <RoutesWebs />
            </Root>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ApiContext.Provider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default App;
