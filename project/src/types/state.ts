import {store} from '../store/index';
import {AuthorizationStatus} from '../constants';
//import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  //userInformation: UserData | null;
  status: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
