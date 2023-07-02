import axios, { AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { toast } from 'react-toastify';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../constants';

const BACKEND_URL = 'https://grading.design.pages.academy/v0/keks/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {

      if (error.response) {
        if (error.response) {
          const status = error.response.status;
          if (status === StatusCodes.UNAUTHORIZED && window.location.pathname !== AppRoute.logIn && window.location.pathname !== AppRoute.SignUp) {
            toast.info('Зарегестрируйтесь, чтобы добавить кексы в избранное', {
              position: toast.POSITION.TOP_RIGHT,
              delay: 1000,
              theme: 'colored'
            });
          } else if (status === StatusCodes.NOT_FOUND) {
            toast.error('Пользователь не зарегестрирован', {
              position: toast.POSITION.TOP_RIGHT,
              delay: 1000,
              theme: 'colored'
            });
          } else if (status === StatusCodes.CONFLICT) {
            toast.error('Пользователь с такой почтой уже зарегестрирован', {
              position: toast.POSITION.TOP_RIGHT,
              delay: 1000,
              theme: 'colored'
            });
          } else if (status === StatusCodes.BAD_REQUEST) {
            toast.warning('Ошибка в запросе к серверу', {
              position: toast.POSITION.TOP_RIGHT,
              delay: 1000,
              theme: 'colored'
            });
          } else if(window.location.pathname !== AppRoute.logIn && window.location.pathname !== AppRoute.SignUp){
            toast.warn('Что-то пошло не так');
          }
        }
      }
      throw error;
    }
  );

  return api;
};


// if (status === 404) {
//         toast.error('Пользователь не найден', {
//           position: toast.POSITION.TOP_RIGHT,
//           delay: 1000,
//           toastId: 2,
//         });
//       }
//       else {
//         toast.error(error.response.data.error, {
//           position: toast.POSITION.TOP_CENTER,
//           toastId: 1,
//         });
//       }
//     }
//     throw error;
//   }
// );
// return api;
// };
