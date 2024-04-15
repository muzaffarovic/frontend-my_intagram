import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));
const themeRtl = createTheme({
  direction: "ltr" // Both here and <body dir="rtl">
  });
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={themeRtl}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);