import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'acdc.demo.insee.io',
    port: 3000,
  },
  plugins: [reactRefresh()],
});
