import { Action } from '@ngrx/store';
import { product } from '../../Core/interfaces/product';

export enum types {
  ADD_TO_CART = '[CART] ADD_TO_CART',
  GET_CARD_PRODUCTS = '[CART] GET_CARD_PRODUCTS',

}

export class addToCart implements Action {
  readonly type = types.ADD_TO_CART;
  constructor(public payload: {product:product , count:number}) {}
}
export class getCartProducts implements Action {
  readonly type = types.GET_CARD_PRODUCTS;
  constructor(public payload: {product:product , count:number}[]) {}
}





export type cartActions = addToCart |getCartProducts  ;
