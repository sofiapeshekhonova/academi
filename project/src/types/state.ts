import {store} from '../store/index';
import {AuthorizationStatus} from '../constants';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  status: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
