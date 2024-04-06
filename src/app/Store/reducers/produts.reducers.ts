import { product } from '../../Core/interfaces/product';
import * as productsActions from '../actions/prodcuts.actions ';
export interface State {
  products: product[] ;
}

const initialState: State = {
  products: [],
};

export function productsReducer(
  state: State = initialState,
  action: productsActions.productsActions
): State {
  let updatedProducts : product[] =[]
  switch (action.type) {
    case productsActions.types.SET_PRODUCTS:
      
      return { ...state , products: action.payload };

    case productsActions.types.ADD_PRODUCT:
       updatedProducts = [...state.products , action.payload]
      return { ...state , products: updatedProducts };
    case productsActions.types.EDIT_PRODUCT:
       updatedProducts = state.products.map(product => {
        if (product.id == action.payload.id) {
          return { ...product, ...action.payload };
        }
        return product;
      });
      return { ...state , products:  updatedProducts  };

    case productsActions.types.DELETE_PRODUCT:
  
       updatedProducts = state.products.filter(product => {
      return product.id !== action.payload.id

      });
      
      return { ...state , products:  updatedProducts  };

    default:
      return state;
  }
}
