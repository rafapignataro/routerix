import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { SchemaProvider } from './hooks/use-schema';

import './index.css';
import { RouteProvider } from './hooks/use-route';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <SchemaProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </SchemaProvider>
  </React.StrictMode>
);