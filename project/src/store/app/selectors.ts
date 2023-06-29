import {Namespace } from '../../constants';
import { State } from '../../types/state';

export const getSortComments = (state: State): string => state[Namespace.App].rating;
export const getSortCatalog = (state: State): string => state[Namespace.App].type;
