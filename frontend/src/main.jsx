import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
          <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false}/>
              <AppRoutes />
          </QueryClientProvider>
  </React.StrictMode>,
)
