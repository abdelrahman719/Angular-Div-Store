import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './reducers/auth.reducers';
import * as productsReducer from './reducers/produts.reducers';


export interface AppState {
  auth: authReducer.State;
  products: productsReducer.State

}

export const appState: ActionReducerMap<AppState, any> = {
  auth: authReducer.authReducer,
  products: productsReducer.productsReducer,

};
