import { Action } from '@ngrx/store';
import { product } from '../../Core/interfaces/product';

export enum types {
  SET_PRODUCTS = '[PRODUCTS] SET_PRODUCTS',
  ADD_PRODUCT = '[PRODUCTS] ADD_PRODUCT',
  EDIT_PRODUCT = '[PRODUCTS] EDIT_PRODUCT',
  DELETE_PRODUCT = '[PRODUCTS] DELETE_PRODUCT',
}

export class setProducts implements Action {
  
  readonly type = types.SET_PRODUCTS;
  constructor(public payload: product[]) {}
}
export class addProduct implements Action {
  
  readonly type = types.ADD_PRODUCT;
  constructor(public payload: product) {}
}
export class editProduct implements Action {
  
  readonly type = types.EDIT_PRODUCT;
  constructor(public payload: product) {}
}
export class deleteProduct implements Action {
  
  readonly type = types.DELETE_PRODUCT;
  constructor(public payload: product) {}
}





export type productsActions = setProducts | addProduct | editProduct | deleteProduct;
