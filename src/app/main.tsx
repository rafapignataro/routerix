import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { SchemaProvider } from './use-schema';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <SchemaProvider>
      <App />
    </SchemaProvider>
  </React.StrictMode>
);