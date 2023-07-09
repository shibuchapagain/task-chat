import React, { createContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
// import App from "./App";
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import rootStore from './store';
import { ThemeProvider } from 'styled-components';
import { createTheme } from './theme';
// import RootProvider from './RootProvider';
// import Auth from './RootProvider';
// import { composeWithDevTools } from 'redux-devtools-extension';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// const user = Auth();
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={rootStore}>
      <ThemeProvider theme={createTheme(false)}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
