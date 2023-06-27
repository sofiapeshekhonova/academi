import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
import App from './components/app/app';

// import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    {/* <ToastContainer /> */}
    <App />
  </React.StrictMode>,
);
