import { Namespace } from '../../constants';
import { State } from '../../types/state';
import { UserData } from '../../types/user/user';

export const getAuthorizationStatus = (state: State): string => state[Namespace.User].AuthorizationStatus;
export const getStatus = (state: State): string => state[Namespace.User].status;
export const getUserInformations = (state: State): UserData | null => state[Namespace.User].userInformation;
