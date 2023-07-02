import { Namespace, Status } from '../../constants';
import { ActiveProduct} from '../../types/product';
import { State } from '../../types/state';

export const getActiveProduct = (state: State): ActiveProduct| null => state[Namespace.ActiveProduct].product;
export const getActiveProductStatus = (state: State): Status=> state[Namespace.ActiveProduct].status;

