import { Action } from '@ngrx/store';
import { product } from '../../Core/interfaces/product';

export enum types {
  ADD_TO_CART = '[CART] ADD_TO_CART',
  GET_CARD_PRODUCTS = '[CART] GET_CARD_PRODUCTS',
  REMOVE_CARD_PRODUCT = '[CART] REMOVE_CARD_PRODUCT',
  UPDATE_CARD_COUNTER = '[CART] UPDATE_CARD_COUNTER',
  CLEAR_CART = '[CART] CLEAR_CART',

}

export class addToCart implements Action {
  readonly type = types.ADD_TO_CART;
  constructor(public payload: {product:product , count:number}) {}
}
export class getCartProducts implements Action {
  readonly type = types.GET_CARD_PRODUCTS;
  constructor(public payload: {product:product , count:number}[]) {}
}
export class removeCartProducts implements Action {
  readonly type = types.REMOVE_CARD_PRODUCT;
  constructor(public payload: {product:product , count:number}[]) {}
}
export class updateCardCounter implements Action {
  readonly type = types.UPDATE_CARD_COUNTER;
  constructor(public payload: {product:product , count:number}) {}
}
export class clearCart implements Action {
  readonly type = types.CLEAR_CART;
  constructor(public payload: []) {}
}





export type cartActions = addToCart |getCartProducts | removeCartProducts |updateCardCounter |clearCart  ;
