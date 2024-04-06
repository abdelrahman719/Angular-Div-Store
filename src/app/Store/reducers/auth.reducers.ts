import { userData } from '../../Core/interfaces/userData';
import * as authActions from '../actions/auth.actions';
export interface State {
  isLoggedIn: boolean;
  user: userData | null;
}

const initialState: State = {
  isLoggedIn: false,
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: authActions.authActions
): State {
  switch (action.type) {
    case authActions.types.LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload };

    case authActions.types.LOGOUT:
      return { ...state, isLoggedIn: false, user: null };

    default:
      return state;
  }
}
