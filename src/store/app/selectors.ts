import {Namespace } from '../../constants';
import { State } from '../../types/state';

export const getSortCommentsItem = (state: State): string => state[Namespace.App].rating;
export const getSecondSortCommentsItem = (state: State): string => state[Namespace.App].date;
export const getSortCatalog = (state: State): string => state[Namespace.App].type;
