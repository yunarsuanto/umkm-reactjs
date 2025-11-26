import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './app/store';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { BrowserRouter } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './global.css'

const queryClient = new QueryClient();
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID!;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={{
          fontFamily: 'Helvetica Neue, sans-serif, howdybun, sunday-shine, child-hood',
        }}>
          <BrowserRouter>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <App />
            </GoogleOAuthProvider>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
