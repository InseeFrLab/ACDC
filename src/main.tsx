import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/translation/i18n';
import worker from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense fallback="Chargement des données...">
    <App />
  </React.Suspense>
);
