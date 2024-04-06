import { Action } from '@ngrx/store';
import { userData } from '../../Core/interfaces/userData';

export enum types {
  LOGIN = '[AUTH] LOGIN',
  LOGOUT = '[AUTH] LOGOUT',
}

export class Login implements Action {
  readonly type = types.LOGIN;
  constructor(public payload: userData) {}
}

export class Logout implements Action {
  readonly type = types.LOGOUT;
}



export type authActions = Login | Logout ;
