import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { RouteProvider } from './app/routingContext';

import config from '../module-federation.config'
import { Redux } from '@shell-demo/redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Redux>
    <RouteProvider>
      <StrictMode>
        <BrowserRouter basename={config.path}>
          <App />
        </BrowserRouter>
      </StrictMode>
    </RouteProvider>
  </Redux>
);
