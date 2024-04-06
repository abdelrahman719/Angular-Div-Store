import { product } from '../../Core/interfaces/product';

import * as cartActions from '../actions/cart.actions';

export interface State {
  cart:any[]
}

const initialState: State = {
  cart:  [],
};

export function cartReducer(
  state: State = initialState,
  action: cartActions.cartActions
): State {
  let updatedCart :any[]=[]
  switch (action.type) {
    case cartActions.types.ADD_TO_CART:
      
      updatedCart = [...state.cart , action.payload]
      return { ...state, cart:updatedCart};

    case cartActions.types.GET_CARD_PRODUCTS:
      return { ...state, cart:[...action.payload ] };

    default:
      return state;
  }
}
