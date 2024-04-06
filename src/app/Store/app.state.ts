import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './reducers/auth.reducers';
import * as productsReducer from './reducers/produts.reducers';
import * as cartReducer from './reducers/cart.reducers';


export interface AppState {
  auth: authReducer.State;
  products: productsReducer.State
  cart: cartReducer.State

}

export const appState: ActionReducerMap<AppState, any> = {
  auth: authReducer.authReducer,
  products: productsReducer.productsReducer,
  cart: cartReducer.cartReducer,

};
