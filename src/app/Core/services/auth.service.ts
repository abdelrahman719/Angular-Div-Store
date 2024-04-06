import { Injectable } from '@angular/core';
import { userData } from '../interfaces/userData';
import { FormGroup } from '@angular/forms';
import { AppState } from '../../Store/app.state';
import { Store } from '@ngrx/store';
import { Login, Logout } from '../../Store/actions/auth.actions';
import { Router } from '@angular/router';
import { clearCart } from '../../Store/actions/cart.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: userData = {
    name: '',
    password: '',
    role: ''
  }
  constructor(  private store: Store<AppState>,private router:Router) { }

  logIn(loginFormGroup:FormGroup) :boolean {
    if (loginFormGroup.value.name == 'admin') {
      loginFormGroup.value.role = 'admin'
      localStorage.setItem('userAuth', JSON.stringify(loginFormGroup.value))
      this.store.dispatch(new Login(loginFormGroup.value));
      return true
    } else {
      loginFormGroup.value.role = 'user'
      localStorage.setItem('userAuth', JSON.stringify(loginFormGroup.value))
      this.store.dispatch(new Login(loginFormGroup.value));
      return true
    }

    
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/'])
    this.store.dispatch(new Logout())
    this.store.dispatch(new clearCart([]))
  }
  getUserData():userData  {
    let temp = localStorage.getItem('userAuth')
    if (temp) {
      this.user = JSON.parse(temp)
      
    }
    return this.user
    
  }
}
