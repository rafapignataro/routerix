import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { SchemaProvider } from './hooks/use-schema';

import './index.css';
import { TabProvider } from './hooks/use-tab';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <SchemaProvider>
      <TabProvider>
        <App />
      </TabProvider>
    </SchemaProvider>
  </React.StrictMode>
);