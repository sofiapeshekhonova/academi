import { Namespace, Status } from '../../constants';
import { Product } from '../../types/product';
import { State } from '../../types/state';

export const getProducts = (state: State): Product[] => state[Namespace.Products].products;
export const getStatus = (state: State): Status=> state[Namespace.Products].status;

