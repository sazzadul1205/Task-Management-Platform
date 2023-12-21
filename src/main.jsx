import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import { router } from './Routers/Router';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Providers/AuthProviders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='bg-white'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);