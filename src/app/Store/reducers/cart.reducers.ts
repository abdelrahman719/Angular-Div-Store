import { count } from 'rxjs';
import { product } from '../../Core/interfaces/product';

import * as cartActions from '../actions/cart.actions';

export interface State {
  cart: any[]
}

const initialState: State = {
  cart: [],
};

export function cartReducer(
  state: State = initialState,
  action: cartActions.cartActions
): State {
  let updatedCart: any[] = []
  switch (action.type) {
    case cartActions.types.ADD_TO_CART:
      updatedCart = [...state.cart, action.payload]
      return { ...state, cart: updatedCart };

    case cartActions.types.GET_CARD_PRODUCTS:
      return { ...state, cart: [...action.payload] };

    case cartActions.types.REMOVE_CARD_PRODUCT:
      return { ...state, cart: [...action.payload] };

    case cartActions.types.UPDATE_CARD_COUNTER:
      updatedCart = state.cart.map(obj=>{
        if(obj.product.id == action.payload.product.id){
          return {...obj , count:action.payload.count}
        }
        return obj
      })
      console.log('updatedCart: ', updatedCart);
      debugger
      return { ...state, cart: updatedCart };

    default:
      return state;
  }
}
