import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchProductsAction } from './store/api-actions';

store.dispatch(fetchProductsAction());
store.dispatch(checkAuthAction());
// import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ToastContainer /> */}
      <App />
    </Provider>
  </React.StrictMode>,
);
